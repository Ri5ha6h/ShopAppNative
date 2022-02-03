import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '../../screens/shop/OrdersScreen';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';

const Stack = createNativeStackNavigator();

const StackOrderNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === 'ios'
              ? 'white'
              : Colors.primary,
        },
        headerTintColor:
          Platform.OS === 'ios'
            ? Colors.primary
            : 'white',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Stack.Screen
        name='Summary'
        component={OrdersScreen}
      />
    </Stack.Navigator>
  );
};

export default StackOrderNavigation;
