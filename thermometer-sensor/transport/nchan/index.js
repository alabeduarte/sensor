const request = require('request');

module.exports = function Nchan({ httpClient = request, url }) {
  const send = async message => {
    await httpClient.post(`${url}/pub/pragma-brewery`, { json: message });
  };

  return { send };
};
