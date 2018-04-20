import Communicator from './Communicator';
import Renderer from './Renderer';
import Interactor from './Interactor';

class Engine {
  constructor(config = {}) {
    this.updater = null;
    this.renderers = new Map();

    this.handlers = {
      updaters: new Map(),
      drawers: new Map(),
    };

    this.communicator = (config.socket) ? new Communicator(config.socket) : null;
    this.interactor = new Interactor(config.interactor);

    this.running = false;

    this.timer = { previous: 0 };

    this.frame = this.frame.bind(this);
  }

  addUpdater(name, fn) {
    this.handlers.updaters.set(name, fn);
  }

  removeUpdater(name) {
    this.handlers.updaters.delete(name);
  }

  addDrawer(name, fn) {
    this.handlers.drawers.set(name, fn);
  }

  removeDrawer(name) {
    this.handlers.drawers.delete(name);
  }

  addRenderer(name, id) {
    if (!id) id = name;
    const r = new Renderer(id);
    this.renderers.set(name, r);
    return r;
  }

  removeRenderer(name) {
    this.renderers.delete(name);
  }

  update(delta) {
    this.handlers.updaters.forEach((updater) => {
      updater(delta);
    });
  }

  draw(delta) {
    this.handlers.drawers.forEach((drawer) => {
      drawer(delta);
    });
  }

  frame(time) {
    const delta = time - this.timer.previous;
    this.timer.previous = time;

    this.update(delta);
    this.draw(delta);

    if (this.running) window.requestAnimationFrame(this.frame);
  }

  start() {
    this.running = true;
    this.timer.previous = performance.now();
    this.interactor.start();
    window.requestAnimationFrame(this.frame);
  }

  stop(cb) {
    this.running = false;
    this.interactor.stop();
    if (cb) cb();
  }
};

export default Engine;
