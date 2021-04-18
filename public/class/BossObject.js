class BossObject {
  constructor() {
    this.random = Math.random() * 100;
    this.radius = 20;
    this.speed = Math.random() * 5 + 1;
    this.x = this.random > 50 ? 0 - this.radius : canvas.width + this.radius;
    this.y = Math.random() * canvas.height;
    this.distance;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.touch = false;
    this.removeHealth = Math.floor(Math.random() * 100) + 1;
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
    c.fillStyle = "#F5F5F5";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.stroke();

    c.fillStyle = "black";
    c.fillText(this.removeHealth, this.x, this.y + this.radius / 2);
  }
}
