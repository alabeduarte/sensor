const TemperatureRangeDetector = require('./index');
const EventStore = require('../event-store');

describe('TemperatureRangeDetector', () => {
  let detector, eventStore;

  beforeEach(() => {
    eventStore = new EventStore({});
  });

  it('stores an event when temperature is detected as out of range', async () => {
    const refrigerationNeeds = {
      currentTemperature: 3,
      idealTemperatureRange: {
        min: 4,
        max: 6
      }
    };

    detector = new TemperatureRangeDetector({ eventStore });
    await detector.detectTemperatureInRange({ refrigerationNeeds });

    expect(eventStore.all()).toEqual([
      {
        name: 'TEMPERATURE_OUT_OF_RANGE_DETECTED',
        data: refrigerationNeeds
      }
    ]);
  });

  it('stores an event when temperature is detected as in range', async () => {
    const refrigerationNeeds = {
      currentTemperature: 5,
      idealTemperatureRange: {
        min: 4,
        max: 6
      }
    };

    detector = new TemperatureRangeDetector({ eventStore });
    await detector.detectTemperatureInRange({ refrigerationNeeds });

    expect(eventStore.all()).toEqual([
      {
        name: 'TEMPERATURE_IN_RANGE_DETECTED',
        data: refrigerationNeeds
      }
    ]);
  });
});
