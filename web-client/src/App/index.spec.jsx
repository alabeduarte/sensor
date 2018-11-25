import React from 'react';
import { shallow } from 'enzyme';
import { SynchronousPromise } from 'synchronous-promise';
import EventSource from 'eventsource';
import App from './'
import SensorChart from './SensorChart';

function FakeHttpClient({ expectedData }) {
  return () => ({
    get: () => SynchronousPromise.resolve(expectedData)
  });
};

describe('<App />', () => {
  it('renders without crashing', () => {
    const httpClient = new FakeHttpClient({ expectedData: [] });
    const wrapper = shallow(
      <App
        httpClient={httpClient}
        EventSource={EventSource}
      />
    );

    expect(wrapper.text()).toContain('Sensor App');
  });

  it('loads sensor statuses', () => {
    const sensor = {
      data: {
        uuid: 'UUID-123',
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const httpClient = new FakeHttpClient({ expectedData: [sensor] });
    const wrapper = shallow(
      <App
        httpClient={httpClient}
        EventSource={EventSource}
      />
    );

    expect(wrapper.find(SensorChart).exists()).toBeTruthy();
    expect(wrapper.find(SensorChart).prop('sensors')).toEqual([sensor]);
  });
});
