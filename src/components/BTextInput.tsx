import React from 'react';
import { ActivityIndicator, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import tailwind from 'tailwind-rn';
import { Fonts } from '_app/theme';

type Props = TextInputProps & { loading?: boolean; containerStyle?: ViewStyle | Array<ViewStyle> };

export const BTextInput = React.forwardRef<TextInput, Props>((props: Props, ref) => (
  <View style={props.containerStyle}>
    <TextInput {...props} ref={ref} style={[Fonts.PoppinsRegular, tailwind('text-white bg-white'), props.style]} />
    {props.loading && (
      <View style={tailwind('absolute right-2 bottom-0 top-0 justify-center')}>
        <ActivityIndicator size="small" color="black" />
      </View>
    )}
  </View>
));
