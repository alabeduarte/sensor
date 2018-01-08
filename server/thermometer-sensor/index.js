module.exports = function ThermometerSensor({
  eventStore,
  temperatureRangeChecker
}) {
  eventStore.subscribe('TEMPERATURE_HAS_CHANGED', ({ data }) => {
    temperatureRangeChecker.check({ data });
  });
};
