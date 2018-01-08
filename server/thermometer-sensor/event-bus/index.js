const EventEmitter = require('events');

module.exports = function EventBus() {
  const eventEmitter = new EventEmitter();

  return {
    subscribe: (eventName, handler) => eventEmitter.on(eventName, handler),
    async publish(eventName, data) {
      return eventEmitter.emit(eventName, data);
    }
  };
};
