const Subscription = require('./subscription');

describe('notification', () => {
  const subscription = new Subscription({
    pubUrl: 'http://notification/pub',
    subUrl: 'http://notification/sub'
  });
  const channel = 'notification-channel';
  let connection;

  beforeEach(() => {
    connection = subscription.subscribe(channel);
  });

  afterEach(subscription.unsubscribeAll);

  it('supports pub/sub', done => {
    const message = { body: 'supports pub/sub' };

    connection.onmessage = ({ data }) => {
      expect(data).toEqual(JSON.stringify(message));
      done();
    };

    subscription.publish(message, channel).catch(done);
  });
});
