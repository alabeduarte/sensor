module.exports = ({ from, to }) => value => {
  return value < from || value > to;
};
