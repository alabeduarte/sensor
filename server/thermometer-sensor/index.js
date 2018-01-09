module.exports = function ThermometerSensor({
  eventStore,
  temperatureRangeDetector
}) {
  eventStore.subscribe('TEMPERATURE_HAS_CHANGED', ({ data }) => {
    const { currentTemperature, idealTemperatureRange } = data;
    const refrigerationNeeds = { currentTemperature, idealTemperatureRange };

    temperatureRangeDetector.detectTemperatureInRange({ refrigerationNeeds });
  });
};
