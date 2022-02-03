import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';

import React, { useState } from 'react';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import StackRootNavigation from './navigation/stack/StackRootNavigation';
import authReducer from './store/reducers/auth';
import cartReducer from './store/reducers/cart';
import { enableScreens } from 'react-native-screens';
import orderReducer from './store/reducers/orders';
import productsReducer from './store/reducers/products';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [fontLoad, setFontLoad] = useState(false);

  if (!fontLoad) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoad(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <StackRootNavigation />
    </Provider>
  );
};

export default App;
