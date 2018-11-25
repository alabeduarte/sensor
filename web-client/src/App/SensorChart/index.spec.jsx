import React from 'react';
import { shallow } from 'enzyme';
import { LineChart } from 'react-chartkick';
import SensorChart from './';

describe('<SensorChart />', () => {
  it('renders line chart', () => {
    const sensors = [
      {
        data: {
          uuid: 'UUID-123',
          currentTemperature: 5
        }
      }
    ];

    const wrapper = shallow(
      <SensorChart sensors={sensors} />
    );

    expect(wrapper.find(LineChart).exists()).toBeTruthy();
    expect(wrapper.find(LineChart).prop('data')).toEqual([
      {
        name: 'UUID-123',
        data: {
          'T1': 5
        }
      }
    ]);
  });
});
