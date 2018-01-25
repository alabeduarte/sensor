const { promisify } = require('util');
const request = require('request');
const get = promisify(request.get);
const post = promisify(request.post);
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const Subscription = require('./subscription');

describe('Pragma-Brewery', () => {
  const subscription = new Subscription({
    pubUrl: 'http://notification/pub',
    subUrl: 'http://notification/sub'
  });

  afterEach(subscription.unsubscribeAll);

  describe('notification', () => {
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
