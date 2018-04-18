import Communicator from './Communicator';

class Engine {
  constructor(config = {}) {
    this.updater = null;
    this.renderer = null;
    this.state = { sender: null, receiver: null };

    this.communicator = (config.socket) ? new Communicator(config.socket) : null;

    this.running = false;

    this.timer = { previous: 0 };

    this.keys = new Set();

    this.frame = this.frame.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  addKeyDownListener() { document.addEventListener('keydown', this.handleKeyDown); }
  removeKeyDownListener() { document.removeEventListener('keydown', this.handleKeyDown); }
  handleKeyDown(e) { if (!this.keys.has(e.keyCode)) this.keys.add(e.keyCode); }

  addKeyUpListener() { document.addEventListener('keyup', this.handleKeyUp); }
  removeKeyUpListener() { document.removeEventListener('keyup', this.handleKeyUp); }
  handleKeyUp(e) { if (this.keys.has(e.keyCode)) this.keys.delete(e.keyCode); }

  addCalculator(fn) {
    this.updater = fn;
  }

  addRenderer(fn) {
    this.renderer = fn;
  }

  update(delta) {
    if (this.updater) this.updater(delta);
  }

  render(delta) {
    if (this.renderer) this.renderer(delta);
  }

  frame(time) {
    const delta = time - this.timer.previous;
    this.timer.previous = time;

    this.update(delta);
    this.render(delta);

    if (this.running) window.requestAnimationFrame(this.frame);
  }

  start() {
    this.running = true;
    this.addKeyDownListener();
    this.addKeyUpListener();
    window.requestAnimationFrame(this.frame);
  }

  stop(cb) {
    this.running = false;
    this.removeKeyDownListener();
    this.removeKeyUpListener();
    if (cb) cb();
  }
};

export default Engine;
