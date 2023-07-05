import React from 'react';
import {render} from '@testing-library/react-native';
import {Poster} from '../../../src/components/Poster';

import {it, describe, expect} from '@jest/globals';
import {ImageSource} from '../../../src/utils/imageSource';

describe('Poster', () => {
  it('should renders the poster image and label', () => {
    const source = ImageSource['poster1.jpg'];
    const name = 'Poster Name';

    const width = 200;
    const maxHeightRef = {current: 0};

    const {getByLabelText, getByTestId} = render(
      <Poster
        source={source}
        name={name}
        width={width}
        maxHeightRef={maxHeightRef}
      />,
    );

    const imageElement = getByTestId('posterImage');
    const labelElement = getByLabelText('posterName');

    expect(imageElement).toBeTruthy();
    expect(labelElement).toBeTruthy();
  });

  it('should limits the label text to one line if it exceeds the width', () => {
    const source = ImageSource['poster1.jpg'];
    const longName =
      'This is a very long poster name that should be limited to one line';
    const width = 100;
    const maxHeightRef = {current: 0};

    const {getByLabelText} = render(
      <Poster
        source={source}
        name={longName}
        width={width}
        maxHeightRef={maxHeightRef}
      />,
    );

    const labelElement = getByLabelText('posterName');

    expect(labelElement).toBeTruthy();
    expect(labelElement.props.numberOfLines).toBe(1);
  });
});
