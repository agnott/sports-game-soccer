class Interactor {
  constructor(config = {}) {
    this.keys = new Set();
    this.cursor = {
      element: config.element,
      x: 0,
      y: 0,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  addKeyDownListener() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  removeKeyDownListener() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  addKeyUpListener() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  removeKeyUpListener() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  addMouseMoveListener() {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  removeMouseMoveListener() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleKeyDown(e) {
    this.keys.add(e.keyCode);
  }

  handleKeyUp(e) {
    this.keys.delete(e.keyCode);
  }

  handleMouseMove(e) {
    const { pageX, pageY } = e;
    const { offsetLeft, offsetTop, width, height } = this.cursor.element;

    const x = Math.min(Math.max(pageX, offsetLeft), offsetLeft + width);
    const y = Math.min(Math.max(pageY, offsetTop), offsetTop + height);

    this.cursor.x = x;
    this.cursor.y = y;
  }

  start() {
    this.addKeyDownListener();
    this.addKeyUpListener();
    this.addMouseMoveListener();
  }

  stop() {
    this.removeKeyDownListener();
    this.removeKeyUpListener();
    this.removeMouseMoveListener();
  }
}

export default Interactor;
