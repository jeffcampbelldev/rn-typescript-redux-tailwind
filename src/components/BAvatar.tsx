import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tailwind from 'tailwind-rn';

import { BImage } from './BImage';

type Props = {
  url?: string;
  containerStyle?: ViewStyle | Array<ViewStyle>;
  defaultSize?: number;
  onPress?: () => void;
};

export const BAvatar = ({ url, defaultSize = 30, containerStyle, onPress }: Props) => {
  return (
    <TouchableOpacity style={[tailwind('w-10 h-10 rounded-full overflow-hidden'), containerStyle]} onPress={onPress}>
      {!!url && <BImage source={{ uri: url }} style={[tailwind('h-full w-full')]} resizeMode="cover" />}
      {!url && (
        <View style={tailwind('h-full w-full items-center justify-center bg-gray-200')}>
          <Icon name="account" size={defaultSize} />
        </View>
      )}
    </TouchableOpacity>
  );
};
