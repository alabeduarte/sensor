const Subscription = require('./subscription');
const { NCHAN_URL } = process.env;

describe('notification', () => {
  const subscription = new Subscription({
    pubUrl: `${NCHAN_URL}/pub`,
    subUrl: `${NCHAN_URL}/sub`
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
