import Color from '../utils/Color';
import PhysicsObject from './abstract/PhysicsObject';

export default class Ball extends PhysicsObject {
  constructor(config = {}) {
    super({
      shape: 'circle',
      dims: { radius: 10 },
      pos: { x: 100, y: 100 },
    });
    this.path = new Path2D();
    this.path.ellipse(0, 0, 10, 10, 0, 0, 2 * Math.PI);
    this.path.ellipse(0, 0 - 10, 5, 5, 0, 0, 2 * Math.PI);
  }
  draw(ctx, canvas) {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillStyle = Color.rgb(75, 75, 200);
    ctx.fill(this.path);
    ctx.resetTransform();
  }
}
