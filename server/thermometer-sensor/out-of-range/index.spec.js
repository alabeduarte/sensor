const OutOfRange = require('./index');

describe('OutOfRange', () => {
  const range = { min: 4, max: 6 };

  it('returns NORMAL status', () => {
    const pointValue = 5;

    expect(OutOfRange({ pointValue, range })).toEqual({
      pointValue,
      range,
      status: 'NORMAL'
    });
  });

  describe('when point value match with minimal value range', () => {
    const pointValue = 4;

    it('returns NORMAL status', () => {
      expect(OutOfRange({ pointValue, range })).toEqual({
        pointValue,
        range,
        status: 'NORMAL'
      });
    });
  });

  describe('when point value match with maximum value range', () => {
    const pointValue = 6;

    it('returns NORMAL status', () => {
      expect(OutOfRange({ pointValue, range })).toEqual({
        pointValue,
        range,
        status: 'NORMAL'
      });
    });
  });

  describe('when point value is below the minimum', () => {
    const pointValue = 3;

    it('returns OUT_OF_RANGE status', () => {
      expect(OutOfRange({ pointValue, range })).toEqual({
        pointValue,
        range,
        status: 'OUT_OF_RANGE'
      });
    });
  });

  describe('when point value is higher the maximum', () => {
    const pointValue = 7;

    it('returns OUT_OF_RANGE status', () => {
      expect(OutOfRange({ pointValue, range })).toEqual({
        pointValue,
        range,
        status: 'OUT_OF_RANGE'
      });
    });
  });
});
