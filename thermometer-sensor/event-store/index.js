const EventBus = require('./event-bus');

module.exports = function EventStore({ events = [], bus = new EventBus() }) {
  const storedEvents = events;

  const all = () => storedEvents;
  const subscribe = bus.subscribe;
  const store = async (eventName, { data }) => {
    const event = { name: eventName, data };
    storedEvents.push(event);
    bus.publish(eventName, event);

    return event;
  };

  return {
    all,
    subscribe,
    store
  };
};
