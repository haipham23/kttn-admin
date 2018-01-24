import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Counter from './Counter';

describe('<Counter />', () => {
  it('should display a button and a number', () => {
    const wrapper = mount(<Counter />);

    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('span')).to.have.length(1);
  });

  it('should increase number when click on the button', () => {
    const wrapper = mount(<Counter />);

    expect(wrapper.find('span').text()).to.equal('0');

    wrapper.find('button').simulate('click');

    expect(wrapper.find('span').text()).to.equal('1');
  });
});
