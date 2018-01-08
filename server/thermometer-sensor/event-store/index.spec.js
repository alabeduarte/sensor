const EventStore = require('./index');
const EventBus = require('../event-bus')

describe('EventStore', () => {
  let eventStore, bus;
  const now = new Date();

  beforeEach(() => {
    bus = new EventBus();
    eventStore = new EventStore({ bus });
  });

  it('stores an event with timestamp', async () => {
    await eventStore.store({
      event: {
        name: 'SOMETHING_HAPPENED'
      },
      clock: now
    });

    expect(eventStore.all()).toEqual([
      {
        timestamp: now.getTime(),
        name: 'SOMETHING_HAPPENED'
      }
    ]);
  });

  it('stores an event with some data', async () => {
    await eventStore.store({
      event: {
        name: 'SOMETHING_HAPPENED',
        data: { foo: 'bar' }
      },
      clock: now
    });

    expect(eventStore.all()).toEqual([
      {
        timestamp: now.getTime(),
        name: 'SOMETHING_HAPPENED',
        data: { foo: 'bar' }
      }
    ]);
  });

  it('adds new event on top of already existent events', async () => {
    const someTimeOnThePast = new Date(now - 1);

    eventStore = new EventStore({
      bus,
      events: [
        {
          name: 'SOMETHING_HAPPENED',
          timestamp: someTimeOnThePast.getTime()
        }
      ]
    });

    await eventStore.store({
      event: {
        name: 'SOMETHING_ELSE_HAPPENED'
      },
      clock: now
    });

    expect(eventStore.all()).toEqual([
      {
        timestamp: someTimeOnThePast.getTime(),
        name: 'SOMETHING_HAPPENED'
      },
      {
        timestamp: now.getTime(),
        name: 'SOMETHING_ELSE_HAPPENED'
      }
    ]);
  });

  it('publishes stored event', async done => {
    eventStore.subscribe('SOMETHING_HAPPENED', event => {
      expect(event).toEqual({
        name: 'SOMETHING_HAPPENED',
        timestamp: now.getTime()
      });
      done();
    });

    await eventStore.store({
      event: {
        name: 'SOMETHING_HAPPENED'
      },
      clock: now
    });
  });
});
