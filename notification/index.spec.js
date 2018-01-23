const sleep = require('then-sleep');
const EventSource = require('eventsource');
const { promisify } = require('util');
const request = require('request');
const post = promisify(request.post);
const del = promisify(request.del);

const resolve = (url, path) => (path ? `${url}/${path}` : url);

function Subscription({ pubUrl, subUrl }) {
  const subscriptions = [];
  const urls = new Set();

  return {
    async publish(message, channel) {
      const url = resolve(pubUrl, channel);
      urls.add(url);
      await sleep(50);
      return post(url, { json: message });
    },
    subscribe(channel) {
      const url = resolve(subUrl, channel);
      const eventSource = new EventSource(url);
      subscriptions.push(eventSource);

      return eventSource;
    },
    async unsubscribeAll() {
      subscriptions.forEach(s => s.close());
      await Promise.all(Array.from(urls).map(url => del(url)));
      await sleep(1000);
    }
  };
}

describe('Notification', () => {
  const subscription = new Subscription({
    pubUrl: 'http://notification/pub',
    subUrl: 'http://notification/sub'
  });

  afterEach(subscription.unsubscribeAll);

  it('supports pub/sub', done => {
    const channel = '_test_broadcast_';
    const connection = subscription.subscribe(channel);
    const message = { body: 'supports pub/sub' };

    connection.onmessage = ({ data }) => {
      expect(data).toEqual(JSON.stringify(message));
      done();
    };

    subscription.publish(message, channel).catch(done);
  });
});
