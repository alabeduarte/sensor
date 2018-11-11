import React from 'react';
import { mount } from 'enzyme';
import { random } from 'faker';
import { SynchronousPromise } from 'synchronous-promise';
import EventSource from 'eventsource';
import App from './'

function FakeHttpClient({ expectedData }) {
  return () => ({
    get: () => SynchronousPromise.resolve(expectedData)
  });
};

describe('<App />', () => {
  it('renders without crashing', () => {
    const httpClient = new FakeHttpClient({ expectedData: [] });
    const wrapper = mount(
      <App
        httpClient={httpClient}
        EventSource={EventSource}
      />
    );

    expect(wrapper.text()).toContain('Sensor App');
  });

  it('loads sensor statuses', () => {
    const sensor1 = {
      data: {
        uuid: random.uuid(),
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const sensor2 = {
      data: {
        uuid: random.uuid(),
        currentTemperature: 2,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const httpClient = new FakeHttpClient({ expectedData: [sensor1, sensor2] });
    const wrapper = mount(
      <App
        httpClient={httpClient}
        EventSource={EventSource}
      />
    );

    expect(wrapper.find('.sensors li').length).toEqual(2);
  });
});
