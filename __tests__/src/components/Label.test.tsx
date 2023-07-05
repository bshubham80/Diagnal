import React from 'react';
import {render} from '@testing-library/react-native';
import {it, describe, expect} from '@jest/globals';

import {Label} from '../../../src/components/Label';

describe('Label', () => {
  it('should renders the label text', () => {
    const {getByText} = render(<Label>My Label</Label>);
    const labelElement = getByText('My Label');
    expect(labelElement).toBeTruthy();
  });
});
