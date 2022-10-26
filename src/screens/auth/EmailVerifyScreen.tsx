import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BBaseScreen, BButton, BText } from '_app/components';
import { Dialog, mapError } from '_app/helper';
import { AxiosInstance } from '_app/services';
import { authSelector } from '_app/store/auth/selector';
import { Colors, useI18n } from '_app/theme';
import { AuthStackParamList } from '_app/types';

const EmailVerifyScreen = ({ navigation }: NativeStackScreenProps<AuthStackParamList>) => {
  const { translations } = useI18n();
  const { user } = useSelector(authSelector);
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await AxiosInstance.post('/auth/sendVerificationEmail', { email: user?.email });
      Dialog.showMessage(translations.emailSendSuccess, () => navigation.navigate('Welcome'));
      setLoading(false);
    } catch (error: any) {
      Dialog.showErrorMessage(mapError(error).message);
      setLoading(false);
    }
  }, [user?.email, translations, navigation]);
  return (
    <BBaseScreen>
      <View style={tailwind('flex-1 px-10 pt-4 justify-center')}>
        <View style={tailwind('flex-1 items-center justify-center')}>
          <Icon name="email-multiple-outline" size={150} color={Colors.WHITE} />
        </View>
        <View style={tailwind('items-center flex-1')}>
          <BText style={tailwind('font-bold text-xl my-8 text-center')}>{translations.confirmEmail}</BText>
          <BText style={tailwind('text-lg text-sm mb-4 text-center text-gray-400')}>{translations.weSentConfirmEmail}</BText>
          <BText style={tailwind('text-lg text-xs font-bold mb-4 text-center text-gray-400')}>{user?.email}</BText>
        </View>
        <View style={tailwind('items-center justify-center flex-1')}>
          <BText style={tailwind('font-light text-center text-sm')}>{translations.checkYourEmail}</BText>
        </View>
        <View style={tailwind('flex-1 justify-center')}>
          <BButton label={translations.resendEmail} gradient loading={loading} disabled={loading} style={tailwind('py-2')} onPress={onSubmit} />
        </View>
      </View>
    </BBaseScreen>
  );
};

export default EmailVerifyScreen;
