import React, { useCallback } from 'react';
import { TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tailwind from 'tailwind-rn';
import { NavigationService } from '_app/services';
import { Colors } from '_app/theme';
import { BText } from './BText';
import { LoadingView } from './LoadingView';

type Props = ViewProps & {
  title?: string;
  loading?: boolean;
  hideHeader?: boolean;
  hideBack?: boolean;
  gradient?: boolean;
  contentStyle?: ViewStyle | Array<ViewStyle>;
  onBack?: () => void;
};

export const BBaseScreen = (props: Props) => {
  const { title, hideHeader = false, hideBack = false, style, contentStyle, gradient = true, loading = false, onBack } = props;
  const insets = useSafeAreaInsets();
  const onClickBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      NavigationService.back();
    }
  }, [onBack]);
  return (
    <View {...props} style={[tailwind('flex-1'), style]}>
      {gradient && (
        <LinearGradient
          style={tailwind('absolute bottom-0 left-0 right-0 h-1/2 opacity-80')}
          colors={[Colors.DARK_PURPLE, Colors.PURPLE_GRADIENT_END]}
        />
      )}
      {!hideHeader && (
        <View style={[{ paddingTop: insets.top + 5 }]}>
          <View style={tailwind('flex-row items-center px-2')}>
            {!!title && (
              <View style={tailwind('absolute inset-0 items-center justify-center')}>
                <BText style={tailwind('text-xl')}>{title}</BText>
              </View>
            )}
            {!hideBack && (
              <TouchableOpacity onPress={onClickBack}>
                <Icon name="chevron-left" style={tailwind('text-white border border-red-400')} size={40} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      <View style={[tailwind('flex-1'), contentStyle]}>{props.children}</View>
      <LoadingView loading={loading} />
    </View>
  );
};
