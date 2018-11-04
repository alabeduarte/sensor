import React from 'react';
import { shallow, mount } from 'enzyme';
import { random } from 'faker';
import App from './'
import Sensors from './Sensors';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.text()).toContain('Sensor App');
  });

  it('renders sensor statuses', () => {
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

    const wrapper = mount(<App sensors={[sensor1, sensor2]} />);

    expect(wrapper.find('.sensors li').length).toEqual(2);
  });
});
