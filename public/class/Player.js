class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 30;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 460.25;
    this.spriteHeight = 600;
    this.vie = 300;
  }
  update() {
    this.draw();
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    this.angle = Math.atan2(-dx, dy);
    if (mouse.x != this.x) {
      this.x -= dx / 20;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 20;
    }
  }
  draw() {
    /* if (mouse.click) {
      c.linewidth = 0.2;
      c.beginPath();
      c.moveTo(this.x, this.y);
      c.lineTo(mouse.x, mouse.y);
      c.stroke();
    } */ /* 
    c.fillStyle = "red";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
    c.fillRect(this.x, this.y, this.radius, 10); */

    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);

    if (this.x >= mouse.x) {
      c.drawImage(
        playerLeft,
        (this.frameX + 1) * this.spriteWidth,
        (this.frameY + 2) * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 20,
        0 - 30,
        this.spriteWidth / 10,
        this.spriteHeight / 10
      );
    } else {
      c.drawImage(
        playerRight,
        this.frameX * this.spriteWidth,
        (this.frameY + 1) * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        0 - 20,
        0 - 30,
        this.spriteWidth / 10,
        this.spriteHeight / 10
      );
    }
    c.restore();
  }
}
