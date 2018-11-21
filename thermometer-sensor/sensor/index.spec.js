const { random } = require('faker');
const ThermometerSensor = require('./index');
const EventStore = require('../event-store');

function FakeTemperatureRangeDetector() {
  const temperaturesDetected = [];

  return {
    detectTemperatureInRange: data => temperaturesDetected.push(data),
    temperaturesDetected
  };
}

function FakeTransport() {
  const publishedMessages = [];

  return {
    send: async message => publishedMessages.push(message),
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
    await new ThermometerSensor({
      eventStore,
      transport,
      temperatureRangeDetector
    });

    await eventStore.store('TEMPERATURE_CHANGED', {
      data: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: { min: 3, max: 5 }
      }
    });

    expect(temperatureRangeDetector.temperaturesDetected).toEqual([
      {
        refrigerationNeeds: {
          uuid,
          currentTemperature: 4,
          idealTemperatureRange: { min: 3, max: 5 }
        }
      }
    ]);
  });

  it('dispatches notification when temperature changes', async () => {
    await new ThermometerSensor({
      eventStore,
      transport,
      temperatureRangeDetector
    });

    await eventStore.store('TEMPERATURE_CHANGED', {
      data: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: { min: 3, max: 5 }
      }
    });

    expect(transport.publishedMessages).toEqual([
      {
        data: {
          uuid,
          currentTemperature: 4,
          idealTemperatureRange: { min: 3, max: 5 }
        },
        name: 'TEMPERATURE_CHANGED'
      }
    ]);
  });

  it('dispatches notification when temperature change detection is within range', async () => {
    await new ThermometerSensor({
      eventStore,
      transport,
      temperatureRangeDetector
    });

    await eventStore.store('TEMPERATURE_IN_RANGE_DETECTED', {
      data: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: { min: 3, max: 5 }
      }
    });

    expect(transport.publishedMessages).toEqual([
      {
        data: {
          uuid,
          currentTemperature: 4,
          idealTemperatureRange: { min: 3, max: 5 }
        },
        name: 'TEMPERATURE_IN_RANGE_DETECTED'
      }
    ]);
  });

  it('dispatches notification when temperature change detection is out of range', async () => {
    await new ThermometerSensor({
      eventStore,
      transport,
      temperatureRangeDetector
    });

    await eventStore.store('TEMPERATURE_OUT_OF_RANGE_DETECTED', {
      data: {
        uuid,
        currentTemperature: 2,
        idealTemperatureRange: { min: 3, max: 5 }
      }
    });

    expect(transport.publishedMessages).toEqual([
      {
        data: {
          uuid,
          currentTemperature: 2,
          idealTemperatureRange: { min: 3, max: 5 }
        },
        name: 'TEMPERATURE_OUT_OF_RANGE_DETECTED'
      }
    ]);
  });
});
