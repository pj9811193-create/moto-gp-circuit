# 🏍️ Moto GP Circuit — 3D Multiplayer Bike Racing

A browser bike-racing game in a **single HTML file** (three.js + a real GLB motorcycle model
with rider and lean animations), with a **100-bike garage**, AI opponents, and **true online
multiplayer with usernames and friend requests** through a tiny server you host yourself.

The game now boots in **under a second** — the whole 3D engine is embedded in the file, and the
HD bike model downloads in the background while you're already riding (it hot-swaps in
mid-race and is cached for instant load next time). A green **⚡ ready in X.XXs** chip on the
menu screen shows the real measured boot time.

## What's in this folder

| File            | What it is                                                    |
|-----------------|---------------------------------------------------------------|
| `bike-racer.html` | The whole game. Double-click it to play.                    |
| `server.js`     | Multiplayer server with usernames + friend requests.          |
| `package.json`  | Node dependencies for the server.                             |
| `start.bat`     | **One-click launcher (Windows)** — double-click it.            |
| `start.sh`      | **One-click launcher (Mac / Linux)** — run `./start.sh`.       |
| `setup-android.sh` | **One-command setup for Android phones (Termux)**.       |
| `render.yaml`   | One-click deploy blueprint for https://render.com.            |
| `README.md`     | This file.                                                     |

## 🎮 Play instantly (single player)

Just open `bike-racer.html` in Chrome / Edge / Firefox — no internet needed to boot, and after
the first load even the 3D model is cached, so the game opens fully offline.

- **4 maps × 4 seasons × 4 weathers** — pick any combination from the main menu:
  🏁 GP Circuit · 🏙 Street Loop · ⛰ Mountain GP · 🌀 Hairpin Park,
  ☀️ Summer · 🍂 Autumn · ❄️ Winter · 🌸 Spring,
  🌤 Clear · 🌧 Rain · ❄️ Snow · 🌫 Fog. Your choice is remembered, and in online races
  the map syncs whoever starts the race (season/weather are per-player).
- **🌍 1.6x bigger world** — every map is much larger (2–3 km laps), with a wider view
  distance, bigger mountains and a forest of 500 trees around the circuit.
- **🎨 graphics upgrades** — filmic (ACES) tone mapping, red/white corner curbs, painted
  start-grid boxes with numbers, grandstands full of crowds along the straights, a glowing
  sun, and two tree types (pines + broadleaf) in every season colour.
- **📷 Quality switch (fast loading)** — phones automatically load the lighter 99k-triangle
  model (≈4.3 MB, half the triangles) so the game opens and runs smoothly; desktops load the
  full 200k model. You can override it anytime: **Auto → HD (200k) → Fast (99k)** from the
  menu — the switch hot-swaps every bike once the other model is cached.
- Pick from **100 bikes** in the garage (20 colors × 5 classes — Street 125 … Legend GP; each
  has different top speed / acceleration / handling).
- **Quick Race** puts you against 7 AI riders on a 3-lap circuit.
- Controls: `W`/`↑` throttle · `S`/`↓`/`Space` brake · `A`/`D` or `←`/`→` steer · `Esc` menu.
- **Auto-steer is ON by default** — the bike follows the track by itself and brakes for corners,
  so you only need the throttle. Turn it off in the menu, or toggle anytime with `T` / the 🧭
  button while racing. Steering manually while it's on overrides it instantly.
- Camera views: press `C` to cycle, or keys `1`–`4` to pick directly — 🎥 Chase · 👁 Rider's eye ·
  🔙 Back (rear view) · 🕳 Bottom (ground-level angle).
- Touch devices get an on-screen **joystick**: drag left/right to steer, push **up for throttle**,
  pull **down for brake** — plus ⛽ throttle and 🛑 brake buttons. On desktop you can enable the
  touch controls in the menu (“Show touch controls”).
- Click the 🔊 Sound button (bottom-right during a race) to mute the engine sound.

## 🌐 Online multiplayer — usernames + friend requests

Your username is **automatic** — the game picks one like `Rider_7k2x` the first time and
remembers it (edit it at the top of the menu). No room codes to share anymore:

1. Type your friend's **exact username** in the *Invite a friend* box → **Send request**.
2. If they're online, **their phone immediately gets your request** — a pop-up with
   **✔ Accept / ✖ Decline**.
3. They tap **Accept** → you both jump into a **private 2-player race room**.
4. Either of you hits **🏁 Start Race** — you race each other in real time (positions, laps,
   chat and results all sync). Works with just 2 players, or invite more friends into the same room.

If the username isn't online you get “*X is not online right now*”, and if they decline you're
told that too. Everyone who connects shows up in the online player count.

### Run the server on your own computer — ONE click

- **Windows:** double-click **`start.bat`**.
- **Mac / Linux:** run **`./start.sh`**.

That's it. The script installs what's needed (one time), starts the server and
opens the game in your browser automatically. It also opens the Node.js download
page for you if Node isn't installed yet — install it, then run the script again.

(Manual equivalent, if you prefer: `npm install && npm start`)

Then:

- You: open **http://localhost:8765** (the server serves the game itself at `/`), or keep
  using your copy of `bike-racer.html` with server address `ws://localhost:8765`.
- Friends on the **same Wi-Fi**: they open `http://<your-LAN-IP>:8765` (the IP is printed
  when the server starts).

### Host it online for free (Render) — works from phones anywhere

1. Push **all the files** in this folder to a GitHub repo.
2. Create an account at https://render.com → **New → Blueprint** → pick your repo.
   The included `render.yaml` configures the build, the start command and the free
   plan automatically — nothing to type.
4. When it's live you get an address like `https://your-app.onrender.com` — everyone just
   pastes that into the game's Server box. It's accepted as `https://…` **or** `wss://…` —
   the game auto-converts and always uses the secure `wss` protocol when the page itself is
   served over https (a plain `ws://` address is blocked by browsers on https pages — the game
   upgrades it for you automatically).

**Zero typing:** whenever you open the game from a server's own link
(`http://localhost:8765` or `https://your-app.onrender.com`), the game
**auto-connects its multiplayer to that same address** — you never type a server
address at all.

**Important:** you must play the game from the *server's* URL (`https://your-app.onrender.com`)
or from a local file — not from a different https site pointing at `ws://` (the game upgrades
that too, but your server must still allow secure WebSocket connections, which Render does).

### Play AND host entirely on an Android phone (Termux) — one command

Your phone can be the game server — no computer needed:

1. Install **Termux** from **F-Droid** (https://f-droid.org — *not* the Play Store version,
   which is outdated). Install the F-Droid app, search Termux, install.
2. From the chat / file share, download **`bike-racer.html`** and **`server.js`** into your
   phone's **Downloads** folder.
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

### LAN / offline

`npm start` prints every LAN IP it finds — friends on the same Wi-Fi (or your Android
hotspot) can play from `http://<ip>:8765` with plain `ws://`. Phones on mobile data need
the Render (or similar) hosting above.
