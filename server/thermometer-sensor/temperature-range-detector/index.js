const OutOfRange = require('./out-of-range');

const statuses = {
  true: 'TEMPERATURE_OUT_OF_RANGE_DETECTED',
  false: 'TEMPERATURE_IN_RANGE_DETECTED'
};

module.exports = function TemperatureRangeDetector({ eventStore }) {
  return {
    detectTemperatureInRange: async ({ refrigerationNeeds }) => {
      const { currentTemperature, idealTemperatureRange } = refrigerationNeeds;
      const { min, max } = idealTemperatureRange;
      const evaluation = OutOfRange({ from: min, to: max })(currentTemperature);

      await eventStore.store(statuses[evaluation], {
        data: refrigerationNeeds
      });
    }
  };
};
