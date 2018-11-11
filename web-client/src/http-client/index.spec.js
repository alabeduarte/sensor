import nock from 'nock';
import httpClient from '.';

describe('HttpClient', () => {
  it('returns requested payload', () => {
    const host = 'http://localhost:8080';

    nock(host)
      .get('/bla')
      .reply(200, ['foo', 'bar']);

    return httpClient({ host })
      .get('/bla')
      .then((response) => {
        expect(response).toEqual(['foo', 'bar']);
      });
  });
});
