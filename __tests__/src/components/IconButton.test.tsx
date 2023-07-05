import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {IconButton} from '../../../src/components/IconButton';
// Note: import explicitly to use the types shiped with jest.
import {it, describe, expect, jest} from '@jest/globals';
import {ImageSource} from '../../../src/utils/imageSource';

describe('IconButton', () => {
  it('should calls onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <IconButton
        testID="iconButton"
        source={ImageSource.back}
        onPress={onPressMock}
      />,
    );
    const button = getByTestId('iconButton');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
