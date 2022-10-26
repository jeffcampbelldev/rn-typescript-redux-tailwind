import * as React from 'react';
import { NavigationContainerRef, StackActions } from '@react-navigation/native';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { StackParams } from '_app/types';

export const isReadyRef: React.MutableRefObject<boolean | null> = React.createRef();
export const navigationRef = React.createRef<NavigationContainerRef<StackParams>>();

// type SubNavigator<T extends ParamListBase> = {
//   [K in keyof T]: { screen: K; params?: T[K] };
// }[keyof T];

// export function navigate(name: SubNavigator<StackParams>['screen'], params?: SubNavigator<StackParams>['params']) {
//   if (isReadyRef.current && navigationRef.current) {
//     navigationRef.current.navigate(name, params);
//   }
// }

type NavigateProps = {
  name: NativeStackScreenProps<StackParams, keyof StackParams>['route']['name'];
  params?: NativeStackScreenProps<StackParams, keyof StackParams>['route']['params'];
};

export function navigate(navigation: NavigateProps) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(navigation.name, navigation.params);
  }
}

export function back() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  }
}

export function replace(name: keyof StackParams) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.replace(name));
  }
}

export function reset(actions: Array<any>, index = 0) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset({ index, routes: actions.map(name => ({ name })) });
  }
}

export const getNavigationDispatch = () => {
  if (isReadyRef.current && navigationRef.current) {
    return navigationRef.current.dispatch;
  }
};

const NavigationService = {
  navigate,
  back,
  replace,
  reset,
  getNavigationDispatch,
};

export default NavigationService;
