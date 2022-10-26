import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainStackParamList } from '_app/types';
import HomeScreen from '_app/screens/home/HomeScreen';
import { BBottomNavigationBar } from '_app/components';
import { View } from 'react-native';

const MainStack = createBottomTabNavigator<MainStackParamList>();
const EmptyScreen = () => <View />;

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home" tabBar={props => <BBottomNavigationBar {...props} />} screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Live" component={EmptyScreen} />
      <MainStack.Screen name="Radio" component={EmptyScreen} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
