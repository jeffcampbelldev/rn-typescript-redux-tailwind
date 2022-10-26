import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
// import analytics from '@react-native-firebase/analytics';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { I18nManager, StatusBar } from 'react-native';

import { NavigationService } from '_app/services';
import RootStackNavigator from '_app/navigation/RootStackNavigator';
import store, { persistor } from '_app/store';
import { Colors, I18nProvider } from '_app/theme';

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.DARK_PURPLE,
  },
};

const App = () => {
  const routeNameRef = React.useRef<string>();
  React.useEffect(() => {
    I18nManager.allowRTL(false);
    return () => {
      NavigationService.isReadyRef.current = false;
    };
  }, []);

  return (
    <I18nProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar translucent barStyle="light-content" />
          <NavigationContainer
            ref={NavigationService.navigationRef}
            theme={NavigationTheme}
            onReady={() => {
              NavigationService.isReadyRef.current = true;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = NavigationService.navigationRef?.current?.getCurrentRoute()?.name;
              if (previousRouteName !== currentRouteName) {
                // await analytics().logScreenView({
                //   screen_name: currentRouteName,
                //   screen_class: currentRouteName,
                // });
              }
              routeNameRef.current = currentRouteName;
            }}
          >
            <RootStackNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </I18nProvider>
  );
};

export default App;
