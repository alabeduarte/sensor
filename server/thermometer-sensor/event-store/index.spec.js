const EventStore = require('./index');
const EventBus = require('./event-bus');

describe('EventStore', () => {
  let eventStore, bus;
  const clock = new Date();

  beforeEach(() => {
    bus = new EventBus();
    eventStore = new EventStore({ bus });
  });

  it('stores an event with timestamp', async () => {
    await eventStore.store('SOMETHING_HAPPENED', { clock });

    expect(eventStore.all()).toEqual([
      {
        timestamp: clock.getTime(),
        name: 'SOMETHING_HAPPENED'
      }
    ]);
  });

  it('stores an event with some data', async () => {
    const data = { foo: 'bar' };

    await eventStore.store('SOMETHING_HAPPENED', { data, clock });

    expect(eventStore.all()).toEqual([
      {
        timestamp: clock.getTime(),
        name: 'SOMETHING_HAPPENED',
        data
      }
    ]);
  });

  it('adds new event on top of already existent events', async () => {
    const someTimeOnThePast = new Date(clock - 1);

    eventStore = new EventStore({
      bus,
      events: [
        {
          name: 'SOMETHING_HAPPENED',
          timestamp: someTimeOnThePast.getTime()
        }
      ]
    });

    await eventStore.store('SOMETHING_ELSE_HAPPENED', { clock });

    expect(eventStore.all()).toEqual([
      {
        timestamp: someTimeOnThePast.getTime(),
        name: 'SOMETHING_HAPPENED'
      },
      {
        timestamp: clock.getTime(),
        name: 'SOMETHING_ELSE_HAPPENED'
      }
    ]);
  });

  it('publishes stored event', async done => {
    eventStore.subscribe('SOMETHING_HAPPENED', event => {
      expect(event).toEqual({
        name: 'SOMETHING_HAPPENED',
        timestamp: clock.getTime()
      });
      done();
    });

    await eventStore.store('SOMETHING_HAPPENED', { clock });
  });
});
