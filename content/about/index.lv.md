---
title: "Par"
date: 2023-08-31T20:24:40+03:00
lastmod: "2024-06-06"
type: "exclude-me"
---
<div style="text-align: justify;">
Sveicināti, mans vārds ir Dāvis un šis ir mans stūrītis vispasaules tīmeklī, laipni lūgti!
<br>
<br>
Mans pēdējo pāris gadu profesionālais ceļojums ir bijis visnotaļ interesants un daudzpusīgs. Esmu strādājis kā ar cilvēkiem tā ar tehnoloģijām un pateicoties kārei pēc piedzīvojumiem esmu pabijis dažādās <i>eksotiskās</i> vietās, no kurām vairums cilvēku visticamāk labprātāk turētos pa gabalu.
<br>
<br>
Mani aizrauj viss, kas saistīts ar informācijas tehnoloģijām, it īpaši <i>UNIX</i>-veidīgām operētājsistēmām, informācijas drošību un datu/informācijas analīzi. Es vienmēr esmu atvērts interesantiem projektiem un sadarbībai.
<br>
<br>
Ar mani var sazināties rakstot uz: <a href=mailto:sveiks@dvilcans.com>sveiks@dvilcans.com</a><br>
Tāpat varat man rakstīt <i>Signal Messenger</i> lietotnē: @davisv.38
<br>
<br>

</div>

#### Daži no maniem pēdējā laika eksperimentiem:

* [txt2img](https://txt2img.dvilcans.com) -- Tiešsaistes mākslīgā intelekta rīks, kas no teksta ģenerē attēlus;  
* [Harry the O.G.](https://chat.dvilcans.com) -- Vienkāršs tiešsaistes mākslīgā intelekta čatbots;
* [Bashbot](https://dvilcans.com/lv/ai-chatbot-in-linux-terminal/) -- MI čatbots Linux terminālī.

<br>

#### Patīk mans saturs? Nopērc man kādu našķi:   


<div style="overflow-x: auto; white-space: nowrap;">
<div style="display: inline-block;">
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="btc.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        BTC: 3N1j1JJUHHxUC68UeqBZKCYf3fBMfzyBFJ (Bitcoin network)
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="eth.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        ETH: 0x466d8184ac8108ed03ff5146e8bbeebc1b46e088 (Ethereum network)
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="dot.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        DOT: 14TXHQTk518nPXECWJ4q8VXJK3gzgoqdJbkv1P4ZzyVzKrui
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2; display: inline-block;">
            <img src="xmr.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
            XMR: 82tm9q1nYEpVhXqYoksQRBWxVqvWoSpwweUyvi85w81EZbsM3kBxY7ND7qWNNYwqUh6Utqrnm7sXYUh753pgpe8DHiNJ5p8
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="rlc.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        RLC: 0x466d8184ac8108ed03ff5146e8bbeebc1b46e088 (Ethereum network)
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="doge.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        DOGE: DGc2V84o2mudYSY5NzmfjMgUNEiChRVv9a
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="usdc.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        USDC: 0x466d8184ac8108ed03ff5146e8bbeebc1b46e088 (Ethereum network)
    </p>
    <p style="margin: 0; padding: 0; line-height: 1.2;">
        <img src="usdt.png" style="background: transparent; width: 1rem; height: 1rem; vertical-align: middle; margin-top: 0.5rem;"> 
        USDT: 0x466d8184ac8108ed03ff5146e8bbeebc1b46e088 (Ethereum network)
    </p>
</div>
</div>

<script>

// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const nekoEl = document.createElement("div");
  // Hardcoded for privacy reasons.
  const nekoSites = [
    "dvilcans.com",
    "localhost",
  ];
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;

  try {
    const searchParams = location.search
      .replace("?", "")
      .split("&")
      .map((keyvaluepair) => keyvaluepair.split("="));
    // This is so much repeated code, I don't like it
    tmp = searchParams.find((a) => a[0] == "catx");
    if (tmp && tmp[1]) nekoPosX = parseInt(tmp[1]);
    tmp = searchParams.find((a) => a[0] == "caty");
    if (tmp && tmp[1]) nekoPosY = parseInt(tmp[1]);
    tmp = searchParams.find((a) => a[0] == "catdx");
    if (tmp && tmp[1]) mousePosX = parseInt(tmp[1]);
    tmp = searchParams.find((a) => a[0] == "catdy");
    if (tmp && tmp[1]) mousePosY = parseInt(tmp[1]);
  } catch (e) {
    console.error("oneko.js: failed to parse query params.");
    console.error(e);
  }

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  function create() {
    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.backgroundColor = "rgba(255, 255, 255, 0)"; // 0.5 represents 50% opacity 0 full opacity
    nekoEl.style.backgroundImage = "url('./oneko.gif')";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.backgroundPosition = `${-3 * 32}px ${-3 * 32}px`;

    document.body.appendChild(nekoEl);

    document.onmousemove = (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    window.onekoInterval = setInterval(frame, 100);
  }

  function onClick(event) {
    let target;
    if (event.target.tagName === "A" && event.target.getAttribute("href")) {
      target = event.target;
    } else if (
      event.target.tagName == "IMG" &&
      event.target.parentElement.tagName === "A" &&
      event.target.parentElement.getAttribute("href")
    ) {
      target = event.target.parentElement;
    } else {
      return;
    }
    let newLocation;
    try {
      newLocation = new URL(target.href);
    } catch (e) {
      console.error(e);
      return;
    }
    if (!nekoSites.includes(newLocation.host) || newLocation.pathname != "/")
      return;
    newLocation.searchParams.append("catx", Math.floor(nekoPosX));
    newLocation.searchParams.append("caty", Math.floor(nekoPosY));
    newLocation.searchParams.append("catdx", Math.floor(mousePosX));
    newLocation.searchParams.append("catdy", Math.floor(mousePosY));
    event.preventDefault();
    window.location.href = newLocation.toString();
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (idleTime > 10 && Math.floor(Math.random() * 200) == 0 && idleAnimation == null) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;

      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  create();
  document.addEventListener("click", onClick);
})();


</script>
