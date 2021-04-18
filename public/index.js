const canvas = document.getElementById("canvas1");
const UI = document.getElementById("UI");
const restart = document.getElementById("restart");
const scoreEl = document.getElementById("score");
const tempsAlive = document.getElementById("Temps-en-vie");
const c = canvas.getContext("2d");
const audio = document.createElement("audio");

audio.load();
audio.src = "static/assets/index.mp3";
audio.autoplay = true;
audio.loop = true;
audio.volume = 0.05;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gameFrame = 0;
let scoreVie = 0;
let killBoss = 0;
let scoreBoss = 0;
let start;
let scoreNec = 15;
let scoreKillBossNec = 0;
const maxHealth = 300;
c.font = "25px Georgia";

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
};
function chooseBoss(b, j, v, r) {
  const random = Math.floor(Math.random() * 100) + 1;
  if (random <= 25) {
    return b;
  } else if (random >= 25 && random <= 50) {
    return j;
  } else if (random >= 50 && random <= 75) {
    return v;
  } else if (random >= 75 && random <= 100) {
    return r;
  }
}
function color(a) {
  if (a <= maxHealth && a > maxHealth / 2) {
    return "lightgreen";
  } else if (a <= maxHealth / 2 && a > maxHealth / 3) {
    return "orange";
  } else if (a <= maxHealth / 3) {
    return "red";
  }
}
function pts(radius) {
  let m = radius / 9;
  return Math.floor(m);
}
const canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousedown", (e) => {
  mouse.click = true;
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseup", (e) => {
  mouse.click = false;
});

const player = new Player();
const playerRight = new Image();
playerRight.src = "static/assets/spite1.png";

const playerLeft = new Image();
playerLeft.src = "static/assets/spite1.png";

const cloudimage = new Image();
cloudimage.src = "static/assets/Cloud.png";

const spriteDragron = new Image();
spriteDragron.src = "static/assets/dragon.png";

const spriteHearts = new Image();
spriteHearts.src = "static/assets/heart.png";

const spriteSlime = new Image();
spriteSlime.src = "static/assets/Slime.png";

let clouds = [];
const spawnCloud = () => {
  if (gameFrame % 30 == 0) {
    clouds.push(new Cloud());
  }
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].update();
  }
  for (let i = 0; i < clouds.length; i++) {
    if (
      clouds[i].x > canvas.width + clouds[i].radius + clouds[i].radius ||
      clouds[i].x < 0 - clouds[i].radius
    ) {
      clouds.splice(i, 1);
    }
    if (clouds[i].distance < clouds[i].radius + player.radius) {
      clouds.splice(i, 1);
      score += pts(clouds[i].radius);
      scoreVie++;
      if (boss.length == 0) {
        scoreBoss++;
      }
    }
  }
};

let dragons = [];
const spawnDragon = () => {
  if (gameFrame % 150 == 0) {
    dragons.push(new Dragon());
  }
  for (let i = 0; i < dragons.length; i++) {
    dragons[i].update();
  }
  for (let i = 0; i < dragons.length; i++) {
    if (
      dragons[i].x > canvas.width + dragons[i].radius + dragons[i].radius ||
      dragons[i].x < 0 - dragons[i].radius
    ) {
      dragons.splice(i, 1);
    }

    if (dragons[i].distance < dragons[i].radius + player.radius) {
      dragons.splice(i, 1);
      player.vie -= 25;
    }
  }
};

let vies = [];
const spawnVie = () => {
  if (gameFrame % 250 == 0) {
    if (vies.length < 5) {
      vies.push(new Vie());
    }
  }

  for (let i = 0; i < vies.length; i++) {
    vies[i].update();
  }
  for (let i = 0; i < vies.length; i++) {
    if (
      vies[i].x > canvas.width + vies[i].radius + vies[i].radius ||
      vies[i].x < 0 - vies[i].radius
    ) {
      vies.splice(i, 1);
    }
    if (vies[i].distance < vies[i].radius + player.radius) {
      if (player.vie + 15 < maxHealth) {
        player.vie += pts(vies[i].radius);
        vies.splice(i, 1);
      }
      scoreVie -= 20;
    }
  }
};

let boss = [];
const spawnBoss = () => {
  spawnBossObject();
  if (boss.length < 1) {
    boss.push(chooseBoss(new BossB(), new BossJ(), new BossV(), new BossR()));
  }
  for (let i = 0; i < boss.length; i++) {
    boss[i].update();
  }
  for (let i = 0; i < boss.length; i++) {
    if (boss[i].distance < boss[i].radius + player.radius) {
      if (!boss[i].touch) {
        player.vie -= 50;
        setTimeout(() => {
          boss[i].touch = false;
        }, 1000);
      }
      boss[i].touch = true;
    }
  }
};

let bossObject = [];
const spawnBossObject = () => {
  if (gameFrame % 250 == 0) {
    bossObject.push(new BossObject());
  }
  for (let i = 0; i < bossObject.length; i++) {
    boss.map((v, ind) => {
      if (!v.finish) {
        bossObject[i].update();
      }
    });
  }
  for (let i = 0; i < bossObject.length; i++) {
    if (bossObject[i].distance < bossObject[i].radius + player.radius) {
      boss.map((v, ind) => {
        if (!bossObject[i].touch) {
          v.health -= bossObject[i].removeHealth;
        }
        bossObject[i].touch = true;

        if (v.health <= 0) {
          v.health = 0;
          v.dead = true;

          if (!v.frameDown) {
            v.frameX = 0;
            v.frameDown = true;
          }
          if (!v.finish) {
            let t = true;

            setInterval(() => {
              if (v.finish && t) {
                t = false;
                boss.splice(ind, 1);
                killBoss++;

                scoreNec *= 2;
                scoreKillBossNec++;
                console.log(boss.length, killBoss, scoreNec, scoreKillBossNec);
              }
            });
          }
        }
      });
      /* c.clearRect(
        bossObject[i].x,
        bossObject[i].y,
        bossObject[i].radius,
        bossObject[i].radius
      );
      const rh = bossObject[i].removeHealth;
      const box = bossObject[i].x;
      const boy = bossObject[i].y + bossObject[i].radius / 2;
      setTimeout(() => {
        c.fillStyle = "black";
        c.fillText(rh, box, boy);

        console.log(rh, box, boy);
      }, 2000); */
      bossObject.splice(i, 1);
    }
  }
};

const animate = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  const animationId = requestAnimationFrame(animate);
  player.update();
  spawnCloud();
  if (score >= 10) {
    spawnDragon();
  }
  if (scoreBoss >= scoreNec && killBoss === scoreKillBossNec) {
    spawnBoss();
  }
  if (scoreVie >= 20) {
    spawnVie();
  }
  if (player.vie <= 0) {
    player.vie = 0;
    cancelAnimationFrame(animationId);
    UI.style.display = "flex";
    scoreEl.innerHTML = `Score : ${score}`;
    const timeAlive = new Date() - start;
    tempsAlive.innerHTML = `Temps en vie : ${humanizeDuration(timeAlive, {
      language: "fr",
      round: true,
    })}`;
  }
  c.fillStyle = "black";
  c.fillText(`Score : ${score}`, 50, 50);
  dessinCercleSimple(player.vie, maxHealth);
  gameFrame++;
};
const init = () => {
  start = new Date();
  c.clearRect(0, 0, canvas.width, canvas.height);
  dragons = [];
  clouds = [];
  score = 0;
  vies = [];
  boss = [];
  scoreVie = 0;
  gameFrame = 0;
  scoreBoss = 0;
  boss = [];
  bossObject = [];
  killBoss = 0;
  scoreNec = 15;
  scoreKillBossNec = 0;
  player.vie = maxHealth;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  animate();
};

restart.addEventListener("click", (e) => {
  UI.style.display = "none";
  init();
});
init();
