const request = require('supertest');
const { OK, CREATED, BAD_REQUEST } = require('http-status-codes');
const Server = require('./index');
const EventStore = require('../event-store');

describe('Server', () => {
  let server, eventStore;

  beforeEach(() => {
    eventStore = new EventStore({});
    server = new Server({ eventStore });
  });

  describe('POST /', () => {
    it('returns CREATED when sending sensor data', done => {
      request(server)
        .post('/')
        .send({
          currentTemperature: 5,
          idealTemperatureRange: {
            min: 4,
            max: 6
          }
        })
        .expect(CREATED, () => {
          expect(eventStore.all()).toEqual([
            {
              name: 'TEMPERATURE_HAS_CHANGED',
              data: {
                currentTemperature: 5,
                idealTemperatureRange: {
                  min: 4,
                  max: 6
                }
              }
            }
          ]);

          done();
        });
    });

    it('returns BAD_REQUEST when sending missing current temperature', done => {
      request(server)
        .post('/')
        .send({
          idealTemperatureRange: {
            min: 4,
            max: 6
          }
        })
        .expect(BAD_REQUEST, done);
    });

    it('returns BAD_REQUEST when sending missing idealTemperatureRange', done => {
      request(server)
        .post('/')
        .send({ currentTemperature: 5 })
        .expect(BAD_REQUEST, () => {
          expect(eventStore.all()).toEqual([]);

          done();
        });
    });
  });

  describe('GET /', () => {
    it('returns OK', done => {
      request(server)
        .get('/')
        .expect(OK, [], done);
    });

    describe('when events are created', () => {
      beforeEach(done => {
        request(server)
          .post('/')
          .send({
            currentTemperature: 5,
            idealTemperatureRange: {
              min: 4,
              max: 6
            }
          })
          .expect(CREATED, done);
      });

      it('returns all events', done => {
        request(server)
          .get('/')
          .expect(
            OK,
            [
              {
                name: 'TEMPERATURE_HAS_CHANGED',
                data: {
                  currentTemperature: 5,
                  idealTemperatureRange: {
                    min: 4,
                    max: 6
                  }
                }
              }
            ],
            done
          );
      });
    });
  });
});
