const EventStore = require('./index');

describe('EventStore', () => {
  const now = new Date();

  it('stores an event with timestamp', async () => {
    const eventStore = new EventStore({});

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

  it('adds new event on top of already existent events', async () => {
    const someTimeOnThePast = new Date(now - 1);

    const eventStore = new EventStore({
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
    const eventStore = new EventStore({});

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
