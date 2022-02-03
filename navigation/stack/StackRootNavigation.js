import DrawerMenuNavigation from '../drawer/DrawerMenuNavigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackAuthNavigation from './StackAuthNavigation';
import StartUpScreen from '../../screens/StartUpScreen';
import { useSelector } from 'react-redux';

const StackRootNavigation = () => {
  const isAuth = useSelector(
    (state) => !!state.auth.token
  );

  const didTryAutoLogin = useSelector(
    (state) => state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {!isAuth && !didTryAutoLogin && (
        <StartUpScreen/>
      )}
      {!isAuth && didTryAutoLogin && (
        <StackAuthNavigation/>
      )}
      {isAuth && (
        <DrawerMenuNavigation/>
      )}
    </NavigationContainer>
  );
};

export default StackRootNavigation;
