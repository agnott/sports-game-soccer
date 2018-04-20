export default class Distance {
  static measure(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  constructor() {
    this.points = { x1: 0, y1: 0, x2: 0, y2: 0};
  }

  x1(x) {
    this.points.x1 = x;
  }

  y1(y) {
    this.points.y1 = y;
  }

  x2(x) {
    this.points.x2 = x;
  }

  y2(y) {
    this.points.y2 = y;
  }

  measure() {
    const { x1, y1, x2, y2 } = this.points;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
}
