import Color from '../utils/Color';

class Cursor {
  constructor() {
    this.pos = { x: 0, y: 0 };

    this.path = new Path2D();
    this.path.ellipse(0, 0, 10, 10, 0, 0, 2 * Math.PI);
  }

  move(pos) {
    this.pos = pos;
  }

  draw(ctx) {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.strokeStyle = Color.rgb(255, 255, 255);
    ctx.stroke(this.path);
    ctx.resetTransform();
  }
}

export default Cursor;
