# ğŸï¸ Moto GP Circuit â€” 3D Multiplayer Bike Racing

A browser bike-racing game in a **single HTML file** (three.js + a real GLB motorcycle model
with rider and lean animations), with a **100-bike garage**, AI opponents, and **true online
multiplayer** â€” plus a physics-driven animation system (wheelies, stoppies, suspension dive,
top-speed vibration, crash wobble, launch burnouts, victory celebrations) and a **custom 3D
model loader**: drop in ANY animated `.glb` bike from the garage and it becomes your ride â€” either through a **free public relay (no server, no account, never sleeps)**
or through a tiny server you host yourself.

The game boots in **under a second** â€” the whole 3D engine is embedded in the file, and the
HD bike model downloads in the background while you're already riding (it hot-swaps in
mid-race and is cached for instant load next time). A green **âš¡ ready in X.XXs** chip on the
menu screen shows the real measured boot time.

## What's in this folder

| File            | What it is                                                    |
|-----------------|---------------------------------------------------------------|
| `bike-racer.html` | The whole game. Double-click it to play (also on the Releases page). |
| `server.js`     | Optional multiplayer server with usernames + friend requests. |
| `package.json`  | Node dependencies for the server.                             |
| `start.bat`     | **One-click launcher (Windows)** â€” double-click it.            |
| `start.sh`      | **One-click launcher (Mac / Linux)** â€” run `./start.sh`.       |
| `setup-android.sh` | **One-command setup for Android phones (Termux)**.       |
| `render.yaml`   | One-click deploy blueprint for https://render.com.            |
| `mptest2.js`    | Multiplayer protocol test suite (23 assertions).              |
| `README.md`     | This file.                                                     |

## ğŸ¬ Animations & custom 3D models (v2.3)

The game code is pure **logic + controls** â€” all the acting comes from the 3D model,
driven by race physics:

- **Wheelies** when you accelerate hard (faster bikes lift harder)
- **Stoppies** under hard braking, with suspension dive and bounce-back
- **Top-speed vibration** as you approach your bike's max
- **Crash wobble + tyre smoke** when you slam the barriers
- **Launch burnout** at GO! and **victory wheelie pumps** when you finish
- Rider lean clips (idle / left / right) blend with your steering

**ğŸ”„ Ulta Rider (v2.5) â€” ON by default:** the bike rides **BACKWARDS** for the whole race â€”
its front points rear, start to finish (every AI bot too). Wheelies, leans and the victory
celebration all happen in reverse riding style. Toggle it in the garage with the
**â€œğŸ”„ Ulta Riderâ€** button; the choice is remembered on your device.

**Bring your own 3D bike.** In the garage, tap **â€œğŸ“¦ Use your own 3D bike model (.glb)â€** and
pick any `.glb`/`.gltf` you downloaded (e.g. high-poly bikes from [Sketchfab](https://sketchfab.com)
â€” filter by downloadable + free licence). The game auto-scales and centres it, auto-detects
its animation clips (idle / lean-left / lean-right when named that way, otherwise the Y¥ÉÍĞ)±¥À±½½ÁÌ¤°…ÁÁ±¥•Ìå½ÕÈ‰¥­”Ì±…ÍÌ½±½ÕÈÑ¼‰½‘å€µ…Ñ•É¥…±Ì°…¹€¨©Í…Ù•Ì¥Ğ½¸å½ÕÈ)‘•Ù¥”¨¨Í¼¥Ğ±½…‘Ì…ÕÑ½µ…Ñ¥…±±ä¹•áĞÑ¥µ”¸=¹”Ñ…ÀÍİ¥Ñ¡•Ì‰…¬Ñ¼Ñ¡”‰Õ¥±Ğµ¥¸‰¥­”¸()!¥¡•È‰¥­”±…ÍÍ•Ì…±Í¼•Ğ±½ÍÍ¥•È°µ½É”µ•Ñ…±±¥ŒÁ…¥¹ĞƒŠPÑ¡”Ñ½À±…ÍÍ•Ì±½Ü¸((ŒŒƒÂ~:¸A±…ä¥¹ÍÑ…¹Ñ±ä€¡Í¥¹±”Á±…å•È¤())ÕÍĞ½Á•¸‰¥­”µÉ…•È¹¡Ñµ±€¥¸¡É½µ”€¼‘”€¼¥É•™½àƒŠP¹¼¥¹Ñ•É¹•Ğ¹••‘•Ñ¼‰½½Ğ°…¹…™Ñ•È)Ñ¡”™¥ÉÍĞ±½…•Ù•¸Ñ¡”€Íµ½‘•°¥Ì…¡•°Í¼Ñ¡”…µ”½Á•¹Ì™Õ±±ä½™™±¥¹”¸((´A¥¬™É½´€¨¨ÄÀÀ‰¥­•Ì¨¨¥¸Ñ¡”…É…”€ ÈÀ½±½ÉÌƒ\€Ô±…ÍÍ•ÌƒŠPMÑÉ••Ğ€ÄÈÔƒŠ˜1••¹@ì•… (€¡…Ì‘¥™™•É•¹ĞÑ½ÀÍÁ••€¼…•±•É…Ñ¥½¸€¼¡…¹‘±¥¹œ¤¸(´€¨©EÕ¥¬I…”¨¨ÁÕÑÌå½Ô……¥¹ÍĞ€Ü$É¥‘•ÉÌ½¸„€Ìµ±…À¥ÉÕ¥Ğ¸(´½¹ÑÉ½±Ìè]€½ƒŠE€Ñ¡É½ÑÑ±”ƒ
ÜM€½ƒŠM€½MÁ…•€‰É…­”ƒ
Ü€½€½ÈƒŠA€½ƒŠI€ÍÑ••Èƒ
ÜÍ€µ•¹Ô¸(´€¨©EÕÑ¼µÍÑ••È¥Ì=8‰ä‘•™…Õ±Ğ¨¨ƒŠPÑ¡”‰¥­”™½±±½İÌÑ¡”ÑÉ…¬‰ä¥ÑÍ•±˜…¹‰É…­•Ì™½È½É¹•ÉÌ°(€Í¼å½Ô½¹±ä¹••Ñ¡”Ñ¡É½ÑÑ±”¸]¡¥±”É¥‘¥¹œ°Ñ¡”‰¥œ€¨«Â~´ÕÑ¼è=8½=‰ÕÑÑ½¸Í¥ÑÌ…ĞÑ¡”(€‰½ÑÑ½´•¹ÑÉ”½˜Ñ¡”ÍÉ••¸¨¨ƒŠPÑ…À¥Ğ…¹äÑ¥µ”¸QÕÉ¸¥Ğ½™˜¥¸Ñ¡”µ•¹ÔÑ½¼°½ÈÑ½±”İ¥Ñ (€Q€¸MÑ••É¥¹œµ…¹Õ…±±äİ¡¥±”¥ĞÌ½¸½Ù•ÉÉ¥‘•Ì¥Ğ¥¹ÍÑ…¹Ñ±ä¸(´…µ•É„Ù¥•İÌèÁÉ•ÍÌ€Ñ¼å±”°½È­•åÌ€ÅƒŠM€Ñ€Ñ¼Á¥¬‘¥É•Ñ±äƒŠPƒÂ~:”¡…Í”ƒ
ÜƒÂ~FI¥‘•ÈÌ•å”ƒ
Ü(€ƒÂ~Rd	…¬€¡É•…ÈÙ¥•Ü¤ƒ
ÜƒÂ~VÌ	½ÑÑ½´€¡É½Õ¹µ±•Ù•°…¹±”¤¸(´ƒÂ~R(€¨©I¥‘¥¹œÍ½Õ¹¨¨è„‘••À•¹¥¹”¹½Ñ”Ñ¡…ĞÉ•ÙÌİ¥Ñ å½ÕÈÑ¡É½ÑÑ±”°İ¥¹Ñ¡…ĞÉ½İÌİ¥Ñ (€ÍÁ••°…¹Ñ¥É”µÍÉÕˆİ¡•¸å½Ô½É¹•È½È‰É…­”¡…É¸%ĞÍÑ…ÉÑÌÑ¡”µ½µ•¹Ğå½ÔÑ…ÀÑ¡”…µ”(€€¡‰É½İÍ•ÉÌ¹••½¹”Ñ…À‰•™½É”…Õ‘¥¼…¸Á±…ä¤¸(´ƒÂ~:Ô€¨©	…­É½Õ¹µÕÍ¥Œ¨¨è„•¹•É…Ñ•Íå¹Ñ¡İ…Ù”±½½À€¡­¥¬°‰…ÍÌ°Á…‘Ì°•¡½¥¹œ…ÉÁ•¥¼ƒŠP(€€ÄÀÀ”]•ˆÕ‘¥¼°¹¼™¥±•Ì¹••‘•¤¸Q½±”¥Ğİ¥Ñ Ñ¡”€¨«Â~:Ô‰ÕÑÑ½¸¨¨ìƒÂ~R(M½Õ¹µÕÑ•Ì•Ù•ÉåÑ¡¥¹œ¸(´Q½Õ ‘•Ù¥•Ì•Ğ…¸½¸µÍÉ••¸€¨©©½åÍÑ¥¬¨¨è‘É…œ±•™Ğ½É¥¡ĞÑ¼ÍÑ••È°ÁÕÍ €¨©ÕÀ™½ÈÑ¡É½ÑÑ±”¨¨°(€ÁÕ±°€¨©‘½İ¸™½È‰É…­”¨¨ƒŠPÁ±ÕÌƒŠnôÑ¡É½ÑÑ±”…¹ƒÂ~nD‰É…­”‰ÕÑÑ½¹Ì¸=¸‘•Í­Ñ½Àå½Ô…¸•¹…‰±”Ñ¡”(€Ñ½Õ ½¹ÑÉ½±Ì¥¸Ñ¡”µ•¹Ô€£ŠqM¡½ÜÑ½Õ ½¹ÑÉ½±ÏŠt¤¸((ŒŒƒÂ~2@=¹±¥¹”µÕ±Ñ¥Á±…å•ÈƒŠPé•É¼Í•ÑÕÀ€¡™É•”ÁÕ‰±¥ŒÉ•±…ä¤((¨©9¼Í•ÉÙ•È¸9¼…½Õ¹Ğ¸9¼½ÍĞ¸9•Ù•ÈÍ±••ÁÌ¸¨¨Q¡”…µ”…¸É…”½¹±¥¹”Ñ¡É½Õ ™É•”(¨©ÁÕ‰±¥Œ5EQPÉ•±…åÌ¨¨€¡5E`€¼!¥Ù•5D€¼5½ÍÅÕ¥ÑÑ¼ƒŠPÑÉ¥•¥¸½É‘•È°…ÕÑ½µ…Ñ¥Œ™…¥±½Ù•È¤½Ù•È„)Í•ÕÉ”]•‰M½­•Ğ½¹¹•Ñ¥½¸¸((´]¡•¸å½Ô½Á•¸Ñ¡”…µ”™É½´„ÍÑ…Ñ¥Œ¡½ÍĞƒŠP±¥­”Ñ¡¥ÌÉ•Á¼Ì€¨©¥Ñ!ÕˆA…•Ì±¥¹¬¨¨ƒŠP¥Ğ(€€¨©…ÕÑ¼µ½¹¹•ÑÌÑ¼Ñ¡”É•±…ä‰ä¥ÑÍ•±˜¨¨¸)ÕÍĞÁÉ•ÍÌ€¨«Â~24A±…ä½¹±¥¹”¨¨¸(´=¸å½ÕÈ½İ¸½µÁÕÑ•È°ÁÉ•ÍÌ€¨«Â~24A±…ä½¹±¥¹”ƒŠP™É•”ÁÕ‰±¥ŒÉ•±…ä€¡¹¼Í•ÉÙ•È¹••‘•¤¨¨¥¸Ñ¡”(€µÕ±Ñ¥Á±…å•ÈÍ•Ñ¥½¸½˜Ñ¡”µ•¹Ô¸(´Q¡•¸¥Ğİ½É­Ì•á…Ñ±ä±¥­”‰•™½É”èå½Ô•Ğ…¸…ÕÑ½µ…Ñ¥ŒÕÍ•É¹…µ”€¡I¥‘•É|İ¬Éá€°•‘¥Ñ…‰±”¤°(€•Ù•Éå½¹”½¹±¥¹”Í¡½İÌÕÀ¥¸Ñ¡”Á±…å•È½Õ¹Ğ°å½Ô€¨©¥¹Ù¥Ñ”„™É¥•¹‰äÕÍ•É¹…µ”¨¨°Ñ¡•ä•Ğ(€€¨«ŠrP•ÁĞ€¼ƒŠrX•±¥¹”¨¨½¸Ñ¡•¥ÈÍÉ••¸°…¹½¸•ÁĞå½Ô‰½Ñ ±…¹¥¸„€¨©ÁÉ¥Ù…Ñ”€ÈµÁ±…å•È(€É…”É½½´¨¨İ¥Ñ ±¥Ù”€ÄÔ!èÁ½Í¥Ñ¥½¸Íå¹Œ°¡…Ğ…¹É•ÍÕ±ÑÌ¸()9½Ñ•ÌèÁÕ‰±¥ŒÉ•±…åÌ…É”Í¡…É•½µµÕ¹¥Ñä¥¹™É…ÍÑÉÕÑÕÉ”ƒŠPÉ•…Ğ™½È…ÍÕ…°É…•Ìİ¥Ñ ™É¥•¹‘Ì°)‰ÕĞÑ¡•ä½™™•È¹¼ÁÉ¥Ù…ä½ÈÕÁÑ¥µ”Õ…É…¹Ñ•”¸½ÈÁÉ¥Ù…Ñ”½18Á±…ä°¡½ÍĞÑ¡”Í•ÉÙ•È‰•±½Ü¸((ŒŒƒÂ~Z—¾â<=¹±¥¹”µÕ±Ñ¥Á±…å•ÈƒŠPÉÕ¸å½ÕÈ½İ¸Í•ÉÙ•È€¡½ÁÑ¥½¹…°¤()Q¡”Í•ÉÙ•Èµ½‘”¥Ù•Ìå½Ô„ÁÉ¥Ù…Ñ”±½‰‰ä½¸å½ÕÈ½İ¸µ…¡¥¹”½È„™É•”¡½ÍĞ°İ¥Ñ Ñ¡”•á…Ğ)Í…µ”ÕÍ•É¹…µ•Ì€¬™É¥•¹É•ÅÕ•ÍÑÌ™±½Ü¸Qİ¼İ…åÌÑ¼½¹¹•Ğè((´€¨©A±…ä™É½´Ñ¡”Í•ÉÙ•ÈÌ½İ¸±¥¹¬¨¨€¡¡ÑÑÀè¼½±½…±¡½ÍĞèàÜØÕ€¤ƒŠPÑ¡”…µ”…ÕÑ¼µ½¹¹•ÑÌ¥ÑÌ(€µÕ±Ñ¥Á±…å•ÈÑ¼Ñ¡…ĞÍ…µ”…‘‘É•ÍÌ¸i•É¼ÑåÁ¥¹œ¸(´=È½Á•¸…¹ä½Áä½˜Ñ¡”…µ”…¹•¹Ñ•ÈÑ¡”Í•ÉÙ•È…‘‘É•ÍÌ¥¸Ñ¡”M•ÉÙ•È‰½à¸¡ÑÑÁÌè¼¿Š™€(€…‘‘É•ÍÍ•Ì…É”…ÕÑ¼µÕÁÉ…‘•Ñ¼Í•ÕÉ”İÍÌè¼½€€¡Á±…¥¸İÌè¼½€¥Ì‰±½­•‰ä‰É½İÍ•ÉÌ½¸(€¡ÑÑÁÌÁ…•ÌƒŠPÑ¡”…µ”½¹Ù•ÉÑÌ¥Ğ™½Èå½Ô¤¸()%˜Ñ¡”Í•ÉÙ•È¥Ì½¸„€¨©™É•”¡½ÍĞÑ¡…ĞÍ±••ÁÌ¨¨€¡±¥­”I•¹‘•ÈÌ™É•”Ñ¥•È¤°Ñ¡”…µ”¹½Ü(¨©É•½¹¹•ÑÌ…ÕÑ½µ…Ñ¥…±±ä¨¨ƒŠP¥ĞÍ¡½İÌƒŠqI•½¹¹•Ñ¥¹œƒŠP™É•”Í•ÉÙ•ÉÌÑ…­”øÌÁÌÑ¼İ…­—Š›Št)…¹É•ÑÉ¥•Ì°Í¼Ñ¡”f—'7BW'6öâFò÷Vâ—BgFW"'&V²§W7Bv—G2fWr6V6öæG2à ¢222öæRÖ6Æ–6²ÆVæ6‚öâ–÷W"6ö×WFW  ¢Ò¢¥v–æF÷w3¢¢¢F÷V&ÆRÖ6Æ–6²¢¦7F'Bæ&F¢¢à¢Ò¢¤Ö2òÆ–çWƒ¢¢¢'Vâ¢¦â÷7F'Bç6†¢¢à ¥F†Bw2—BâF†R67&—B–ç7FÆÇ2v†Bw2æVVFVB†öæRF–ÖR’Â7F'G2F†R6W'fW"æB÷Vç2F†RvÖP¦–â–÷W"'&÷w6W"WFöÖF–6ÆÇ’â—BÇ6ò÷Vç2F†RæöFRæ§2F÷væÆöBvR–bæöFR—6âwB–ç7FÆÆV@§–WB(	B–ç7FÆÂ—BÂF†Vâ'VâF†R67&—Bv–âà ¢„ÖçVÂWV—fÆVçC¢çÒ–ç7FÆbbçÒ7F'F ¢Ò–÷S¢÷Vâ¢¦‡GG¢òöÆö6Æ†÷7C£ƒscR¢¢à¢Òg&–VæG2öâF†R¢§6ÖRv’Ôf’¢£¢F†W’÷Vâ¢¦‡GG¢òóÇ–÷W"ÔÄâÔ•ã£ƒscR¢¢‡F†R•—2&–çFV@¢v†VâF†R6W'fW"7F'G2’à ¢222†÷7B—BöæÆ–æRf÷"g&VR…&VæFW" £â6–vâWB‡GG3¢ò÷&VæFW"æ6öÒ(i"¢¤æWr(i"&ÇVW&–çB¢¢(i"–6²F†—2&Wò(	BF†R–æ6ÇVFV@¢&VæFW"ç–ÖÆ6öæf–wW&W2F†R'V–ÆBÂ7F'B6öÖÖæBæBg&VRÆâWFöÖF–6ÆÇ’à£"âv†Vâ—Bw2Æ—fR–÷RvWBâFG&W72Æ–¶R‡GG3¢ò÷–÷W"Öæöç&VæFW"æ6öÖ(	BWfW'–öæR§W7@¢÷Vç2F†BÆ–æ²æBF†RvÖRWFòÖ6öææV7G2à ¢…v—F‚F†Rg&VR&VÆ’&÷fRÂ&VæFW"—2æ÷r÷F–öæÂ(	B'WB—Bv—fW2–÷R–÷W"÷vâ&—fFR6W'fW"â ¢222Æ’äB†÷7BVçF—&VÇ’öââæG&ö–B†öæR…FW&×W‚ £â–ç7FÆÂ¢¥FW&×W‚¢¢g&öÒ¢¤bÔG&ö–B¢¢†‡GG3¢òöbÖG&ö–Bæ÷&r(	B¦æ÷B¢F†RÆ’7F÷&RfW'6–öâÀ¢v†–6‚—2÷WFFFVB’à£"âF÷væÆöB¢¦&–¶R×&6W"æ‡FÖÆ¢¢æB¢¦6W'fW"æ§6¢¢–çFò–÷W"†öæRw2¢¤F÷væÆöG2¢¢föÆFW ¢†g&öÒF†—2&Wòw2&VÆV6W2vRÂ÷"F†R&Wòf–ÆW2F—&V7FÇ’’à£2â÷VâFW&×W‚æB7FRF†—2öæRÆ–æS  ¢ ¢&6‚â÷7F÷&vRöF÷væÆöG2÷6WGWÖæG&ö–Bç6€¢  ¢—B6·2f÷"7F÷&vRW&Ö—76–öâ‡FÆÆ÷r’Â6÷–W2F†Rf–ÆW2Â–ç7FÆÇ2æöFRæ§2æBF†P¢6W'fW"WFöÖF–6ÆÇ’ÂæB7F'G2WfW'—F†–ærà£Bâ÷Vâ6‡&öÖRöâF†R†öæR(i"¢¦‡GG¢òöÆö6Æ†÷7C£ƒscR¢¢(	BF†RvÖR7F'G2æB—G2×VÇF—Æ–W ¢¢¦WFòÖ6öææV7G2¢¢‡–÷Rw&RÆ––æröâF†R6W'fW"—G6VÆb’à£Râg&–VæG3¢GW&âöâ–÷W"†öæRw2¢¤†÷G7÷B¢¢†÷"¦ö–âF†R6ÖRv’Ôf’’(	BF†W’÷VâF†P¢‡GG¢òóÇ†öæRÖ—ã£ƒscVFG&W72F†R67&—B&–çG2âF†Vâ–çf—FR'’W6W&æÖRæB&6Rà ¤&GFW'’F—¢6òæG&ö–BFöW6âwB¶–ÆÂF†R6W'fW"Ö–B×&6RÂ¶VWFW&×W‚–âF†R&V6VçBÖ0¦Æ—7B†FöâwB7v—R—Bv’’æB6WBæG&ö–B6WGF–æw2(i"2(i"FW&×W‚(i"&GFW'’(i"Vç&W7G&–7FVBà ¢22FW7F–æp ¦æöFR×FW7C"æ§6‡6W'fW"'Vææ–æröâ÷'BƒscR’(	B#2&÷Fö6öÂ76W'F–öç26÷fW&–ærW6W&æÖW2À¦–çf—FW2Â66WBöFV6Æ–æRÂ&—fFR&öö×2ÂR‡¢7–æ2æBF—66öææV7B6ÆVçWà