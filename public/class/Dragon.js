class Dragon {
  constructor() {
    this.random = Math.random() * 10;
    this.radius = 40;
    this.x = this.random > 5 ? 0 - this.radius : canvas.width + this.radius;
    this.y = Math.random() * (canvas.height - this.radius);
    this.angle = 0;
    this.frameX = 0;
    this.speed = Math.random() * 5 + 1;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 191;
    this.spriteHeight = 161;
    this.step = 0.15;
    this.distance;
  }
  update() {
    this.draw();
    if (this.random > 5) {
      this.x += this.speed;
    } else if (this.random < 5) {
      this.x -= this.speed;
    }

    if (this.random > 5) {
      this.frameX += this.step;
      if (this.frameX >= 3) {
        this.frameX -= 3;
      }
    } else if (this.random < 5) {
      this.frameX -= this.step;
      if (this.frameX <= 0) {
        this.frameX += 3;
      }
    }

    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    /* c.fillStyle = "white";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
    c.fillRect(this.x, this.y, this.radius, 10); */
    c.imageSmoothingEnabled = false;
    if (this.random > 5) {
      c.drawImage(
        spriteDragron,
        Math.floor(this.frameX) * this.spriteWidth,
        (this.frameY + 1) * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 45,
        this.y - 35,
        this.spriteWidth / 2,
        this.spriteHeight / 2
      );
    } else if (this.random < 5) {
      c.drawImage(
        spriteDragron,
        Math.floor(this.frameX) * this.spriteWidth,
        (this.frameY + 3) * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x - 45,
        this.y - 35,
        this.spriteWidth / 2,
        this.spriteHeight / 2
      );
    }
  }
}
