const NChan = require('./index');

describe('Nchan', () => {
  const url = 'http://nchan';
  let nchan, httpClient;

  beforeEach(() => {
    httpClient = { post: () => true };
    spyOn(httpClient, 'post');

    nchan = new NChan({ httpClient, url });
  });

  it('sends message through http', () => {
    const message = { foo: 'bar' };

    nchan.send(message);

    expect(httpClient.post).toHaveBeenCalledWith(`${url}/pub/sensor`, {
      json: message
    });
  });
});
