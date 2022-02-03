import * as authAction from '../../store/actions/auth';

import {
  Button,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import StackOrderNavigation from '../stack/StackOrderNavigation';
import StackShopNavigation from '../stack/StackShopNavigation';
import StackUserNavigation from '../stack/StackUserNavigation';
import { useDispatch } from 'react-redux';

const Drawer = createDrawerNavigator();

const DrawerMenuNavigation = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      initialRouteName='Products'
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: '#6B7280',
        drawerLabelStyle: {
          fontSize: 18,
          fontFamily: 'open-sans-bold',
        },
        drawerIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Products') {
            iconName =
              Platform.OS === 'android'
                ? 'md-cart'
                : 'ios-cart';
          } else if (route.name === 'Orders') {
            iconName =
              Platform.OS === 'android'
                ? 'md-list'
                : 'ios-list';
          } else if (route.name === 'Admin') {
            iconName =
              Platform.OS === 'android'
                ? 'md-create'
                : 'ios-create';
          }
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label='Logout'
              onPress={() => {
                dispatch(authAction.logout());
                // navigation.navigate('Auth');
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name='Products'
        component={StackShopNavigation}
      />
      <Drawer.Screen
        name='Orders'
        component={StackOrderNavigation}
      />
      <Drawer.Screen
        name='Admin'
        component={StackUserNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenuNavigation;
