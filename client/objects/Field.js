import Color from '../utils/Color';

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
    path.rect(this.pos.x, this.pos.y, 1000, 800);

    ctx.fillStyle = Color.rgb(50, 150, 50);
    ctx.fill(path);
  }
}

export default Field;
