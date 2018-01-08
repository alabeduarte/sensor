module.exports = function EventStore({ events = [], bus }) {
  const storedEvents = events;
  const { assign } = Object;

  return {
    all: () => storedEvents,
    subscribe: bus.subscribe,
    async store({ event, clock = new Date() }) {
      const eventWithTimestamp = assign(event, { timestamp: clock.getTime() });

      storedEvents.push(eventWithTimestamp);
      bus.publish(event.name, eventWithTimestamp);
    }
  };
};
