import React from 'react';
import Reviews from '../src/client/app/index';

describe('Reviews app', () => {
  it('should render Reviews module', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.is('div')).toEqual(true);
  });
});
