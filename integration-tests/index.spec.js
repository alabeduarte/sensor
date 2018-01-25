const { get, post } = require('./http-client');
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const Subscription = require('./subscription');

describe('Pragma-Brewery', () => {
  const subscription = new Subscription({
    pubUrl: 'http://notification/pub',
    subUrl: 'http://notification/sub'
  });

  afterEach(subscription.unsubscribeAll);

  describe('notification', () => {
    let connection;
    const channel = 'user';

    beforeEach(() => {
      connection = subscription.subscribe(channel);
    });

    it('supports pub/sub', done => {
      const message = { body: 'supports pub/sub' };

      connection.onmessage = ({ data }) => {
        expect(data).toEqual(JSON.stringify(message));
        done();
      };

      subscription.publish(message, channel).catch(done);
    });

    it('receives realtime data when temperature is out of range', done => {
      const message = {
        currentTemperature: 3,
        idealTemperatureRange: {
          min: 4,
          max: 6
        }
      };

      connection.onmessage = ({ data }) => {
        expect(data).toEqual(JSON.stringify(message));
        done();
      };

      subscription.publish(message, channel).catch(done);
    });
  });

  describe('thermometer-sensor', () => {
    const URL = 'http://thermometer-sensor:8080/thermometer-sensor';

    describe('GET /', () => {
      it('returns HTTP status OK', done => {
        get(URL).then(({ statusCode }) => {
          expect(statusCode).toEqual(OK);
          done();
        }).catch(done);
      });
    });

    describe('POST /', () => {
      it('returns HTTP status CREATED', done => {
        const payload = {
          currentTemperature: 5,
          idealTemperatureRange: {
            min: 4,
            max: 6
          }
        };

        post(URL, { json: payload }).then(({ statusCode }) => {
          expect(statusCode).toEqual(CREATED);
          done();
        }).catch(done);
      });

      describe('when sensor data is missing', () => {
        it('returns HTTP status BAD_REQUEST', done => {
          post(URL).then(({ statusCode }) => {
            expect(statusCode).toEqual(BAD_REQUEST);
            done();
          }).catch(done);
        });
      });
    });
  });
});
