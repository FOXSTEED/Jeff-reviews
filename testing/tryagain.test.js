import React from 'react';
import TryAgain from '../src/client/app/components/TryAgain';
import Reviews from '../src/client/app/index';

describe('TryAgain component', () => {
  test('Should be present when reviews is empty', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper.find(TryAgain).length).toBe(1);
  });
});