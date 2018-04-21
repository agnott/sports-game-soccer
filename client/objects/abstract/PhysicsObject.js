import Distance from '../../utils/Distance';

export default class PhysicsObject {
  constructor(config = {}) {
    this.shape = config.shape;
    this.dims = {
      width: config.dims.width,
      height: config.dims.height,
      radius: config.dims.radius,
    };
    // this.pos = {
    //   x: config.pos.x,
    //   y: config.pos.y,
    // };
    // this.transform = {
    //   rotation: 0,
    // };
    // this.last = {
    //   pos: this.pos,
    // };
    // this.movement = {
    //   source: { x: 0, y: 0 },
    //   unit: { x: 0, y: 0 },
    //   magnitude: 0,
    // };
    this.pos = {
      x: config.pos.x || 0,
      y: config.pos.y || 0,
    };
    this.transform = { rotation: 0 };
    this.vectors = {
      velocity: { x: 0, y: 0 },
    };
  }

  updateMovementVector() {
    const mx = this.pos.x - this.last.pos.x;
    const my = this.pos.y - this.last.pos.y;

    this.vectors = {
      velocity: { x: mx, y: my },
    };
  }

  shift(x, y) {
    this.last.pos = this.pos;
    this.pos = {
      x: this.pos.x + x || 0,
      y: this.pos.y + y || 0,
    };
    this.updateMovementVector();
  }

  move(x, y) {
    this.last.pos = this.pos;
    this.pos = {x, y};
    this.updateMovementVector();
  }

  applyForce(vec) {
    
  }

  rotate(rads) {
    this.transform.rotation = rads;
  }

  getBoundingBox() {
    if (this.shape === 'rect') {
      return {
        x: this.pos.y,
        y: this.pos.x,
        width: this.dims.width,
        height: this.dims.height,
      };
    } else if (this.shape === 'circle') {
      return {
        x: this.pos.x,
        y: this.pos.y,
        radius: this.dims.radius,
      };
    }
  }

  isColliding(other) {
    const bbox1 = this.getBoundingBox();
    const bbox2 = other.getBoundingBox();

    if (this.shape === 'circle' && other.shape === 'circle') {
      const d = Distance.measure(bbox1.x, bbox1.y, bbox2.x, bbox2.y);
      return d <= bbox1.radius + bbox2.radius;
    } else if (this.shape === 'circle' || other.shape === 'circle') {
      const circle = (bbox1.shape === 'circle') ? bbox1 : bbox2;
      const rect = (bbox1.shape === 'circle') ? bbox2 : bbox1;
      const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
      const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
      const d = Distance.measure(circle.x, circle.y, closestX, closestY);
      return d <= circle.radius;
    } else {
      if (bbox1.x + bbox1.width < bbox2.x) return false;
      if (bbox1.x > bbox2.x + bbox2.width) return false;
      if (bbox1.y + bbox1.height < bbox2.y) return false;
      if (bbox1.y > bbox2.y + bbox2.width) return false;
      return true;
    }
  }
}
