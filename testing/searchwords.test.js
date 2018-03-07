import React from 'react';
import Reviews from '../src/client/app/index';
import Search from '../src/client/app/components/Search';
import Word from '../src/client/app/components/Word';

describe('Search and frequent words', () => {
  it('should render frequent keywords', () => {
    const wrapper = shallow(<Search words={[null, null, null]} />);
    expect(wrapper.find(Word).length).toBe(3);
  });
});
