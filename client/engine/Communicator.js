class Communicator {
  constructor(socket) {
    this.socket = socket;
    this.handlers = {
      senders: new Map(),
      receivers: new Map(),
    };
  }

  send(name) {
    const fn = this.handlers.senders.get(name);
    if (fn) this.socket.emit(name, fn());
  }

  addSender(name, fn) {
    this.handlers.senders.set(name, fn);
  }

  removeSender(name) {
    this.handlers.senders.delete(name)
  }

  addReceiver(name, fn) {
    this.handlers.receivers.set(name, fn);
    this.socket.on(name, fn);
  }

  removeReceiver(name) {
    const fn = this.handlers.receivers.get(name);

    if (fn) {
      this.socket.removeListener(name, fn);
      this.handlers.receivers.delete(name);
    }
  }
}

export default Communicator;
