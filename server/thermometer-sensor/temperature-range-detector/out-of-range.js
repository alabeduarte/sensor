module.exports = function OutOfRange({ refrigerationNeeds }) {
  const { currentTemperature, idealTemperatureRange } = refrigerationNeeds;
  const { min, max } = idealTemperatureRange;

  return currentTemperature < min || currentTemperature > max;
};
