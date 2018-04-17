class Engine {
  constructor(config = {}) {
    this.steps = {
      update: config.steps.update || 120,
      render: config.steps.render || 60,
    };

    this.updater = null;
    this.renderer = null;
  }

  addCalculator(fn) {
    this.updater = fn;
  }

  addRenderer(fn) {
    this.renderer = fn;
  }

  update() {

  }

  render() {

  }

  start() {

  }
};
