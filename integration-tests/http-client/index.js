const { promisify } = require("util");
const request = require("request");
const get = promisify(request.get);
const post = promisify(request.post);
const del = promisify(request.del);

module.exports = {
  get,
  post,
  del
};
