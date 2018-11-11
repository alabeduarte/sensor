import React from 'react';
import { mount } from 'enzyme';
import { random } from 'faker';
import { SynchronousPromise } from 'synchronous-promise';
import App from './'

function FakeAPI({ expectedData }) {
  return ({ host }) => {
    return SynchronousPromise.resolve({
      json: () => SynchronousPromise.resolve(expectedData)
    });
  };
};

describe('<App />', () => {
  it('renders without crashing', () => {
    const api = new FakeAPI({ expectedData: [] });
    const wrapper = mount(<App api={api} />);

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

    const api = new FakeAPI({ expectedData: [sensor1, sensor2] });

    const wrapper = mount(<App api={api} />);

    expect(wrapper.find('.sensors li').length).toEqual(2);
  });
});
