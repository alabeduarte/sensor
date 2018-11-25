const chartData = sensors => Object.entries(sensors).map(([key, value]) => ({
  name: key,
  data: value.reduce(
    (curr, acc, currentIndex) => ({
      ...curr,
      [`T${currentIndex + 1}`]: acc.currentTemperature,
    }),
    {},
  ),
}));

export default chartData;
