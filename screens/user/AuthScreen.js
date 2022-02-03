import * as authAction from '../../store/actions/auth';

import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidations = {
      ...state.inputValidations,
      [action.input]: action.isValid,
    };
    let updatedForm = true;
    for (const key in updatedValidations) {
      updatedForm =
        updatedForm && updatedValidations[key];
    }
    return {
      formIsValid: updatedForm,
      inputValues: updatedValues,
      inputValidations: updatedValidations,
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] =
    useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchState] = useReducer(
    formReducer,
    {
      inputValues: {
        email: '',
        password: '',
      },
      inputValidations: {
        email: false,
        password: false,
      },
      formIsValid: false,
    }
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Some error occurred!', error, [
        {
          type: 'Okay',
        },
      ]);
    }
  }, [error]);

  const textHandler = useCallback(
    (
      inputIdentifier,
      inputValue,
      inputValidity
    ) => {
      dispatchState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchState]
  );

  const handleAuth = () => {
    let action;
    if (isSignup) {
      action = authAction.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authAction.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      dispatch(action);
      // navigation.navigate('Products');
    } catch (err) {
      setError(err.message);
      // setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios' && 'padding'
      }
      style={styles.mainCont}
    >
      <LinearGradient
        colors={['#FEF3C7', '#FDE68A']}
        style={styles.linear}
      >
        <Card style={styles.authCont}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email!'
              onInputChange={textHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password!'
              onInputChange={textHandler}
              initialValue=''
            />
            <View style={styles.btnCont}>
              {isLoading ? (
                <ActivityIndicator
                  size='small'
                  color={Colors.primary}
                />
              ) : (
                <Button
                  title={
                    isSignup ? 'SignUp' : 'Login'
                  }
                  color={Colors.primary}
                  onPress={handleAuth}
                />
              )}
            </View>
            <View style={styles.btnCont}>
              <Button
                title={`Switch to ${
                  isSignup ? 'Login' : 'SignUp'
                }`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prev) => !prev);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  linear: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authCont: {
    width: '85%',
    maxWidth: 400,
    // maxHeight: 400,
    padding: 15,
    marginVertical: 10,
  },
  btnCont: {
    marginVertical: 10,
    // alignItems: 'center',
  },
});

export default AuthScreen;
