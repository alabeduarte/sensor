const statuses = {
  true: 'TEMPERATURE_OUT_OF_RANGE_DETECTED',
  false: 'TEMPERATURE_IN_RANGE_DETECTED'
};

module.exports = function TemperatureRangeDetector({ eventStore, OutOfRange }) {
  return {
    detectTemperatureInRange: async ({ refrigerationNeeds }) => {
      const evaluation = OutOfRange({ refrigerationNeeds });
      await eventStore.store(statuses[evaluation], {
        data: refrigerationNeeds
      });
    }
  };
};
