const EventEmitter = require('events');

module.exports = function EventBus() {
  const eventEmitter = new EventEmitter();

  const subscribe = (eventName, handler) => {
    return eventEmitter.on(eventName, handler);
  };

  const publish = async (eventName, data) => {
    return eventEmitter.emit(eventName, data);
  };

  return { subscribe, publish };
};
