import React from 'react';
jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import {fakeOrders} from '../data/fakeOrders';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Order from './Order';

configure({ adapter: new Adapter() });

describe('Order.js', () => {
  beforeEach(() => {
    getDate.mockReturnValue('31 февраля, пн, 2021 год');
  });

  afterAll(() => {
    jest.resetModules();
  })

  it('all right', () => {
    const wrapper = shallow(<Order order={fakeOrders[0]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('no order', () => {
    const wrapper = shallow(<Order />);
    expect(wrapper.getElement()).toBeNull();
  });

  it('order is empty', () => {
    const wrapper = shallow(<Order order={{}}/>);
    expect(wrapper.getElement()).toBeNull();
  });

  it('items is empty', () => {
    const order = Object.assign({}, fakeOrders[0]);
    order.items = undefined;
    const wrapper = shallow(<Order order={order}/>);
    expect(wrapper).toMatchSnapshot();
  });
});

