const { promisify } = require('util');
const EventBus = require('./event-bus');
const redis = require('redis');
const STREAM_KEY = 'sensor';

module.exports = function RedisEventStore({ url, bus = new EventBus() }) {
  const client = redis.createClient({ url });
  const rpush = promisify(client.rpush).bind(client);
  const lrange = promisify(client.lrange).bind(client);

  const all = async () => {
    const events = await lrange(STREAM_KEY, 0, -1);
    return events.map(JSON.parse);
  };
  const subscribe = bus.subscribe;
  const store = async (eventName, { data }) => {
    const event = { name: eventName, data };
    await rpush(STREAM_KEY, JSON.stringify(event));
    bus.publish(eventName, event);

    return event;
  };

  return {
    all,
    subscribe,
    store
  };
};
