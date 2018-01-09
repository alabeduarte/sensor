const ThermometerSensor = require('./index');
const EventStore = require('./event-store');

function StubbedTemperatureRangeDetector() {
  return { detectTemperatureInRange: () => true };
}

describe('ThermometerSensor', () => {
  let eventStore;

  beforeEach(() => {
    eventStore = new EventStore({});
  });

  it('triggers temperature range detected when it changes', async () => {
    const temperatureRangeDetector = new StubbedTemperatureRangeDetector();
    spyOn(temperatureRangeDetector, 'detectTemperatureInRange');

    const data = {
      currentTemperature: 4,
      idealTemperatureRange: {
        min: 3,
        max: 5
      }
    };

    await new ThermometerSensor({ eventStore, temperatureRangeDetector });
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
});
