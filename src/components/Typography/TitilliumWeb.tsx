// @flow
import React from 'react';
import BaseText, {Props} from './baseText';
import {Fonts} from '../../config/theme';

const TitilliumWeb: React.FC<Props> = props => (
  <BaseText fonts={Fonts.TitilliumWeb} {...props} />
);

export default TitilliumWeb;
