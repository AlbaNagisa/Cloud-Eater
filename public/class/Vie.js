class Vie {
  constructor() {
    this.random = Math.random() * 100;
    this.radius = Math.random() * 30 + 15;
    this.speed = Math.random() * 5 + 1;
    this.x = this.random > 50 ? 0 - this.radius : canvas.width + this.radius;
    this.y = Math.random() * (canvas.height - this.radius);
    this.distance;
    this.spriteWidth = 254;
    this.spriteHeight = 254;
  }
  update() {
    this.draw();
    if (this.random > 50) {
      this.x += this.speed;
    } else if (this.random < 50) {
      this.x -= this.speed;
    }
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    /*   c.fillStyle = "green";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
    c.fillRect(this.x, this.y, this.radius, 10); */
    c.imageSmoothingEnabled = false;

    c.drawImage(
      spriteHearts,
      this.x - 15,
      this.y - 15,
      (this.spriteWidth / 170) * this.radius,
      (this.spriteHeight / 170) * this.radius
    );
  }
}
