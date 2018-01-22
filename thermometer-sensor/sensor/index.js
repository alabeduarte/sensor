module.exports = function ThermometerSensor({
  eventStore,
  temperatureRangeDetector
}) {
  eventStore.subscribe('TEMPERATURE_HAS_CHANGED', async ({ data }) => {
    const { currentTemperature, idealTemperatureRange } = data;
    const refrigerationNeeds = { currentTemperature, idealTemperatureRange };

    await temperatureRangeDetector.detectTemperatureInRange({
      refrigerationNeeds
    });

    // TODO: notification.send(data);
  });
};
