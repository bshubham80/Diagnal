import React from 'react';
import {render} from '@testing-library/react-native';
import {it, describe, expect} from '@jest/globals';

import {Title} from '../../../src/components/Title';

describe('Label', () => {
  it('should renders the label text', () => {
    const {getByText} = render(<Title>My Label</Title>);
    const labelElement = getByText('My Label');
    expect(labelElement).toBeTruthy();
  });
});
