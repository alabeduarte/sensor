module.exports = function ThermometerSensor({
  eventStore,
  transport,
  temperatureRangeDetector
}) {
  eventStore.subscribe('TEMPERATURE_HAS_CHANGED', async ({ data }) => {
    const { currentTemperature, idealTemperatureRange } = data;
    const refrigerationNeeds = { currentTemperature, idealTemperatureRange };

    await temperatureRangeDetector.detectTemperatureInRange({
      refrigerationNeeds
    });
  });

  eventStore.subscribe('TEMPERATURE_OUT_OF_RANGE_DETECTED', transport.send);
};
