const TemperatureRangeDetector = require('./index');
const EventStore = require('../event-store');

describe('TemperatureRangeDetector', () => {
  let detector, eventStore;
  const refrigerationNeeds = { foo: 'bar' };

  beforeEach(() => {
    eventStore = new EventStore({});
  });

  it('stores an event when temperature is detected as out of range', () => {
    const OutOfRange = ({ refrigerationNeeds }) => {
      expect(refrigerationNeeds).toBeDefined();
      return true;
    };

    detector = new TemperatureRangeDetector({ eventStore, OutOfRange });
    detector.detectTemperatureInRange({ refrigerationNeeds });

    expect(eventStore.all()).toEqual([
      {
        name: 'TEMPERATURE_OUT_OF_RANGE_DETECTED',
        data: refrigerationNeeds
      }
    ]);
  });

  it('stores an event when temperature is detected as in range', () => {
    const OutOfRange = ({ refrigerationNeeds }) => {
      expect(refrigerationNeeds).toBeDefined();
      return false;
    };

    detector = new TemperatureRangeDetector({ eventStore, OutOfRange });
    detector.detectTemperatureInRange({ refrigerationNeeds });

    expect(eventStore.all()).toEqual([
      {
        name: 'TEMPERATURE_IN_RANGE_DETECTED',
        data: refrigerationNeeds
      }
    ]);
  });
});
