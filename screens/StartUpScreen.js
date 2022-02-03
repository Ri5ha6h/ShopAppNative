import * as authAction from '../store/actions/auth';

import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from '../components/UI/Spinner';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

const StartUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem(
        'userData'
      );
      if (!userData) {
        // navigation.navigate('AuthNav');
        dispatch(authAction.setDidTryAL());
        return;
      }
      const transformedData =
        JSON.parse(userData);
      const { token, userId, expireDate } =
        transformedData;
      const expirationDate = new Date(expireDate);

      if (
        expirationDate <= new Date() ||
        !token ||
        !userId
      ) {
        // navigation.navigate('AuthNav');
        dispatch(authAction.setDidTryAL());
        return;
      }

      const expireTime =
        expirationDate.getTime() -
        new Date().getTime();

      // navigation.navigate('ShopApp');
      dispatch(
        authAction.authenticate(
          token,
          userId,
          expireTime
        )
      );
    };
    tryLogin();
  }, [dispatch]);
  return <Spinner />;
};

const styles = StyleSheet.create({});

export default StartUpScreen;
