const { random } = require('faker');
const ThermometerSensor = require('./index');
const EventStore = require('../event-store');

function FakeTemperatureRangeDetector() {
  return { detectTemperatureInRange: () => true };
}

function FakeTransport() {
  const publishedMessages = [];

  return {
    send: message => publishedMessages.push(message),
    publishedMessages
  };
}

describe('ThermometerSensor', () => {
  let eventStore, temperatureRangeDetector, transport, uuid;

  beforeEach(() => {
    eventStore = new EventStore({});
    temperatureRangeDetector = new FakeTemperatureRangeDetector();
    transport = new FakeTransport();

    uuid = random.uuid();
  });

  it('triggers temperature range detected when it changes', async () => {
    spyOn(temperatureRangeDetector, 'detectTemperatureInRange');

    const data = {
      uuid,
      currentTemperature: 4,
      idealTemperatureRange: {
        min: 3,
        max: 5
      }
    };

    await new ThermometerSensor({
      eventStore,
      transport,
      temperatureRangeDetector
    });
    await eventStore.store('TEMPERATURE_HAS_CHANGED', { data });

    expect(
      temperatureRangeDetector.detectTemperatureInRange
    ).toHaveBeenCalledWith({
      refrigerationNeeds: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 3,
          max: 5
        }
      }
    });
  });

  it('dispatches notification when temperature is out of range', async () => {
    await new ThermometerSensor({ eventStore, transport });
    await eventStore.store('TEMPERATURE_OUT_OF_RANGE_DETECTED', {
      data: {
        uuid,
        currentTemperature: 3,
        idealTemperatureRange: { min: 4, max: 6 }
      }
    });

    expect(transport.publishedMessages).toEqual([
      {
        data: {
          uuid,
          currentTemperature: 3,
          idealTemperatureRange: { max: 6, min: 4 },
        },
        name: 'TEMPERATURE_OUT_OF_RANGE_DETECTED'
      }
    ]);
  });
});
