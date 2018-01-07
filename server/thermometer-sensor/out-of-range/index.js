const isTrue = requirement => requirement === true;

module.exports = function OutOfRange({ pointValue, range }) {
  const { min, max } = range;
  const statuses = {
    true: 'NORMAL',
    false: 'OUT_OF_RANGE'
  };

  const evaluation = [pointValue >= min, pointValue <= max].every(isTrue);

  return {
    pointValue,
    range,
    status: statuses[evaluation]
  };
};
