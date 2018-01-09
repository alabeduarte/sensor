const EventBus = require('./index');

describe('EventBus', () => {
  let eventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it('sends event through', async done => {
    eventBus.subscribe('SOMETHING', data => {
      expect(data).toEqual({ foo: 'bar' });
      done();
    });

    await eventBus.publish('SOMETHING', { foo: 'bar' });
  });
});
