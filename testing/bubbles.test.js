import React from 'react';
import ReviewBubble from '../src/client/app/components/ReviewBubble';
import ReviewBubbles from '../src/client/app/components/ReviewBubbles';

describe('Rating test', () => {
  it('Should render proper amount of bubbles', () => {
    const wrapper = shallow(<ReviewBubbles rating={3} />);
    expect(wrapper.find(ReviewBubble).length).toBe(3);
  });
});