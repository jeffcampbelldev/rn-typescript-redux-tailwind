import React from 'react';
import { ActivityIndicator, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import tailwind from 'tailwind-rn';
import LinearGradient from 'react-native-linear-gradient';

import { BText } from './BText';
import { Colors } from '_app/theme';

type Props = TouchableOpacityProps & {
  label?: string;
  labelStyle?: TextStyle | TextStyle[];
  icon?: React.ReactNode;
  gradient?: boolean;
  loading?: boolean;
};

const ActiveGradient = [Colors.PURPLE, Colors.PURPLE_END];
const InactiveGradient = ['#555555', '#666666'];

export const BButton = (props: Props) => {
  const { label, labelStyle, icon, gradient = false, loading = false } = props;
  return (
    <TouchableOpacity {...props} style={[tailwind('items-center justify-center flex-row py-3 rounded-full overflow-hidden'), props.style]}>
      {gradient && (
        <LinearGradient
          colors={props.disabled ? InactiveGradient : ActiveGradient}
          style={tailwind('absolute inset-0')}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      {icon}
      {!!label && <BText style={labelStyle}>{label}</BText>}
      {loading && (
        <View style={tailwind('absolute inset-0 items-center justify-center bg-black bg-opacity-20')}>
          <ActivityIndicator size="small" color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};
