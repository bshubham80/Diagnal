// @flow
import React from 'react';
import {Props} from './Typography/baseText';
import TitilliumWeb from './Typography/TitilliumWeb';

export const Label: React.FC<Props> = props => {
  return (
    <TitilliumWeb weight="regular" size="medium" color="#999999" {...props}>
      {props.children}
    </TitilliumWeb>
  );
};
