import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'tailwind-rn';

import { BBaseScreen, BButton, BText, BTextInput } from '_app/components';
import { Validator } from '_app/helper';
import { AxiosInstance } from '_app/services';
import { emailSignupAction, updateProfileAction } from '_app/store/auth/actions';
import { authSelector } from '_app/store/auth/selector';
import { useI18n } from '_app/theme';
import { AuthStackParamList } from '_app/types';

const UserNameScreen = ({ route }: NativeStackScreenProps<AuthStackParamList, 'UserName'>) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(authSelector);
  const {
    params: { email, password, fName, lName, isSocialSignup },
  } = route;
  const { translations } = useI18n();
  const [firstName, setFirstName] = useState(fName || '');
  const [lastName, setLastName] = useState(lName || '');
  const [userName, setUserName] = useState('');
  const [isUnique, setIsUnique] = useState(false);
  const [userNameLoading, setUserNameLoading] = useState(false);
  const lastNameRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  const checkError = () => {
    if (firstName.length < 1) {
      return 'Invalid First Name';
    }
    if (lastName.length < 1) {
      return 'Invalid Last Name';
    }
    if (!Validator.isValidUsername(userName)) {
      return 'Invalid Username';
    }
    return false;
  };

  const checkUniqueUserName = useMemo(
    () =>
      debounce(async (username: string) => {
        try {
          const { data } = await AxiosInstance.post('/auth/userNameCheck', { username });
          setIsUnique(!data.exists);
          setUserNameLoading(false);
        } catch (error) {
          setIsUnique(false);
          setUserNameLoading(false);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    if (userName.length > 2) {
      setUserNameLoading(true);
      checkUniqueUserName(userName);
    } else {
      setUserNameLoading(false);
    }
  }, [checkUniqueUserName, userName]);

  const onSubmit = () => {
    if (!isSocialSignup) {
      dispatch(emailSignupAction({ password, email, username: userName, firstName, lastName }));
    } else {
      dispatch(updateProfileAction({ username: userName, firstName, lastName }));
    }
  };

  return (
    <BBaseScreen loading={loading}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={tailwind('flex-1')}>
        <ScrollView style={tailwind('flex-1 px-10')} bounces={false}>
          <View style={tailwind('mt-6')}>
            <BText style={tailwind('font-bold text-lg mb-4')}>{translations.firstName}</BText>
            <BTextInput
              style={tailwind('bg-white rounded-md text-lg leading-6 p-2 text-black')}
              autoFocus
              returnKeyType="next"
              value={firstName}
              onChangeText={setFirstName}
              onSubmitEditing={() => lastNameRef.current?.focus()}
            />
          </View>
          <View style={tailwind('mt-6')}>
            <BText style={tailwind('font-bold text-lg mb-4')}>{translations.lastName}</BText>
            <BTextInput
              ref={lastNameRef}
              style={tailwind('bg-white rounded-md text-lg leading-6 p-2 text-black')}
              returnKeyType="next"
              value={lastName}
              onChangeText={setLastName}
              onSubmitEditing={() => userNameRef.current?.focus()}
            />
          </View>
          <View style={tailwind('mt-6')}>
            <BText style={tailwind('font-bold text-lg mb-4')}>{translations.username}</BText>
            <BTextInput
              ref={userNameRef}
              style={tailwind('bg-white rounded-md text-lg leading-6 p-2 text-black')}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              value={userName}
              onChangeText={setUserName}
              onSubmitEditing={onSubmit}
              loading={userNameLoading}
            />
            {!isUnique && userName.length > 2 && <BText style={[tailwind('font-light text-xs mt-2 text-red-600')]}>Username already exists!</BText>}
            <BText style={tailwind('font-light text-xs mt-2')}>{translations.userNameHint}</BText>
          </View>
          <View style={tailwind('mt-8 self-center w-28')}>
            <BButton
              label={translations.signup}
              gradient
              style={tailwind('py-1')}
              onPress={onSubmit}
              disabled={!!checkError() || !isUnique || userNameLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BBaseScreen>
  );
};

export default UserNameScreen;
