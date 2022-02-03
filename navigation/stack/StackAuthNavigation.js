import AuthScreen from '../../screens/user/AuthScreen';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackAuthNavigation = () => {
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
        name='Auth'
        component={AuthScreen}
        options={{ title: 'Login/SignUp' }}
      />
    </Stack.Navigator>
  );
};

export default StackAuthNavigation;
