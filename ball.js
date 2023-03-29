class Ball {
  constructor({pos, velocity, color, radius, ctx}) {
    this.init = {x: pos.x, y: pos.y};
    this.x = pos.x;
    this.y = pos.y;
    this.vel = velocity;
    this.color = color;
    this.radius = radius;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    if (this.y >= innerHeight - this.radius || this.y <= this.radius) {
      this.vel.y *= -1;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;
    this.draw();
  }
}

export default Ball;
