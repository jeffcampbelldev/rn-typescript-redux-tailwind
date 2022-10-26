import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingStackParamList } from '_app/types';
import LanguageScreen from '_app/screens/onboarding/LanguageScreen';
import InterestsScreen from '_app/screens/onboarding/InterestsScreen';

const AuthStack = createNativeStackNavigator<OnboardingStackParamList>();

const routes = [
  { name: 'Language', component: LanguageScreen },
  { name: 'Interests', component: InterestsScreen },
];

const OnboardingStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Language"
      screenOptions={{
        headerShown: false,
      }}
    >
      {routes.map((route, key) => (
        <AuthStack.Screen key={key} name={route.name as keyof OnboardingStackParamList} component={route.component} />
      ))}
    </AuthStack.Navigator>
  );
};

export default OnboardingStackNavigator;
