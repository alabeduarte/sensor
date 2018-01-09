const RefrigerationNeeds = require('./refrigeration-needs');

module.exports = function ThermometerSensor({
  eventStore,
  temperatureRangeDetector
}) {
  eventStore.subscribe('TEMPERATURE_HAS_CHANGED', ({ data }) => {
    const { currentTemperature, idealTemperatureRange } = data;
    const refrigerationNeeds = RefrigerationNeeds({
      currentTemperature,
      idealTemperatureRange
    });

    temperatureRangeDetector.detectTemperatureInRange({ refrigerationNeeds });
  });
};
