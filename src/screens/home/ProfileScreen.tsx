import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import { BAvatar, BBaseScreen, BButton, BText } from '_app/components';
import { logOutAction } from '_app/store/auth/actions';
import { authSelector } from '_app/store/auth/selector';
import { useI18n } from '_app/theme';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const { translations } = useI18n();
  return (
    <BBaseScreen gradient={true}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={tailwind('items-center')}>
        <BAvatar url={user?.photoUrl} defaultSize={40} containerStyle={tailwind('w-32 h-32 mt-20')} />
        <View style={tailwind('p-8 w-full')}>
          <BText style={tailwind('text-2xl text-center')}>{user?.fullName}</BText>
          <BText style={tailwind('mb-4 text-gray-400 mt-4')}>Email: {user?.email}</BText>
          <BText style={tailwind('mb-4 text-gray-400')}>Username: {user?.profile?.username}</BText>
          <BText style={tailwind('mb-4 text-gray-400')}>Interests: {user?.profile?.interests.join(', ')}</BText>
          <BButton
            labelStyle={tailwind('text-xl')}
            style={tailwind('border border-white')}
            label={translations.logOut}
            onPress={() => dispatch(logOutAction())}
          />
        </View>
      </ScrollView>
    </BBaseScreen>
  );
};

export default ProfileScreen;
