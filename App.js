import React from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import store from './src/redux/store';

import Navigation from './src/navigation';

const App = () => {
  let [fontsLoaded] = useFonts({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <Root>
        <Navigation />
      </Root>
    </Provider>
  );
};

export default App;
