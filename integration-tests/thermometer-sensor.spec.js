const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const { random } = require('faker');
const { get, post } = require('./http-client');
const cleanDB = require('./database-cleaner');
const { SENSOR_URL } = process.env;

describe('thermometer-sensor', () => {
  const URL = `${SENSOR_URL}/thermometer-sensor`;

  beforeEach(() => cleanDB());

  describe('GET /', () => {
    it('returns HTTP status OK', done => {
      get(URL)
        .then(({ body, statusCode }) => {
          expect(body).toEqual(JSON.stringify([]));
          expect(statusCode).toEqual(OK);
          done();
        })
        .catch(done);
    });

    describe('when there is sensor data', () => {
      let uuid;

      beforeEach(done => {
        uuid = random.uuid();
        const payload = {
          uuid,
          currentTemperature: 5,
          idealTemperatureRange: {
            min: 4,
            max: 6
          }
        };

        post(URL, { json: payload })
          .then(({ statusCode }) => {
            expect(statusCode).toEqual(CREATED);
            done();
          })
          .catch(done);
      });

      it('returns all events sorted from the newest to the oldest', done => {
        get(URL)
          .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(OK);
            expect(body).toEqual(
              JSON.stringify([
                {
                  name: 'TEMPERATURE_IN_RANGE_DETECTED',
                  data: {
                    uuid,
                    currentTemperature: 5,
                    idealTemperatureRange: { min: 4, max: 6 }
                  }
                },
                {
                  name: 'TEMPERATURE_CHANGED',
                  data: {
                    uuid,
                    currentTemperature: 5,
                    idealTemperatureRange: { min: 4, max: 6 }
                  }
                }
              ])
            );

            done();
          })
          .catch(done);
      });
    });
  });

  describe('POST /', () => {
    it('returns HTTP status CREATED', done => {
      const uuid = random.uuid();

      const payload = {
        uuid,
        currentTemperature: 5,
        idealTemperatureRange: {
          min: 4,
          max: 6
        }
      };

      post(URL, { json: payload })
        .then(({ statusCode }) => {
          expect(statusCode).toEqual(CREATED);
          done();
        })
        .catch(done);
    });

    describe('when sensor data is missing', () => {
      it('returns HTTP status BAD_REQUEST', done => {
        post(URL)
          .then(({ statusCode }) => {
            expect(statusCode).toEqual(BAD_REQUEST);
            done();
          })
          .catch(done);
      });
    });
  });
});
