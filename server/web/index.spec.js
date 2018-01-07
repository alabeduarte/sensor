const request = require('supertest');
const Server = require('./index');

describe('web: Server', () => {
  it('returns OK', () => {
    return request(new Server())
      .get('/')
      .expect(200, 'hello world');
  });
});
