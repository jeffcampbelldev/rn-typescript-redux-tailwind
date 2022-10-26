import React from 'react';
import tailwind from 'tailwind-rn';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useI18n } from '_app/theme';
import { BBaseScreen, BButton, BImage, BText } from '_app/components';
import { NavigationService } from '_app/services';
import { appleLoginAction, googleLoginAction } from '_app/store/auth/actions';
import { authSelector } from '_app/store/auth/selector';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const { translations } = useI18n();
  const { loading } = useSelector(authSelector);
  const insets = useSafeAreaInsets();
  const onPressGoogle = async () => {
    dispatch(googleLoginAction());
  };
  const onPressApple = async () => {
    dispatch(appleLoginAction());
  };
  return (
    <BBaseScreen
      loading={loading}
      hideHeader
      gradient={false}
      contentStyle={[tailwind('justify-end items-center'), { paddingBottom: insets.bottom }]}
    >
      <Video source={require('_app/assets/video/welcome.mp4')} resizeMode="cover" style={tailwind('absolute inset-0')} muted repeat paused={false} />
      <BImage source={require('_app/assets/images/boltPlus.png')} style={[tailwind('w-2/5'), { aspectRatio: 1224 / 502 }]} />
      <BText style={tailwind('text-2xl font-bold text-center leading-10 mt-4')}>{translations.welcomeTitle}</BText>
      <BText style={tailwind('text-center mb-8')}>{translations.freeCost}</BText>
      <BButton
        label={translations.googleLogin}
        style={tailwind('w-10/12 bg-white mb-4')}
        labelStyle={tailwind('text-black')}
        icon={<BImage source={require('_app/assets/images/google.png')} style={tailwind('w-5 h-5 mr-4')} />}
        onPress={onPressGoogle}
      />
      <BButton
        label={translations.appleLogin}
        style={tailwind('w-10/12 bg-black mb-4 border border-gray-800')}
        icon={<Icon name="apple" style={tailwind('text-white mr-4')} size={25} />}
        onPress={onPressApple}
      />
      <BButton
        label={translations.emailLogin}
        style={tailwind('w-10/12 bg-gray-200 mb-4')}
        labelStyle={tailwind('text-black')}
        icon={<Icon name="email" style={tailwind('text-black mr-4')} size={25} />}
        onPress={() => NavigationService.navigate({ name: 'EmailLogin' })}
      />
      {/* <BButton label={translations.moreLogin} style={tailwind('mb-2')} labelStyle={tailwind('font-normal')} /> */}
    </BBaseScreen>
  );
};

export default WelcomeScreen;
