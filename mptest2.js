/* Moto GP Circuit — multiplayer server test suite v2 (23 assertions)
 * Run:  PORT=8765 node server.js   (in another terminal)
 *       node mptest2.js
 */
'use strict';
const WebSocket = require('ws');
const URL = 'ws://localhost:8765';
let passed = 0, failed = 0;
function ok(cond, name) { if (cond) { passed++; console.log('  ✔ ' + name); } else { failed++; console.log('  ✘ FAIL: ' + name); } }

class Client {
  constructor(name) { this.name = name; this.msgs = []; this.ws = null; }
  connect() {
    return new Promise((res, rej) => {
      this.ws = new WebSocket(URL);
      this.ws.on('open', res);
      this.ws.on('error', rej);
      this.ws.on('message', (raw) => { try { this.msgs.push(JSON.parse(raw.toString())); } catch (e) {} });
    });
  }
  send(m) { this.ws.send(JSON.stringify(m)); }
  async waitFor(type, timeout = 2000) {
    const t0 = Date.now();
    for (;;) {
      const i = this.msgs.findIndex(m => m.t === type);
      if (i >= 0) return this.msgs.splice(i, 1)[0];
      if (Date.now() - t0 > timeout) return null;
      await new Promise(r => setTimeout(r, 20));
    }
  }
  async clear(ms = 150) { await new Promise(r => setTimeout(r, ms)); this.msgs = []; }
}

(async () => {
  console.log('— T1: join, welcome, unique username —');
  const A = new Client('Piyush'); const B = new Client('Piyush'); // same name on purpose!
  await A.connect(); await B.connect();
  A.send({ t: 'join', name: 'Piyush', variant: 5 });
  B.send({ t: 'join', name: 'Piyush', variant: 7 });
  const wa = await A.waitFor('welcome'), wb = await B.waitFor('welcome');
  ok(!!wa && wa.name === 'Piyush', 'first client keeps the name "Piyush"');
  ok(!!wb && wb.name !== 'Piyush' && wb.name.startsWith('Piyush'), 'duplicate name auto-uniquified → ' + (wb && wb.name));
  ok(Array.isArray(wb.players) && wb.players.length === 2, 'second welcome contains both lobby players');

  console.log('— T2: presence broadcast —');
  await A.clear(); await B.clear();
  const C = new Client('third'); await C.connect(); C.send({ t: 'join', name: 'Speedy', variant: 0 });
  const pa = await A.waitFor('presence');
  ok(!!pa && pa.count === 3, 'presence count = 3 after third join');

  console.log('— T3: state relay between players —');
  await A.clear(); await B.clear(); await C.clear();
  A.send({ t: 'state', p: [12, 0, 34], h: 1.5, s: 60, prog: 100, lap: 1 });
  const sb = await B.waitFor('snap', 1000);
  ok(!!sb && Array.isArray(sb.s) && sb.s.some(s => s[0] === wa.id), '15 Hz snapshot relays A→B (id + position)');
  ok(sb.s.find(s => s[0] === wa.id)[1] === 12, 'position x relayed correctly');

  console.log('— T4: invite to offline user —');
  await A.clear();
  A.send({ t: 'invite', to: 'GhostRider' });
  const f1 = await A.waitFor('invitefail');
  ok(!!f1 && f1.why === 'offline', 'offline username → invitefail(offline)');

  console.log('— T5: invite yourself —');
  await A.clear();
  A.send({ t: 'invite', to: 'Piyush' });
  const f2 = await A.waitFor('invitefail');
  ok(!!f2 && f2.why === 'self', 'own username → invitefail(self)');

  console.log('— T6: invite online user (case-insensitive) → request arrives on their phone —');
  await A.clear(); await C.clear();
  A.send({ t: 'invite', to: 'speedy' });                     // lowercase, C registered 'Speedy'
  const sent = await A.waitFor('invitesent');
  const req = await C.waitFor('invitereq');
  ok(!!sent && sent.to === 'Speedy', 'inviter gets "request sent"');
  ok(!!req && req.from === 'Piyush', 'target phone receives invitereq from "Piyush"');

  console.log('— T7: DECLINE flow —');
  await A.clear(); await C.clear();
  C.send({ t: 'decline', to: 'Piyush' });
  const dec = await A.waitFor('inviteresult');
  ok(!!dec && dec.ok === false && dec.name === 'Speedy', 'inviter sees "Speedy declined"');

  console.log('— T8: invite → ACCEPT → both moved to same private room —');
  await A.clear(); await C.clear();
  A.send({ t: 'invite', to: 'Speedy' });
  await A.waitFor('invitesent'); await C.waitFor('invitereq');
  C.send({ t: 'accept', to: 'Piyush' });
  const mvA = await A.waitFor('roommove'), mvC = await C.waitFor('roommove');
  const accA = await A.waitFor('inviteresult');
  ok(!!mvA && !!mvC && mvA.room === mvC.room && /^P/.test(mvA.room), 'both players land in the same private room ' + (mvA && mvA.room));
  ok(!!accA && accA.ok === true && accA.name === 'Speedy', 'inviter sees "Speedy accepted"');
  ok(mvA.players.length === 2 && mvC.players.length === 2, 'private room contains exactly 2 players');
  const mvB = await B.waitFor('roommove', 500);
  ok(mvB === null, 'uninvited player stays in the lobby');

  console.log('— T9: 2-player race in the private room (start + chat + finish relay) —');
  await A.clear(); await C.clear(); await B.clear();
  A.send({ t: 'start' });
  const stC = await C.waitFor('start'), stB = await B.waitFor('start', 500);
  ok(!!stC, 'race start reaches the friend');
  ok(stB === null, 'race start does NOT leak to the lobby');
  A.send({ t: 'chat', m: 'ready?' });
  const chC = await C.waitFor('chat');
  ok(!!chC && chC.from === 'Piyush' && chC.m === 'ready?', 'chat relayed between the 2 players');
  A.send({ t: 'finish', ms: 91234 });
  const finC = await C.waitFor('finish');
  ok(!!finC && finC.id === wa.id && finC.ms === 91234, 'finish time relayed to the friend');
  A.send({ t: 'state', p: [50, 0, 60], h: 0, s: 80, prog: 200, lap: 1 });
  const snapC = await C.waitFor('snap', 1000);
  ok(!!snapC, 'state snapshots flow in the private room');

  console.log('— T10: accept an expired/unknown invite —');
  await C.clear();
  C.send({ t: 'accept', to: 'NobodyInvitedMe' });
  const f3 = await C.waitFor('invitefail');
  ok(!!f3 && f3.why === 'gone', 'bogus accept → invitefail(gone)');

  console.log('— T11: disconnect cleanup —');
  await A.clear();
  C.ws.close();
  const pa2 = await A.waitFor('presence');
  ok(!!pa2 && pa2.count === 2, 'presence drops to 2 after friend leaves');
  const pl = await A.waitFor('players');
  ok(!!pl && pl.players.length === 1, 'player list updated — only 1 player left in room');

  A.ws.close(); B.ws.close();
  await new Promise(r => setTimeout(r, 300));
  console.log('\n══════════════════════════════════');
  console.log(` RESULT: ${passed} passed, ${failed} failed`);
  console.log('══════════════════════════════════');
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error('TEST CRASH:', e); process.exit(1); });
