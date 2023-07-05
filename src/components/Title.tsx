// @flow
import React from 'react';
import {Props} from './Typography/baseText';
import TitilliumWeb from './Typography/TitilliumWeb';

export const Title: React.FC<Props> = props => {
  return (
    <TitilliumWeb weight="regular" size="large" color="#D8D9DA" {...props}>
      {props.children}
    </TitilliumWeb>
  );
};
