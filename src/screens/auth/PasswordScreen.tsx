import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';

import { BBaseScreen, BButton, BText, BTextInput } from '_app/components';
import { emailLoginAction } from '_app/store/auth/actions';
import { authSelector } from '_app/store/auth/selector';
import { useI18n } from '_app/theme';
import { AuthStackParamList } from '_app/types';

const PasswordScreen = ({ route, navigation }: NativeStackScreenProps<AuthStackParamList, 'Password'>) => {
  const {
    params: { isSignup, email },
  } = route;
  const dispatch = useDispatch();
  const { loading } = useSelector(authSelector);
  const { translations } = useI18n();
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    if (isSignup) {
      navigation.navigate('UserName', { email, password });
    } else {
      dispatch(emailLoginAction({ email, password }));
    }
  };

  return (
    <BBaseScreen>
      <View style={tailwind('flex-1 px-10 pt-4')}>
        <View>
          <BText style={tailwind('font-bold text-lg mb-4')}>{isSignup ? translations.createPassword : translations.enterPassword}</BText>
          <BTextInput
            style={tailwind('bg-white rounded-md text-lg leading-6 p-2 py-3 text-black')}
            returnKeyType="next"
            autoCorrect={false}
            secureTextEntry
            autoCapitalize="none"
            autoFocus
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={onSubmit}
          />
        </View>
        <View style={tailwind('mt-8 self-center w-28')}>
          <BButton
            label={isSignup ? translations.next : translations.login}
            disabled={loading || (!isSignup ? !password.length : password.length < 6)}
            loading={loading}
            gradient
            style={tailwind('py-1')}
            onPress={onSubmit}
          />
        </View>
      </View>
    </BBaseScreen>
  );
};

export default PasswordScreen;
