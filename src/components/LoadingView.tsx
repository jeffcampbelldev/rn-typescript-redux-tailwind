import React from 'react';
import { ActivityIndicator, TextStyle, View, ViewProps } from 'react-native';
import tailwind from 'tailwind-rn';

import { Colors } from '_app/theme';
import { BText } from './BText';

type Props = ViewProps & {
  loading: boolean;
  indicatorSize?: number | 'large' | 'small';
  title?: string;
  titleStyle?: TextStyle | Array<TextStyle>;
};

export const LoadingView = ({ loading, title = '', indicatorSize = 'large', titleStyle }: Props) => {
  if (!loading) {
    return null;
  }
  return (
    <View style={tailwind('absolute inset-0 z-10 items-center justify-center bg-black bg-opacity-50')}>
      <ActivityIndicator color={Colors.WHITE} size={indicatorSize} />
      {!!title && <BText style={titleStyle}>{title}</BText>}
    </View>
  );
};
