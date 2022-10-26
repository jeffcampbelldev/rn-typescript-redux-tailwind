import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import tailwind from 'tailwind-rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { authSelector } from '_app/store/auth/selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BAvatar } from './BAvatar';
import { Colors } from '_app/theme';
import { NavigationService } from '_app/services';

export const HomeHeader = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useSelector(authSelector);
  return (
    <View style={[{ paddingTop: top + 4 }]}>
      <View style={tailwind('flex-row py-2 px-5 items-center justify-between')}>
        <View style={tailwind('flex-row items-center')}>
          <BAvatar url={user?.photoUrl} onPress={() => NavigationService.navigate({ name: 'Profile' })} />
        </View>
        <View style={tailwind('flex-row items-center')}>
          <TouchableOpacity style={tailwind('rounded-full overflow-hidden')}>
            <Icon name="bell" color={Colors.WHITE} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
