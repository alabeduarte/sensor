const sensorsGroupedByUUID = sensors => sensors
  .map(({ data }) => ({
    uuid: data.uuid,
    currentTemperature: data.currentTemperature,
  }))
  .reduce(
    (curr, acc) => ({
      ...curr,
      [acc.uuid]: (curr[acc.uuid] || []).concat(acc),
    }),
    {},
  );

export default sensorsGroupedByUUID;
