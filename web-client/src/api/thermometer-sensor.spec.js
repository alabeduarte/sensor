import nock from 'nock';
import thermometerSensor from './thermometer-sensor';

describe('thermometer-sensor', () => {
  it('returns sensor data', () => {
    const host = 'http://localhost:8080';

    nock(host)
      .get('/thermometer-sensor')
      .reply(200, ['foo', 'bar']);

    return thermometerSensor({ host })
      .then(res => res.json())
      .then((json) => {
        expect(json).toEqual(['foo', 'bar']);
      });
  });
});
