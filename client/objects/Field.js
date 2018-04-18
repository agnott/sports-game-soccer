class Field {
  constructor() {
    this.pos = { x: 0, y: 0 };
  }

  move(x, y) {
    this.pos = {
      x: this.pos.x + x,
      y: this.pos.y + y,
    };
  }

  draw(ctx) {
    const path = new Path2D();
    path.rect(this.pos.x, this.pos.y, 75, 50);

    ctx.fillStyle = 'black';
    ctx.fill(path);
  }
}

export default Field;
