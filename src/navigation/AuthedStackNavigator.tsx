import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { AuthedStackParamList, RootStackParamList } from '_app/types';
import MainStackNavigator from './MainStackNavigator';
import ProfileScreen from '_app/screens/home/ProfileScreen';
import { fetchUserAction } from '_app/store/auth/actions';
import { authSelector } from '_app/store/auth/selector';

const MainStack = createNativeStackNavigator<AuthedStackParamList>();

const AuthedStackNavigator = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'AuthedStack'>) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  useEffect(() => {
    const isOnboarded = user && user.profile && user.profile.interests && user.profile.interests.length > 0;
    if (!user) {
      navigation.replace('AuthStack');
      return;
    }
    if (!isOnboarded) {
      navigation.replace('OnboardingStack');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);
  return (
    <MainStack.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainStack" component={MainStackNavigator} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

export default AuthedStackNavigator;
