import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProductsScreen from '../../screens/user/UserProductsScreen';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import EditProductScreen from '../../screens/user/EditProductScreen';

const Stack = createNativeStackNavigator();

const StackUserNavigation = () => {
  return (
    <Stack.Navigator
      initialRoute='User'
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
        name='User'
        component={UserProductsScreen}
        options={{ title: 'Your Products' }}
      />
      <Stack.Screen
        name='Edit'
        component={EditProductScreen}
      />
    </Stack.Navigator>
  );
};

export default StackUserNavigation;
