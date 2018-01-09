const OutOfRange = require('./out-of-range');
const RefrigerationNeeds = require('../refrigeration-needs');

describe('OutOfRange', () => {
  const idealTemperatureRange = {
    min: 4,
    max: 6
  };

  it('returns false when point value is between range', () => {
    const refrigerationNeeds = RefrigerationNeeds({
      currentTemperature: 5,
      idealTemperatureRange
    });

    expect(OutOfRange({ refrigerationNeeds })).toEqual(false);
  });

  it('returns false when point value is equal to the minimal value', () => {
    const refrigerationNeeds = RefrigerationNeeds({
      currentTemperature: 4,
      idealTemperatureRange
    });

    expect(OutOfRange({ refrigerationNeeds })).toEqual(false);
  });

  it('returns false when point value is equal to the maximum value', () => {
    const refrigerationNeeds = RefrigerationNeeds({
      currentTemperature: 6,
      idealTemperatureRange
    });

    expect(OutOfRange({ refrigerationNeeds })).toEqual(false);
  });

  it('returns true when point value is below the minimum', () => {
    const refrigerationNeeds = RefrigerationNeeds({
      currentTemperature: 3,
      idealTemperatureRange
    });

    expect(OutOfRange({ refrigerationNeeds })).toEqual(true);
  });

  it('returns true when point value is above the maximum', () => {
    const refrigerationNeeds = RefrigerationNeeds({
      currentTemperature: 7,
      idealTemperatureRange
    });

    expect(OutOfRange({ refrigerationNeeds })).toEqual(true);
  });
});
