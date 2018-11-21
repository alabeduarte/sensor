const request = require('supertest');
const { random } = require('faker');
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
    let uuid;

    beforeEach(() => {
      uuid = random.uuid();
    });

    it('returns CREATED when sending sensor data', done => {
      request(server)
        .post('/')
        .send({
          uuid,
          currentTemperature: 5,
          idealTemperatureRange: {
            min: 4,
            max: 6
          }
        })
        .expect(CREATED, () => {
          expect(eventStore.all()).toEqual([
            {
              name: 'TEMPERATURE_CHANGED',
              data: {
                uuid,
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

    it('returns BAD_REQUEST when sending missing uuid', done => {
      request(server)
        .post('/')
        .send({
          currentTemperature: 5,
          idealTemperatureRange: {
            min: 4,
            max: 6
          }
        })
        .expect(BAD_REQUEST, done);
    });

    it('returns BAD_REQUEST when sending missing current temperature', done => {
      request(server)
        .post('/')
        .send({
          uuid,
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
        .send({ uuid, currentTemperature: 5 })
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
      const uuid = random.uuid();

      beforeEach(done => {
        request(server)
          .post('/')
          .send({
            uuid,
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
                name: 'TEMPERATURE_CHANGED',
                data: {
                  uuid,
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

      it('returns all events sorted from the newest to the oldest', done => {
        request(server)
          .post('/')
          .send({
            uuid,
            currentTemperature: 6,
            idealTemperatureRange: {
              min: 4,
              max: 6
            }
          })
          .expect(CREATED, () => {
            request(server)
              .get('/')
              .expect(
                OK,
                [
                  {
                    name: 'TEMPERATURE_CHANGED',
                    data: {
                      uuid,
                      currentTemperature: 6,
                      idealTemperatureRange: {
                        min: 4,
                        max: 6
                      }
                    }
                  },
                  {
                    name: 'TEMPERATURE_CHANGED',
                    data: {
                      uuid,
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
});
