const EventStore = require('./index');
const EventBus = require('./event-bus');

describe('EventStore', () => {
  let eventStore, bus;

  beforeEach(() => {
    bus = new EventBus();
    eventStore = new EventStore({ bus });
  });

  it('stores an event with timestamp', async () => {
    await eventStore.store('SOMETHING_HAPPENED', {});

    expect(eventStore.all()).toEqual([{ name: 'SOMETHING_HAPPENED' }]);
  });

  it('stores an event with some data', async () => {
    const data = { foo: 'bar' };

    await eventStore.store('SOMETHING_HAPPENED', { data });

    expect(eventStore.all()).toEqual([{ name: 'SOMETHING_HAPPENED', data }]);
  });

  it('adds new event on top of already existent events', async () => {
    eventStore = new EventStore({
      bus,
      events: [
        {
          name: 'SOMETHING_HAPPENED'
        }
      ]
    });

    await eventStore.store('SOMETHING_ELSE_HAPPENED', {});

    expect(eventStore.all()).toEqual([
      { name: 'SOMETHING_HAPPENED' },
      { name: 'SOMETHING_ELSE_HAPPENED' }
    ]);
  });

  it('publishes stored event', async done => {
    eventStore.subscribe('SOMETHING_HAPPENED', event => {
      expect(event).toEqual({
        name: 'SOMETHING_HAPPENED'
      });
      done();
    });

    await eventStore.store('SOMETHING_HAPPENED', {});
  });
});
