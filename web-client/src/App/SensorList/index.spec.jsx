import React from 'react';
import { shallow } from 'enzyme';
import { random } from 'faker';
import Sensors from './';

describe('<Sensors />', () => {
  it('renders sensor data', () => {
    const uuid = random.uuid();
    const temperatureHasChanged = {
      name: 'TEMPERATURE_CHANGED',
      data: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const wrapper = shallow(<Sensors sensors={[temperatureHasChanged]} />);
    const items = wrapper.find('.sensors li');

    expect(items.at(0).find('.uuid').text()).toEqual(uuid)
    expect(items.at(0).find('.event-name').text())
      .toEqual('TEMPERATURE_CHANGED');
    expect(items.at(0).find('.current-temperature').text()).toContain('4ºC');
    expect(items.at(0).find('.min-temperature').text()).toContain('min 0ºC');
    expect(items.at(0).find('.max-temperature').text()).toContain('max 7ºC');
  });

  it('indicates when temperature has changed', () => {
    const uuid = random.uuid();
    const temperatureHasChanged = {
      name: 'TEMPERATURE_CHANGED',
      data: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const wrapper = shallow(<Sensors sensors={[temperatureHasChanged]} />);
    const items = wrapper.find('.sensors li');

    expect(items.at(0).hasClass('info')).toBeTruthy();
    expect(items.at(0).hasClass('warning')).toBeFalsy();
  });

  it('indicates when temperature is in range', () => {
    const uuid = random.uuid();
    const temperatureInRange = {
      name: 'TEMPERATURE_IN_RANGE_DETECTED',
      data: {
        uuid,
        currentTemperature: 4,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const wrapper = shallow(<Sensors sensors={[temperatureInRange]} />);
    const items = wrapper.find('.sensors li');

    expect(items.at(0).hasClass('info')).toBeTruthy();
    expect(items.at(0).hasClass('warning')).toBeFalsy();
  });

  it('indicates when temperature is out of range', () => {
    const uuid = random.uuid();
    const temperatureInRange = {
      name: 'TEMPERATURE_OUT_OF_RANGE_DETECTED',
      data: {
        uuid,
        currentTemperature: -1,
        idealTemperatureRange: {
          min: 0,
          max: 7
        }
      }
    };

    const wrapper = shallow(<Sensors sensors={[temperatureInRange]} />);
    const items = wrapper.find('.sensors li');

    expect(items.at(0).hasClass('warning')).toBeTruthy();
    expect(items.at(0).hasClass('info')).toBeFalsy();
  });
});
