const expectedEvents = [
  'TEMPERATURE_CHANGED',
  'TEMPERATURE_IN_RANGE_DETECTED',
  'TEMPERATURE_OUT_OF_RANGE_DETECTED'
];

module.exports = function ThermometerSensor({
  eventStore,
  transport,
  temperatureRangeDetector
}) {
  eventStore.subscribe('TEMPERATURE_CHANGED', async ({ data }) => {
    await temperatureRangeDetector.detectTemperatureInRange({
      refrigerationNeeds: data
    });
  });

  expectedEvents.forEach(eventName => {
    eventStore.subscribe(eventName, async event => {
      await transport.send(event);
    });
  });
};
