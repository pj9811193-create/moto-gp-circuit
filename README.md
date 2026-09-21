# ğŸï¸ Moto GP Circuit â€” 3D Multiplayer Bike Racing

A browser bike-racing game in a **single HTML file** (three.js + a real GLB motorcycle model
with rider and lean animations), with a **100-bike garage**, AI bots, and **true online
multiplayer with usernames and friend requests** through a tiny server you host yourself.

The game now boots in **under a second** â€” the whole 3D engine is embedded in the file, and the
HD bike model downloads in the background while you're already riding (it hot-swaps in
mid-race and is cached for instant load next time). A green **âš¡ ready in X.XXs* chip on the
menu screen shows the real measured boot time.

## What's in this folder

| File            | What it is                                                    |
|-----------------|---------------------------------------------------------------|
| `bike-racer.html` | The whole game. Double-click it to play.                    |
| `server.js`     | Multiplayer server with usernames + friend requests.          |
| `package.json`  | Node dependencies for the server.                            |
| `start.bat`     | **One-click launcher (Windows)** â€” double-click it.                  |
| `start.sh`       | **One-click launcher (Mac / Linux)** â€” run `./start.sh`.         |
| `setup-android.sh` | **One-command setup for Android phones (Termux)**.     |
| `render.yaml`    | One-click deploy blueprint for https://render.com.              |
| `README.md`     | This file.                                                    |

## ğŸ Play instantly (single player)

Just open `bike-racer.html` in Chrome / Edge / Firefox â€” no internet needed to boot, and after
the first load even the 3D model is cached, so the game opens fully offline.

- **4 maps Ã— 4 seasons Ã— 4 weathers** â€” pick any combination from the main menu:
  ğŸ½n GP Circuit Â· ğŸ Street Loop Â· â›¼€Ä5½Õ¹Ñ…¥¸@ƒ
ÜƒÂ~d¼!…¥ÉÁ¥¸A…É¬°(€ƒŠZ”ƒŠ^	qMÕµµ•Èƒ
ÜƒÂ~ÌÕÑÕµ¸ƒ
ÜƒÂ~Ü1•…˜UQ558\ü7
pMÁÉ¥¹œ°(€ƒÂ~2˜±•…Èƒ
ÜƒÂ~6}TI…¥¸±•…È…ÕÑ½´ƒ
ÜƒŠv…xÜM¹½ÜƒÜƒÂ~¼½
  - â•Ê¡ Quality switch (Âd phones automatically load the lighter 99k-triangle
  model (â‰ˆ0.4 MB, half the triangles) so the game opens and runs smoothly; desktops load the
  full 200k model. You can override it anytime: **Auto *àâ€œ FD (200k) **ÈT˜\İ
NZÊJŠˆœ›ÛHBˆY[H0îÈHİÚ]Úİ\İØ\È]™\HšZÙHÛ˜ÙHHİ\ˆ[Ù[\ÈØXÚY‚‚”][™È][ÙÙ]\ˆXÚÈ[HÛÛXš[˜][Ûˆ[™]]ZXÚÈ˜XÙKˆÚÚXØÙ\È\™H™[Y[X™\™Y‚‚‹HXÚÈœ›ÛH
ŠŒLšZÙ\ÊŠˆ[ˆHØ\˜YÙH
ŒÛÛÜœÈ0åÈHÛ\ÜÙ\È8 %İ™Y]LH8 )ˆYÙ[™ÔÈXXÚˆ\ÈY™™\™[ÜÜYYÈXØÙ[\˜][ÛˆÈ[™[™ÊK‚‹H
Š”]ZXÚÈ˜XÙJŠˆ]È[İHYØZ[œİÈRHšY\œÈÛˆHË[\Ú\˜İZ]‚‹HÛÛ›ÛÎˆØØ8¡¤X›İH0­ÈØØ8¡¤ØØÜXÙXœ˜ZÙH0­ÈXØÜˆ8¡¤Ø8¡¤˜İY\ˆ0­È\ØØY[K‚‹H
Š]]Ë\İY\ˆ\ÈÓˆHY˜][
Šˆ8 %HšZÙH›ÛİÜÈH˜XÚÈH]Ù[ˆ[™œ˜ZÙ\È›ÜˆÛÜ›™\œËˆÛÈ[İHÛ›H™YYH›İKˆ\›ˆ]Ù™ˆ[ˆHY[KÜˆÙÙÛH[][YHÚ]ÈH<'éëBˆ]ÛˆÚ[H˜XÚ[™ËˆİY\š[™ÈX[X[HÚ[H]	ÜÈÛˆİ™\œšY\È][œİ[K‚‹HØ[Y\˜HšY]ÜÎˆ™\ÜÈØÈŞXÛKÜˆÙ^\ÈX8 $ØÈXÚÈ\™XİH8 %<'ã¤H<'íø¡ˆÚZYrà0<'ägšY\‰ÜÈ^YH³ ü'ä¡ˆ˜XÚÈ
™X\ˆšY]ÊH0­È<'æ²HX\›K[[Ü›š[™È[™ÛY|'æåÈÛİË[[İš[™Èš\™	ÜËY^YB¼'ãH8 (•™YKšœÈ8 %HÚÛHÑ[™Ú[™H[›[™Y[ˆHØ[YHš[H
›ÂˆİÛ›ØY
K‚‚‹HİXÚ]šXÙ\ÈÙ][ˆÛ‹\ØÜ™Y[ˆ
Šš›Ş\İXÚÊŠˆ˜YÈYÜšYÚÈİY\‹\Ú
Š\›Üˆ›İJŠ‹ˆ[
Š™İÛˆ›Üˆœ˜ZÙJŠˆ8 %\È8©¯][\È\›ˆ[™<'ææHÙYZËYÛÚ[™È]ÛœËˆÛˆ\ÚİÜ[İHØ[ˆ[˜X›HBˆİXÚÛÛ›ÛÈ[ˆHY[H
8 'ÚİÈİXÚÛÛ›Ûø 'JK‚‹HÛXÚÈH8¡$‹ PÛÛœÛÛH]Ûˆ
›İÛK\šYÚ\š[™ÈH˜XÙJHÈ]]HH[™Ú[™HÛİ[™‚‚ˆÈÈ<'ãfÄÛ›[™H][\^Y\ˆ8 %\Ù\›˜[Y\È
ÈœšY[™™\]Y\İÂ‚–[İ\ˆ\Ù\›˜[YH\È
Š˜]]ÛX]XÊŠˆ8 %HØ[YHXÚÜÈÛ™HZÙHšY\—ÍÚÌHš\œİ[YH[™œ™[Y[X™\œÈ]
Y]]]HÜÙˆHY[JKˆ›È›ÛÛHÛÙ\ÈÈÚ\™H[[[Ü™N‚‚ŒKˆ\H[İ\ˆœšY[™	ÜÈ
Š™^Xİ\Ù\›˜[YJŠˆ[ˆH
’[š]HHœšY[™
ˆ›Ş8¡¤ˆ
Š”Ù[™™\]Y\İ
Š‹‚Œ‹ˆYˆ^IÜ™HÛ›[™K
ŠZ\ˆÛ™H[[YYX][HÙ]È[İ\ˆ™\]Y\İ
Šˆ8 %HÜ]\Ú]ˆ
Š¸§%XØÙ\È8§%ˆXÛ[™JŠ‹‚ŒËˆ^H\
ŠXØÙ\
Šˆ8¡¤ˆ[İH›İ[\[ÈH
Šœš]˜]H‹\^Y\ˆ˜XÙH›ÛÛJŠ‹‚ˆZ]\ˆÙˆ[İH]È
Š¼'ãàHİ\˜XÙJŠˆ8¡¤ˆ[İH˜XÙHXXÚİ\ˆ[ˆ™X[[YH
ÜÚ][ÛœË\ËˆÚ][™™\İ[È[Ş[˜ÊJŠ‹ˆÛÜšÜÈÚ]\İˆ^Y\œËÜˆ[š]H[Ü™HœšY[™È[ÈHØ[YH›ÛÛK‚‚’YˆH\Ù\›˜[YH\Û‰İÛ›[™H[İHÙ]8 ,
–\È›İÛ›[™HšYÚ›İø 'K[™Yˆ^HXÛ[™H[İIÜ™BÛ]ÛËˆ]™\[Û™HÚÈÛÛ›™XİÈÚİÜÈ\[ˆHÛ›[™H^Y\ˆÛİ[‚‚ˆÈÈ[ˆHÙ\™\ˆÛˆ[İ\ˆİÛˆÛÛ\]\ˆ8 %Ó‘HÛXÚÂ‚‹H
Š•Ú[™İÜÎŠŠˆİX›KXÛXÚÈ
Š˜İ\˜˜]
Š‹‚‹H
Š“XXÈÈ[^
Šˆ[ˆ
Š˜‹Üİ\œÚ
Š‹‚‚•]	ÜÈ]ˆHØÜš\[œİ[ÈÚ]	ÜÈ™YYY
Û™H[YJKİ\ÈHÙ\™\ˆ[™›Ü[œÈHØ[YH[ˆ[İ\ˆœ›İÜÙ\ˆ]]ÛX]XØ[Kˆ][ÛÈÜ[œÈH›ÙKšœÈİÛ›ØYœYÙH›Üˆ[İHYˆ›ÙH\Û‰İ[œİ[YY]8 %[œİ[][ˆ[ˆHØÜš\YØZ[‹‚‚ŠX[X[\]Z]˜[[Yˆ[İH™Y™\ˆœH[œİ[	‰ˆœHİ\
B‚•[‚‚‹H[İNˆÜ[ˆ
Šš‹ËÛØØ[ÜİÍJŠˆ
HÙ\™\ˆÙ\™\ÈHØ[YH]Ù[ˆ]Ø
KÜˆÙY\ˆ\Ú[™È[İ\ˆÛÜHÙˆšZÙK\˜XÙ\‹š[Ú]Ù\™\ˆY™\ÜØÜÎ‹ËÛØØ[ÜİÍX‚‹QœšY[™ÈÛˆH
ŠœØ[YHÚKQšJŠˆ^HÜ[ˆ‹ËÏ[İ\‹SS‹RTÍX
HT\Èš[YˆÚ[ˆHÙ\™\ˆİ\ÊK‚‚ˆÈÈÜİ]Û›[™H›Üˆœ™YH
™[™\ŠH8 %ÛÜšÜÈœ›ÛHÛ™\È[]Ú\™B‚ŒKˆ\Ú
Š˜[Hš[\ÊŠˆ[ˆ\È›Û\ˆÈHÚ]Xˆ™\Ë‚Œ‹ˆÜ™X]H[ˆXØÛİ[]Î‹ËÜ™[™\‹˜ÛÛH8¡¤ˆ
Š“™]È8¡¤ˆ›Y\š[
Šˆ8¡¤ˆXÚÈ[İ\ˆ™\Ë‚ˆH[˜ÛYY™[™\‹X[[ÛÛ™šYİ\™\ÈHZ[Hİ\ÛÛ[X[™[™Hœ™YBˆ[ˆ]]ÛX]XØ[H8 %›İ[™ÈÈ\K‚ˆÚ[ˆ]	ÜÈ]™H[İHÙ][ˆY™\ÜÈZÙHÎ‹ËŞ[İ\‹X\›Ûœ™[™\‹˜ÛÛX8 %]™\[Û™H\İˆ\İ\È][ÈHØ[YIÜÈÙ\™\ˆ›Şˆ]	ÜÈXØÙ\Y\ÈÎ‹Ëø )˜
Š›ÜŠŠˆÜÜÎ‚òàÉ†(	@¢F†RvÖRWFòÖ6öçfW'2v—F†÷WBç’6†ævW2â„÷fW"‡GG2—BW6W2w73¢òöâ 