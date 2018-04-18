class Communicator {
  constructor(socket) {
    this.socket = socket;
    this.handlers = {
      senders: {},
      receivers: {},
    };
  }

  send(name) {
    if (name in this.handlers.senders) {
      this.socket.emit(name, this.handlers.senders[name]());
    }
  }

  addSender(name, fn) {
    this.handlers.senders[name] = fn;
  }

  removeSender(name) {
    if (name in this.handlers.senders) delete this.handlers.senders[name];
  }

  addReceiver(name, fn) {
    this.handlers.receivers[name] = fn;
    this.socket.on(name, fn);
  }

  removeReceiver(name) {
    if (name in this.handlers.receivers) {
      this.socket.removeListener(name, this.handlers.receivers[name]);
      delete this.handlers.receivers[name];
    }
  }
}

export default Communicator;
