import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from '_app/types';
import WelcomeScreen from '_app/screens/auth/WelcomeScreen';
import EmailLoginScreen from '_app/screens/auth/EmailLoginScreen';
import PasswordScreen from '_app/screens/auth/PasswordScreen';
import UserNameScreen from '_app/screens/auth/UserNameScreen';
import EmailVerifyScreen from '_app/screens/auth/EmailVerifyScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const routes = [
  { name: 'Welcome', component: WelcomeScreen },
  {
    name: 'EmailLogin',
    component: EmailLoginScreen,
  },
  {
    name: 'Password',
    component: PasswordScreen,
  },
  {
    name: 'UserName',
    component: UserNameScreen,
  },
  {
    name: 'EmailVerify',
    component: EmailVerifyScreen,
  },
];

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      {routes.map((route, key) => (
        <AuthStack.Screen key={key} name={route.name as keyof AuthStackParamList} component={route.component} />
      ))}
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
