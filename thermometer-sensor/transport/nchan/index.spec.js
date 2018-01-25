const NChan = require('./index');

describe('Nchan', () => {
  let nchan, httpClient;

  beforeEach(() => {
    httpClient = { post: () => true };
    spyOn(httpClient, 'post');

    nchan = new NChan({ httpClient, url: 'http://nchan' });
  });

  it('sends message through http', () => {
    const message = { foo: 'bar' };

    nchan.send(message);

    expect(httpClient.post).toHaveBeenCalledWith('http://nchan', {
      json: message
    });
  });
});
