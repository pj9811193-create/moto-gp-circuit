/* Moto GP Circuit — multiplayer server v2 (usernames + friend requests)
 * - Serves bike-racer.html (and this folder's files) over HTTP
 * - Everyone connects into one global lobby; usernames are unique and auto-assigned
 * - Friend system: invite by username -> their phone gets Accept / Decline
 *   -> on Accept both players are moved into a private 2-player race room
 * - Still relays 15 Hz bike state, chat, race start, finish times
 * Run:  npm install && npm start   →  http://localhost:8765
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8765;
const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.md': 'text/markdown; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.css': 'text/css', '.ico': 'image/x-icon'
};

/* ---------- static file server ---------- */
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/' || urlPath === '') urlPath = '/bike-racer.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('404 — put bike-racer.html next to server.js'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

/* ---------- websocket: rooms, users, invites ---------- */
const wss = new WebSocketServer({ server });
const LOBBY = 'GP1';
/** rooms: Map<code, Map<id, player>> · users: Map<lowername, player> · pending: Map<lowername-target, {from, ts}> */
const rooms = new Map();
const users = new Map();
const pending = new Map();
const SNAPSHOT_MS = 66;    // ~15 Hz
const STALE_MS = 12000;
const INVITE_TTL_MS = 60000;

const getRoom = (code) => { if (!rooms.has(code)) rooms.set(code, new Map()); return rooms.get(code); };
const playersPayload = (room) => [...room.values()].map(p => ({ id: p.id, name: p.name, variant: p.variant }));
function broadcast(room, msg, exceptId) {
  const s = JSON.stringify(msg);
  for (const p of room.values()) { if (p.id !== exceptId && p.ws.readyState === 1) p.ws.send(s); }
}
function sendTo(p, msg) { if (p && p.ws && p.ws.readyState === 1) p.ws.send(JSON.stringify(msg)); }
function sanitizeName(raw) {
  const n = String(raw || '').replace(/[^A-Za-z0-9_ ]/g, '').trim().slice(0, 14);
  return n || 'Rider';
}
function uniqueName(want) {
  const base = sanitizeName(want);
  let name = base, i = 2;
  while (users.has(name.toLowerCase())) {
    name = base + '_' + i; i++;
    if (i > 50) { name = base + '_' + crypto.randomBytes(2).toString('hex'); break; }
  }
  return name;
}
function presenceBroadcast() {
  const s = JSON.stringify({ t: 'presence', count: users.size });
  for (const ws of wss.clients) if (ws.readyState === 1) ws.send(s);
}
function joinRoom(p, code) { p.room = code; getRoom(code).set(p.id, p); }
function leaveRoom(p) {
  const room = rooms.get(p.room);
  if (!room) return;
  room.delete(p.id);
  if (room.size === 0) rooms.delete(p.room);
  else broadcast(room, { t: 'players', players: playersPayload(room) });
}

wss.on('connection', (ws) => {
  let me = null;

  ws.on('message', (raw) => {
    let m; try { m = JSON.parse(raw.toString()); } catch (e) { return; }
    if (!m || typeof m.t !== 'string') return;

    /* ---- join: {t:'join', name, variant} → lobby ---- */
    if (m.t === 'join' && !me) {
      const name = uniqueName(m.name);
      const p = {
        id: crypto.randomBytes(4).toString('hex'), ws, name,
        variant: Math.max(0, Math.min(99, m.variant | 0)),
        state: null, last: Date.now(), room: null
      };
      users.set(name.toLowerCase(), p);
      me = p;
      joinRoom(p, LOBBY);
      const room = rooms.get(LOBBY);
      sendTo(p, { t: 'welcome', id: p.id, name: p.name, room: LOBBY, players: playersPayload(room), count: users.size });
      broadcast(room, { t: 'players', players: playersPayload(room) }, p.id);
      presenceBroadcast();
      console.log(`[+] ${p.name} joined the lobby (${users.size} online)`);
      return;
    }
    if (!me) return;
    me.last = Date.now();
    const room = rooms.get(me.room);

    /* ---- race relay (unchanged protocol) ---- */
    if (m.t === 'state') {
      me.state = [me.id,
        +m.p?.[0] || 0, +m.p?.[1] || 0, +m.p?.[2] || 0,
        +m.h || 0, +m.s || 0, m.prog | 0, m.lap | 0];
    }
    else if (m.t === 'who') { sendTo(me, { t: 'players', players: playersPayload(room) }); }
    else if (m.t === 'chat') { broadcast(room, { t: 'chat', from: me.name, m: String(m.m || '').slice(0, 80) }); }
    else if (m.t === 'start') { broadcast(room, { t: 'start' }); console.log(`[!] race started in room ${me.room}`); }
    else if (m.t === 'finish') { broadcast(room, { t: 'finish', id: me.id, name: me.name, ms: Math.max(0, m.ms | 0) }); }

    /* ---- friend invites ---- */
    else if (m.t === 'invite') {
      const want = sanitizeName(m.to);
      const target = users.get(want.toLowerCase());
      if (target === me) { sendTo(me, { t: 'invitefail', to: want, why: 'self' }); return; }
      if (!target) { sendTo(me, { t: 'invitefail', to: want, why: 'offline' }); return; }
      pending.set(want.toLowerCase(), { from: me.name.toLowerCase(), ts: Date.now() });
      sendTo(target, { t: 'invitereq', from: me.name });
      sendTo(me, { t: 'invitesent', to: target.name });
      console.log(`[i] ${me.name} invited ${target.name}`);
    }
    else if (m.t === 'accept' || m.t === 'decline') {
      const want = sanitizeName(m.to);
      const inviter = users.get(want.toLowerCase());
      const key = me.name.toLowerCase();
      const pend = pending.get(key);
      if (m.t === 'decline') {
        pending.delete(key);
        if (inviter) sendTo(inviter, { t: 'inviteresult', ok: false, name: me.name });
        console.log(`[i] ${me.name} declined ${want}`);
        return;
      }
      /* accept */
      if (!inviter || inviter.ws.readyState !== 1 || !pend || pend.from !== want.toLowerCase() || Date.now() - pend.ts > INVITE_TTL_MS) {
        pending.delete(key);
        sendTo(me, { t: 'invitefail', to: want, why: 'gone' });
        return;
      }
      pending.delete(key);
      const code = 'P' + crypto.randomBytes(3).toString('hex').toUpperCase();
      leaveRoom(inviter); joinRoom(inviter, code);
      leaveRoom(me); joinRoom(me, code);
      const priv = rooms.get(code);
      for (const p of [inviter, me]) sendTo(p, { t: 'roommove', room: code, players: playersPayload(priv) });
      sendTo(inviter, { t: 'inviteresult', ok: true, name: me.name });
      console.log(`[i] ${me.name} accepted ${inviter.name} → private room ${code}`);
    }
  });

  ws.on('close', () => {
    if (!me) return;
    users.delete(me.name.toLowerCase());
    pending.delete(me.name.toLowerCase());
    leaveRoom(me);
    presenceBroadcast();
    console.log(`[-] ${me.name} left (${users.size} online)`);
    me = null;
  });
});

/* snapshot loop — 15 Hz aggregated state per room + stale prune */
setInterval(() => {
  const now = Date.now();
  for (const pendKey of [...pending.keys()]) if (now - pending.get(pendKey).ts > INVITE_TTL_MS) pending.delete(pendKey);
  for (const [code, room] of rooms) {
    for (const [id, p] of [...room]) {
      if (now - p.last > STALE_MS) {
        room.delete(id);
        try { p.ws.terminate(); } catch (e) {}   // terminate triggers close → registry cleanup
        broadcast(room, { t: 'players', players: playersPayload(room) });
      }
    }
    const snaps = [...room.values()].filter(p => p.state).map(p => p.state);
    if (snaps.length) broadcast(room, { t: 'snap', s: snaps });
  }
}, SNAPSHOT_MS);

/* heartbeat — keeps hosting platforms from idling the socket out */
setInterval(() => { for (const ws of wss.clients) if (ws.readyState === 1) ws.ping(); }, 10000);

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use.');
    console.error('Close the other server, or start this one on a different port:');
    console.error('   PORT=9000 npm start');
    process.exit(1);
  }
  throw e;
});
wss.on('error', (e) => { // ws re-emits http-server errors here too
  if (e.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use.');
    console.error('Close the other server, or start this one on a different port:');
    console.error('   PORT=9000 npm start');
    process.exit(1);
  }
  throw e;
});

server.listen(PORT, () => {
  const lan = [];
  for (const ifs of Object.values(os.networkInterfaces())) {
    for (const a of ifs || []) if (a.family === 'IPv4' && !a.internal) lan.push(a.address);
  }
  console.log('──────────────────────────────────────────────');
  console.log('  Moto GP Circuit — multiplayer server v2');
  console.log(`  This device  →  http://localhost:${PORT}`);
  if (lan.length) {
    console.log('  Friends nearby (same Wi-Fi / your hotspot):');
    for (const ip of lan) console.log(`                 http://${ip}:${PORT}`);
  } else {
    console.log('  No network IP detected — local-only mode.');
  }
  console.log('  Everyone joins the lobby by username;');
  console.log('  invite a friend → accept → private race room.');
  console.log('──────────────────────────────────────────────');
});
