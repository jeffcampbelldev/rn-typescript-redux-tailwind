import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '_app/types';

import AuthStackNavigator from './AuthStackNavigator';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import AuthedStackNavigator from './AuthedStackNavigator';
import { LocalStorageService } from '_app/services';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | undefined>(undefined);
  useEffect(() => {
    const getAuthState = async () => {
      const token = await LocalStorageService.getAuthToken();
      if (token) {
        setInitialRoute('AuthedStack');
      } else {
        setInitialRoute('AuthStack');
      }
    };
    getAuthState();
  }, []);
  if (!initialRoute) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
      <Stack.Screen name="OnboardingStack" component={OnboardingStackNavigator} />
      <Stack.Screen name="AuthedStack" component={AuthedStackNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
