import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders beer list', () => {
    const { shallow } = Enzyme;

    const wrapper = shallow(<App />);
    expect(wrapper.find('ul li').length).toEqual(6);
  });
});
