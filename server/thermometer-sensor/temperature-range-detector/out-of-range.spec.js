const OutOfRange = require('./out-of-range');

describe('OutOfRange', () => {
  it('returns false when value is inside the range', () => {
    expect(OutOfRange({ from: 4, to: 6 })(5)).toEqual(false);
  });

  it('returns false when value matches the lower boundary', () => {
    expect(OutOfRange({ from: 4, to: 6 })(4)).toEqual(false);
  });

  it('returns false when value matches the higher boundary', () => {
    expect(OutOfRange({ from: 4, to: 6 })(6)).toEqual(false);
  });

  it('returns true when value is below the range', () => {
    expect(OutOfRange({ from: 4, to: 6 })(3)).toEqual(true);
  });

  it('returns true when value is above the range', () => {
    expect(OutOfRange({ from: 4, to: 6 })(3)).toEqual(true);
  });
});
