import React from 'react';
import { Text, TextProps } from 'react-native';
import tailwind from 'tailwind-rn';
import { Fonts } from '_app/theme';

export const BText = (props: TextProps) => (
  <Text {...props} style={[Fonts.PoppinsMedium, tailwind('text-white text-base'), props.style]}>
    {props.children}
  </Text>
);
