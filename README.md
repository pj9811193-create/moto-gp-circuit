# 🏍️ Moto GP Circuit — 3D Multiplayer Bike Racing

A browser bike-racing game in a **single HTML file** (three.js + a real GLB motorcycle model
with rider and lean animations), with a **100-bike garage**, AI opponents, and **true online
multiplayer** — plus a physics-driven animation system (wheelies, stoppies, suspension dive,
top-speed vibration, crash wobble, launch burnouts, victory celebrations) and a **custom 3D
model loader**: drop in ANY animated `.glb` bike from the garage and it becomes your ride — either through a **free public relay (no server, no account, never sleeps)**
or through a tiny server you host yourself.

The game boots in **under a second** — the whole 3D engine is embedded in the file, and the
HD bike model downloads in the background while you're already riding (it hot-swaps in
mid-race and is cached for instant load next time). A green **⚡ ready in X.XXs** chip on the
menu screen shows the real measured boot time.

## What's in this folder

| File            | What it is                                                    |
|-----------------|---------------------------------------------------------------|
| `bike-racer.html` | The whole game. Double-click it to play (also on the Releases page). |
| `server.js`     | Optional multiplayer server with usernames + friend requests. |
| `package.json`  | Node dependencies for the server.                             |
| `start.bat`     | **One-click launcher (Windows)** — double-click it.            |
| `start.sh`      | **One-click launcher (Mac / Linux)** — run `./start.sh`.       |
| `setup-android.sh` | **One-command setup for Android phones (Termux)**.       |
| `render.yaml`   | One-click deploy blueprint for https://render.com.            |
| `mptest2.js`    | Multiplayer protocol test suite (23 assertions).              |
| `README.md`     | This file.                                                     |

## 🎬 Animations & custom 3D models (v2.3)

The game code is pure **logic + controls** — all the acting comes from the 3D model,
driven by race physics:

- **Wheelies** when you accelerate hard (faster bikes lift harder)
- **Stoppies** under hard braking, with suspension dive and bounce-back
- **Top-speed vibration** as you approach your bike's max
- **Crash wobble + tyre smoke** when you slam the barriers
- **Launch burnout** at GO! and **victory wheelie pumps** when you finish
- Rider lean clips (idle / left / right) blend with your steering

**🙃 Ulta Rider (v2.4) — ON by default:** every rider (and the AI bots) rides upside down
for the whole race — start to finish, wheelies and victory celebration included. Toggle it
in the garage with the **“🙃 Ulta Rider”** button; the choice is remembered on your device.

**Bring your own 3D bike.** In the garage, tap **“📦 Use your own 3D bike model (.glb)”** and
pick any `.glb`/`.gltf` you downloaded (e.g. high-poly bikes from [Sketchfab](https://sketchfab.com)
— filter by downloadable + free licence). The game auto-scales and centres it, auto-detects
its animation clips (idle / lean-left / lean-right when named that way, otherwise the first
clip loops), applies your bike's class colour to `body` materials, and **saves it on your
device** so it loads automatically next time. One tap switches back to the built-in bike.

Higher bike classes also get glossier, more metallic paint — the top classes glow.

## 🎮 Play instantly (single player)

Just open `bike-racer.html` in Chrome / Edge / Firefox — no internet needed to boot, and after
the first load even the 3D model is cached, so the game opens fully offline.

- Pick from **100 bikes** in the garage (20 colors × 5 classes — Street 125 … Legend GP; each
  has different top speed / acceleration / handling).
- **Quick Race** puts you against 7 AI riders on a 3-lap circuit.
- Controls: `W`/`↑` throttle · `S`/`↓`/`Space` brake · `A`/`D` or `←`/`→` steer · `Esc` menu.
- **Quto-steer is ON by default** — the bike follows the track by itself and brakes for corners,
  so you only need the throttle. While riding, the big **🧭 Auto: ON/OFF button sits at the
  bottom centre of the screen** — tap it any time. Turn it off in the menu too, or toggle with
  `T`. Steering manually while it's on overrides it instantly.
- Camera views: press `C` to cycle, or keys `1`–`4` to pick directly — 🎥 Chase · 👁 Rider's eye ·
  🔙 Back (rear view) · 🕳 Bottom (ground-level angle).
- 🔊 **Riding sound**: a deep engine note that revs with your throttle, wind that grows with
  speed, and tire-scrub when you corner or brake hard. It starts the moment you tap the game
  (browsers need one tap before audio can play).
- 🎵 **Background music**: a generated synthwave loop (kick, bass, pads, echoing arpeggio —
  100% Web Audio, no files needed). Toggle it with the **🎵 button**; 🔊 Sound mutes everything.
- Touch devices get an on-screen **joystick**: drag left/right to steer, push **up for throttle**,
  pull **down for brake** — plus ⛽ throttle and 🛑 brake buttons. On desktop you can enable the
  touch controls in the menu (“Show touch controls”).

## 🌐 Online multiplayer — zero setup (free public relay)

**No server. No account. No cost. Never sleeps.** The game can race online through free
**public MQTT relays** (EMQX / HiveMQ / Mosquitto — tried in order, automatic failover) over a
secure WebSocket connection.

- When you open the game from a static host — like this repo's **GitHub Pages link** — it
  **auto-connects to the relay by itself**. Just press **🌍 Play online**.
- On your own computer, press **🌍 Play online — free public relay (no server needed)** in the
  multiplayer section of the menu.
- Then it works exactly like before: you get an automatic username (`Rider_7k2x`, editable),
  everyone online shows up in the player count, you **invite a friend by username**, they get
  **✔ Accept / ✖ Decline** on their screen, and on Accept you both land in a **private 2-player
  race room** with live 15 Hz position sync, chat and results.

Notes: public relays are shared community infrastructure — great for casual races with friends,
but they offer no privacy or uptime guarantee. For private/LAN play, host the server below.

## 🖥️ Online multiplayer — run your own server (optional)

The server mode gives you a private lobby on your own machine or a free host, with the exact
same usernames + friend requests flow. Two ways to connect:

- **Play from the server's own link** (`http://localhost:8765`) — the game auto-connects its
  multiplayer to that same address. Zero typing.
- Or open any copy of the game and enter the server address in the Server box. `https://…`
  addresses are auto-upgraded to secure `wss://` (plain `ws://` is blocked by browsers on
  https pages — the game converts it for you).

If the server is on a **free host that sleeps** (like Render's free tier), the game now
**reconnects automatically** — it shows “Reconnecting — free servers take ~30s to wake…”
and retries, so the first person to open it after a break just waits a few seconds.

### One-click launch on your computer

- **Windows:** double-click **`start.bat`**.
- **Mac / Linux:** run **`./start.sh`**.

That's it. The script installs what's needed (one time), starts the server and opens the game
in your browser automatically. It also opens the Node.js download page if Node isn't installed
yet — install it, then run the script again.

(Manual equivalent: `npm install && npm start`)

- You: open **http://localhost:8765**.
- Friends on the **same Wi-Fi**: they open **http://<your-LAN-IP>:8765** (the IP is printed
  when the server starts).

### Host it online for free (Render)

1. Sign up at https://render.com → **New → Blueprint** → pick this repo — the included
   `render.yaml` configures the build, start command and free plan automatically.
2. When it's live you get an address like `https://your-app.onrender.com` — everyone just
   opens that link and the game auto-connects.

(With the free relay above, Render is now optional — but it gives you your own private server.)

### Play AND host entirely on an Android phone (Termux)

1. Install **Termux** from **F-Droid** (https://f-droid.org — *not* the Play Store version,
   which is outdated).
2. Download **`bike-racer.html`** and **`server.js`** into your phone's **Downloads** folder
   (from this repo's Releases page, or the repo files directly).
3. Open Termux and paste this one line:

   ```
   bash ~/storage/downloads/setup-android.sh
   ```

   It asks for storage permission (tap Allow), copies the files, installs Node.js and the
   server automatically, and starts everything.
4. Open Chrome on the phone → **http://localhost:8765** — the game starts and its multiplayer
   **auto-connects** (you're playing on the server itself).
5. Friends: turn on your phone's **Hotspot** (or join the same Wi-Fi) — they open the
   `http://<phone-ip>:8765` address the script prints. Then invite by username and race.

Battery tip: so Android doesn't kill the server mid-race, keep Termux in the recent-apps
list (don't swipe it away) and set Android Settings → Apps → Termux → Battery → Unrestricted.

## Testing

`node mptest2.js` (server running on port 8765) — 23 protocol assertions covering usernames,
invites, accept/decline, private rooms, 15 Hz sync and disconnect cleanup.
