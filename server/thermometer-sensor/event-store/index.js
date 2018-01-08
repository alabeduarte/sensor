const EventBus = require('./event-bus');

module.exports = function EventStore({ events = [], bus = new EventBus() }) {
  const storedEvents = events;

  return {
    all: () => storedEvents,
    subscribe: bus.subscribe,
    async store(eventName, { data }) {
      const event = { name: eventName, data };

      storedEvents.push(event);
      bus.publish(eventName, event);
    }
  };
};
