import sensorsGroupedByUUID from './sensors-grouped-by-uuid';

describe('sensorsGroupedByUUID', () => {
  it('returns sensor data', () => {
    expect(
      sensorsGroupedByUUID([
        {
          data: {
            uuid: 'UUID-1',
            currentTemperature: 5,
          },
        },
      ]),
    ).toEqual({
      'UUID-1': [
        {
          uuid: 'UUID-1',
          currentTemperature: 5,
        },
      ],
    });
  });

  it('groups sensor data by uuid', () => {
    expect(
      sensorsGroupedByUUID([
        {
          data: {
            uuid: 'UUID-1',
            currentTemperature: 5,
          },
        },
        {
          data: {
            uuid: 'UUID-1',
            currentTemperature: 8,
          },
        },
      ]),
    ).toEqual({
      'UUID-1': [
        {
          uuid: 'UUID-1',
          currentTemperature: 5,
        },
        {
          uuid: 'UUID-1',
          currentTemperature: 8,
        },
      ],
    });
  });

  it('groups sensor data by respective uuid', () => {
    expect(
      sensorsGroupedByUUID([
        {
          data: {
            uuid: 'UUID-1',
            currentTemperature: 5,
          },
        },
        {
          data: {
            uuid: 'UUID-2',
            currentTemperature: 10,
          },
        },
      ]),
    ).toEqual({
      'UUID-1': [
        {
          uuid: 'UUID-1',
          currentTemperature: 5,
        },
      ],
      'UUID-2': [
        {
          uuid: 'UUID-2',
          currentTemperature: 10,
        },
      ],
    });
  });
});
