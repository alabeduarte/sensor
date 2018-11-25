import chartData from './chart-data';

describe('chartData', () => {
  it('returns chart data from te given input', () => {
    expect(
      chartData({
        'UUID-1': [
          {
            uuid: 'UUID-1',
            currentTemperature: 5,
          },
        ],
      }),
    ).toEqual([
      {
        name: 'UUID-1',
        data: {
          T1: 5,
        },
      },
    ]);
  });

  it('returns multiple temperature measurement per sensor', () => {
    expect(
      chartData({
        'UUID-1': [
          {
            uuid: 'UUID-1',
            currentTemperature: 5,
          },
          {
            uuid: 'UUID-1',
            currentTemperature: 10,
          },
        ],
      }),
    ).toEqual([
      {
        name: 'UUID-1',
        data: {
          T1: 5,
          T2: 10,
        },
      },
    ]);
  });

  it('returns multiple temperature measurement for multiple sensors', () => {
    expect(
      chartData({
        'UUID-1': [
          {
            uuid: 'UUID-1',
            currentTemperature: 5,
          },
        ],
        'UUID-2': [
          {
            uuid: 'UUID-1',
            currentTemperature: 10,
          },
        ],
      }),
    ).toEqual([
      {
        name: 'UUID-1',
        data: {
          T1: 5,
        },
      },
      {
        name: 'UUID-2',
        data: {
          T1: 10,
        },
      },
    ]);
  });

  it('returns empty data when there is no measure for that sensor', () => {
    expect(chartData({})).toEqual([]);
  });
});
