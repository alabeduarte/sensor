const ThermometerSensor = require('./index');
const EventStore = require('./event-store');

function StubbedTemperatureRangeChecker() {
  return { check: () => true };
}

describe('ThermometerSensor', () => {
  let eventStore;

  beforeEach(() => {
    eventStore = new EventStore({});
  });

  it('triggers temperature range checking when it changes', async () => {
    const temperatureRangeChecker = new StubbedTemperatureRangeChecker();
    spyOn(temperatureRangeChecker, 'check');

    const data = { foo: 'bar' };
    new ThermometerSensor({ eventStore, temperatureRangeChecker });

    await eventStore.store('TEMPERATURE_HAS_CHANGED', { data });

    expect(temperatureRangeChecker.check).toHaveBeenCalledWith({ data });
  });
});
