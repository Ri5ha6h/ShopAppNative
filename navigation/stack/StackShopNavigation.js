import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';
import ProductOverviewScreen from '../../screens/shop/ProductOverviewScreen';
import Colors from '../../constants/Colors';
import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import CartScreen from '../../screens/shop/CartScreen';

const Stack = createNativeStackNavigator();

const StackShopNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Overview'
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
        name='Overview'
        component={ProductOverviewScreen}
        options={{
          title: 'All Products',
        }}
      />
      <Stack.Screen
        name='Details'
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.prodTitle,
        })}
      />
      <Stack.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: 'My Cart',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackShopNavigation;
