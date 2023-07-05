import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Home} from '../../../src/screens/Home';

import {it, describe, expect} from '@jest/globals';
import {PAGE1} from '../../../src/utils/dummyData';

describe('Home', () => {
  it('should renders the Home component', () => {
    const {getByTestId} = render(<Home />);
    const homeComponent = getByTestId('homeComponent');
    expect(homeComponent).toBeTruthy();
  });

  it('should displays the correct number of posters', () => {
    const {getAllByTestId} = render(<Home />);
    const posters = getAllByTestId('posterImage');
    // Replace `expectedCount` with the expected number of posters based on the provided data
    const expectedCount = +PAGE1.page['page-size-returned'];
    expect(posters.length).toBe(expectedCount);
  });

  it('should loads more content when reaching the end of the list', () => {
    const {getByTestId} = render(<Home />);
    const flatList = getByTestId('flatList');
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: {y: 100},
        contentSize: {height: 1000},
        layoutMeasurement: {height: 200},
        velocity: {y: 0},
        zoomScale: 1,
      },
    });
  });

  it('should filters the content based on the search query', () => {
    const {getByTestId, getByPlaceholderText} = render(<Home />);
    fireEvent.press(getByTestId('searchButton'));
    const searchBar = getByPlaceholderText('Enter poster name...');
    fireEvent.changeText(searchBar, 'some search query');
  });
});
