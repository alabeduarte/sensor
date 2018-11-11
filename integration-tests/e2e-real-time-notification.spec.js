const { CREATED } = require('http-status-codes');
const { random } = require('faker');
const { post } = require('./http-client');
const cleanDB = require('./database-cleaner');
const Subscription = require('./subscription');
const { SENSOR_URL, NCHAN_URL } = process.env;

describe('sensor', () => {
  const subscription = new Subscription({ subUrl: `${NCHAN_URL}/sub` });
  const sensorUrl = `${SENSOR_URL}/thermometer-sensor`;

  const channel = 'sensor';
  let connection;

  beforeEach(() => {
    cleanDB();
    connection = subscription.subscribe(channel);
  });

  afterEach(subscription.unsubscribeAll);

  it('receives realtime data when temperature is out of range', done => {
    const uuid = random.uuid();

    const message = {
      uuid,
      currentTemperature: 3,
      idealTemperatureRange: {
        min: 4,
        max: 6
      }
    };

    connection.onmessage = ({ data }) => {
      expect(data).toEqual(
        JSON.stringify({
          name: 'TEMPERATURE_OUT_OF_RANGE_DETECTED',
          data: message
        })
      );
      done();
    };

    post(sensorUrl, { json: message })
      .then(({ statusCode }) => {
        expect(statusCode).toEqual(CREATED);
      })
      .catch(done);
  });
});
