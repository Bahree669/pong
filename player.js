class Player {
  constructor({x, y, color, ctx, imgSrc}) {
    this.init = {x, y};
    this.x = x;
    this.y = y;
    this.w = 30;
    this.h = 100;
    this.color = color;
    this.ctx = ctx;

    const image = new Image();
    image.src = imgSrc;

    this.image = image;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  update(move) {
    if (!(this.y + move < 0) && !(this.y + move > innerHeight - this.h)) {
      this.y += move;
    }
    this.draw();
  }
}

export default Player;
