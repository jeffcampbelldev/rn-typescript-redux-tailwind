import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import tailwind from 'tailwind-rn';

import { BBaseScreen, BButton, BText, BTextInput } from '_app/components';
import { Dialog, mapError, Validator } from '_app/helper';
import { AxiosInstance } from '_app/services';
import { useI18n } from '_app/theme';
import { AuthStackParamList } from '_app/types';

const EmailLoginScreen = ({ navigation }: NativeStackScreenProps<AuthStackParamList>) => {
  const { translations } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await AxiosInstance.post('/auth/emailCheck', { email });
      setLoading(false);
      const isSignup = !data?.exists;
      navigation.navigate('Password', { isSignup, email });
    } catch (error: any) {
      Dialog.showErrorMessage(mapError(error).message);
      setLoading(false);
    }
  }, [email, navigation]);
  return (
    <BBaseScreen>
      <View style={tailwind('flex-1 px-10 pt-4')}>
        <View>
          <BText style={tailwind('font-bold text-lg mb-4')}>{translations.enterEmail}</BText>
          <BTextInput
            style={tailwind('bg-white rounded-md text-lg leading-6 p-2 py-3 text-black')}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
            editable={!loading}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={onSubmit}
          />
        </View>
        <View style={tailwind('mt-8 self-center w-28')}>
          <BButton
            label={translations.next}
            gradient
            loading={loading}
            disabled={loading || !Validator.isValidEmail(email)}
            style={tailwind('py-1')}
            onPress={onSubmit}
          />
        </View>
      </View>
    </BBaseScreen>
  );
};

export default EmailLoginScreen;
