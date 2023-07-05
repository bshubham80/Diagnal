import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {HeaderWithSearchBar} from '../../../src/components/HeaderWithSearchBar';

// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect, jest} from '@jest/globals';

describe('HeaderWithSearchBar', () => {
  it('should renders the title when showSearchBar is false', () => {
    const onSearchMock = jest.fn();
    const {getByText} = render(
      <HeaderWithSearchBar title="My Title" onSearch={onSearchMock} />,
    );
    const titleElement = getByText('My Title');
    expect(titleElement).toBeTruthy();
  });

  it('should renders the search input when showSearchBar is true', () => {
    const onSearchMock = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <HeaderWithSearchBar title="My Title" onSearch={onSearchMock} />,
    );
    fireEvent.press(getByTestId('searchButton'));
    const inputElement = getByPlaceholderText('Enter poster name...');
    expect(inputElement).toBeTruthy();
  });

  it('should calls onSearch when submitting with more than 2 characters', () => {
    const onSearchMock = jest.fn();
    const {getByPlaceholderText, getByTestId} = render(
      <HeaderWithSearchBar title="My Title" onSearch={onSearchMock} />,
    );
    fireEvent.press(getByTestId('searchButton'));
    const inputElement = getByPlaceholderText('Enter poster name...');
    fireEvent(inputElement, 'submitEditing', {nativeEvent: {text: 'Test'}});
    expect(onSearchMock).toHaveBeenCalledWith('Test');
  });

  it('should calls onSearch with an empty string when back button is pressed', () => {
    const onSearchMock = jest.fn();
    const {getByTestId} = render(
      <HeaderWithSearchBar title="My Title" onSearch={onSearchMock} />,
    );
    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    expect(onSearchMock).toHaveBeenCalledWith('');
  });

  it('should shows the search input when search button is pressed', () => {
    const onSearchMock = jest.fn();
    const {getByTestId, getByPlaceholderText} = render(
      <HeaderWithSearchBar title="My Title" onSearch={onSearchMock} />,
    );
    const searchButton = getByTestId('searchButton');
    fireEvent.press(searchButton);
    const inputElement = getByPlaceholderText('Enter poster name...');
    expect(inputElement).toBeTruthy();
  });
});
