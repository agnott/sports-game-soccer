export default class Renderer {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');
  }

  drawRect(x, y, width, height, color) {
    const path = new Path2D();
    path.rect(x, y, width, height);

    this.ctx.fillStyle = color;
    this.ctx.fill(path);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(obj) {
    obj.draw(this.ctx);
  }
}
