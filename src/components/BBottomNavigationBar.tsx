import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tailwind from 'tailwind-rn';
import Svg, { SvgProps, Path } from 'react-native-svg';

import { Colors, Metrics } from '_app/theme';

import { BText } from './BText';
import LinearGradient from 'react-native-linear-gradient';

const TABS = [
  { label: 'Home', route: 'Home' },
  { label: 'Live', route: 'Live' },
  { label: 'Radio', route: 'Radio' },
];

const tabWidth = Metrics.windowWidth / TABS.length;
const indicatorWidth = 90;
const indicatorRatio = 368.5 / 70.9;
const initialIndicatorPos = (tabWidth - indicatorWidth) / 2;

export const BBottomNavigationBar = (props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const {
    navigation,
    state: { index: activeIndex, routes = [] },
  } = props;
  const position = useRef(new Animated.Value(initialIndicatorPos)).current;
  useEffect(() => {
    Animated.timing(position, {
      toValue: activeIndex === 0 ? initialIndicatorPos : initialIndicatorPos + tabWidth * activeIndex,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, position]);

  const onNavigate = (item: string, index: number) => {
    const currentRoute = routes.find(route => route.name === item);
    if (activeIndex !== index) {
      navigation.navigate(item);
    } else if (!!currentRoute && currentRoute.state && currentRoute.state.routeNames && currentRoute.state.routeNames.length) {
      navigation.navigate(currentRoute.state.routeNames[0]);
    }
  };

  return (
    <View style={[{ paddingBottom: insets.bottom, backgroundColor: Colors.BOTTOM_BAR_BG }, tailwind('rounded-t-2xl')]}>
      <View style={tailwind(`flex-row items-center justify-between ${insets.bottom ? 'pt-5' : 'py-5'}`)}>
        {TABS.map((item, index) => (
          <TouchableOpacity key={index} style={tailwind('items-center justify-center flex-1')} onPress={() => onNavigate(item.route, index)}>
            <Icon name="apple" size={24} color="white" style={[activeIndex !== index && tailwind('opacity-50')]} />
            <BText style={[activeIndex !== index && tailwind('opacity-50')]}>{item.label}</BText>
          </TouchableOpacity>
        ))}
        <Animated.View style={[tailwind('absolute top-0 left-0'), { width: indicatorWidth, transform: [{ translateX: position }] }]}>
          <Indicator width={indicatorWidth} height={indicatorWidth / indicatorRatio} />
          <View style={[tailwind('absolute inset-0 items-center'), { width: indicatorWidth }]}>
            <View style={[tailwind('h-2 w-2 rounded-full bg-red-600'), { backgroundColor: Colors.BOTTOM_BAR_BG }]} />
          </View>
        </Animated.View>
      </View>
      <LinearGradient colors={['transparent', Colors.DARK_PURPLE]} style={tailwind('absolute -top-40 left-0 right-0 h-40')} pointerEvents="none" />
    </View>
  );
};

const Indicator = (props: SvgProps) => (
  <Svg viewBox="0 0 368.5 70.9" {...props}>
    <Path
      d="M14.3.3 354.6 0c-28.3 0-56 8.7-99 31.4-42.5 22.4-54 31.4-71 31.4s-28.3-8.5-71-31.4C71.3 8.6 43-.1 15.3.3h-1z"
      fill={Colors.DARK_PURPLE}
      stroke={Colors.DARK_PURPLE}
      strokeMiterlimit={10}
    />
  </Svg>
);
