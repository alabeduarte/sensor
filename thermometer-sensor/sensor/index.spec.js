const ThermometerSensor = require('./index');
const EventStore = require('../event-store');

function StubbedTemperatureRangeDetector() {
  return { detectTemperatureInRange: () => true };
}

function StubbedTransport() {
  return { send: () => true };
}

describe('ThermometerSensor', () => {
  let eventStore, temperatureRangeDetector, transport;

  beforeEach(() => {
    eventStore = new EventStore({});
    temperatureRangeDetector = new StubbedTemperatureRangeDetector();
    transport = new StubbedTransport();
  });

  it('triggers temperature range detected when it changes', async () => {
    spyOn(temperatureRangeDetector, 'detectTemperatureInRange');

    const data = {
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
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 3,
          max: 5
        }
      }
    });
  });

  it('dispatches notification when temperature is out of range', async () => {
    spyOn(transport, 'send');

    const data = {
      currentTemperature: 3,
      idealTemperatureRange: {
        min: 4,
        max: 6
      }
    };

    await new ThermometerSensor({ eventStore, transport });
    const event = await eventStore.store('TEMPERATURE_OUT_OF_RANGE_DETECTED', {
      data
    });

    expect(transport.send).toHaveBeenCalledWith(event);
  });
});
