const { Success, Failure } = require('folktale/validation');

const checkMissingData = data => {
  const { currentTemperature, idealTemperatureRange } = data;
  return [currentTemperature, idealTemperatureRange].every(d => d !== undefined)
    ? Success(data)
    : Failure();
};

module.exports = ({ eventStore }) => ({ data }) => {
  const result = checkMissingData(data);
  return result.fold(result.Failure, async () => {
    await eventStore.store('TEMPERATURE_HAS_CHANGED', { data });
    return new result.Success(data);
  });
};
