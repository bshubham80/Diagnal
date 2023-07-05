// @flow
import React from 'react';
import {Text, TextProps, StyleProp, TextStyle} from 'react-native';

export type FontWeight = 'bold' | 'thin' | 'semiBold' | 'regular';

export type Size =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxsmall'
  | 'xxxlarge'
  | 'xxxxlarge';

export type FontProps = {
  [key in FontWeight]: string;
};

type P = TextProps & {
  fonts: FontProps;
  uppercase?: boolean;
  weight?: FontWeight;
  size?: Size;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

type SizeMapProp = {[key in Size]: StyleProp<TextStyle>};

// omit fonts props from Props
export type Props = Omit<P, 'fonts'>;

export const SizeMap: SizeMapProp = {
  xxsmall: {
    fontSize: 10,
    lineHeight: 16,
  },
  xsmall: {
    fontSize: 12,
    lineHeight: 16,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
  },
  large: {
    fontSize: 18,
    lineHeight: 24,
  },
  xlarge: {
    fontSize: 20,
    lineHeight: 24,
  },
  xxlarge: {
    fontSize: 24,
    lineHeight: 32,
  },
  xxxlarge: {
    fontSize: 28,
    lineHeight: 32,
  },
  xxxxlarge: {
    fontSize: 30,
    lineHeight: 40,
  },
};

const BaseText: React.FC<P> = props => {
  const {
    style,
    weight,
    fonts,
    children,
    uppercase,
    size,
    color,
    align,
    ...rest
  } = props;

  const content =
    typeof children === 'string' && uppercase
      ? children.toUpperCase()
      : children;

  const overideStyle = {
    fontFamily: weight ? fonts[weight] : fonts.regular,
  };

  return (
    <Text
      {...rest}
      style={[
        overideStyle,
        size ? SizeMap[size] : {},
        {color, textAlign: align},
        style,
      ]}>
      {content}
    </Text>
  );
};

BaseText.defaultProps = {
  uppercase: false,
  weight: 'regular',

  size: 'medium',
  align: 'auto',
};

export default BaseText;
