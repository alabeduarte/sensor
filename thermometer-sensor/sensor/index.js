module.exports = function ThermometerSensor({
  eventStore,
  transport,
  temperatureRangeDetector
}) {
  eventStore.subscribe('TEMPERATURE_HAS_CHANGED', async ({ data }) => {
    await temperatureRangeDetector.detectTemperatureInRange({
      refrigerationNeeds: data
    });
  });

  eventStore.subscribe('TEMPERATURE_OUT_OF_RANGE_DETECTED', async event => {
    await transport.send(event);
  });
};
