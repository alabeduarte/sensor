/* global fetch:true */

export default ({ host }) => ({
  get: (path) => fetch(new URL(host.concat(path))).then((res) => res.json()),
});
