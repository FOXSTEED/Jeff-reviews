import React from 'react';
import Reviews from '../src/client/app/index';
import ReviewListEntry from '../src/client/app/components/ReviewListEntry';
import ReviewList from '../src/client/app/components/ReviewList';
import data from './dummyData';

describe('Reviews app', () => {
  it('should render Reviews module', () => {
    const wrapper = shallow(<Reviews />);
    expect(wrapper).toMatchSnapshot();
  });
  
  it('should render X amount of reviews', () => {
    const wrapper = shallow(<ReviewList reviews={data.data} />);
    expect(wrapper.find(ReviewListEntry).length).toBe(9);
  });
});
