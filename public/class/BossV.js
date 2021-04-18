class BossV {
  constructor() {
    this.radius = 60;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.distance;
    this.spriteWidth = 320 / 10;
    this.spriteHeight = 640 / 20;
    this.frame = false;
    this.frameX = 9;
    this.frameY = 4;
    this.step = 0.15;
    this.touch = false;
    this.health = 300;
    this.dead = false;
    this.finish = false;
    this.frameDown = false;
  }
  update() {
    this.draw();
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    if (!this.frame) {
      this.frameX -= this.step;
      if (this.frameX <= 0) {
        this.frameX = 0;
        this.frameY = 0;
        this.frame = true;
      }
    }
    if (this.frame && !this.dead) {
      this.frameX += this.step;
      if (this.frameX >= 9) {
        this.frameX -= 9;
        this.frameY += 1;
        if (this.frameY >= 4) {
          this.frameY -= 4;
        }
      }
    }
    if (this.dead) {
      this.frameY = 4;
      this.frameX += this.step;
      if (this.frameX >= 9) {
        this.finish = true;
      }
    }
  }
  draw() {
    /* c.fillStyle = "white";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
    c.fillRect(this.x, this.y, this.radius, 10); */
    c.imageSmoothingEnabled = false;

    c.drawImage(
      spriteSlime,
      Math.floor(this.frameX) * this.spriteWidth,
      Math.floor(this.frameY) * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 160,
      this.y - 272,
      this.spriteWidth * 10,
      this.spriteHeight * 10
    );
    c.fillStyle = "black";
    if (this.finish) {
      c.fillStyle = "#87ceeb";
    }
    c.fillText(`${this.health} hp`, this.x, this.y + this.radius + 10);
  }
}
