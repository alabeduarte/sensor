module.exports = function EventStore({ events = [], bus }) {
  const storedEvents = events;

  return {
    all: () => storedEvents,
    subscribe: bus.subscribe,
    async store(eventName, { data, clock = new Date() }) {
      const event = {
        name: eventName,
        data,
        timestamp: clock.getTime()
      };

      storedEvents.push(event);
      bus.publish(eventName, event);
    }
  };
};
