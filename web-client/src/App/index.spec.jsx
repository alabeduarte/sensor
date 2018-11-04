import React from 'react';
import { shallow, mount } from 'enzyme';
import { random } from 'faker';
import App from './'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.text()).toContain('Sensor App');
  });

  it('renders sensor statuses', () => {
    const sensor1 = {
      data: {
        uuid: random.uuid(),
        currentTemperature: 4
      }
    };

    const sensor2 = {
      data: {
        uuid: random.uuid(),
        currentTemperature: 2
      }
    };

    const wrapper = mount(<App sensors={[sensor1, sensor2]} />);
    const items = wrapper.find('.sensors li');

    expect(items.at(0).text()).toContain('Current Temperature: 4ºC');
    expect(items.at(1).text()).toContain('Current Temperature: 2ºC');
  });
});
