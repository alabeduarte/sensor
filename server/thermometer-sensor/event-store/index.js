const EventEmitter = require('events');

module.exports = function EventStore({ events = [] }) {
  const storedEvents = events;

  const eventEmitter = new EventEmitter();
  const { assign } = Object;

  return {
    subscribe: (eventName, handler) => eventEmitter.on(eventName, handler),
    all: () => storedEvents,
    async store({ event, clock = new Date() }) {
      const eventWithTimestamp = assign(event, { timestamp: clock.getTime() });

      storedEvents.push(eventWithTimestamp);
      eventEmitter.emit(event.name, eventWithTimestamp);
    }
  };
};
