import React from 'react';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Order from './Order';

configure({ adapter: new Adapter() });

getDate.mockReturnValue('31 февраля, пн, 2021 год');

describe('Order.js', () => {
  beforeEach(() => {
    jest.resetModules();
    getDate.mockReturnValue('31 февраля, пн, 2021 год');
  });

  it('all right', () => {
    const wrapper = shallow(<Order order={fakeOrders[0]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('getDate call', () => {
    const wrapper = shallow(<Order order={fakeOrders[0]}/>);
    expect(getDate).toHaveBeenCalled();
  });

  it('no order', () => {
    const wrapper = shallow(<Order />);
    expect(wrapper.getElement()).toBeNull();
  });

  it('order is empty', () => {
    const wrapper = shallow(<Order order={{}}/>);
    expect(wrapper.getElement()).toBeNull();
  });
});

