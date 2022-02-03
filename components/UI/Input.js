import React, {
  useEffect,
  useReducer,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(
    inputReducer,
    {
      value: props.initialValue
        ? props.initialValue
        : '',
      isValid: props.initiallyValid,
      touched: false,
    }
  );

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(
        id,
        inputState.value,
        inputState.isValid
      );
    }
  }, [inputState, onInputChange, id]);

  const handleText = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (
      props.required &&
      text.trim().length === 0
    ) {
      isValid = false;
    }
    if (
      props.email &&
      !emailRegex.test(text.toLowerCase())
    ) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (
      props.minLength != null &&
      text.length < props.minLength
    ) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const handleFocus = () => {
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <View style={styles.formCont}>
      <Text style={styles.label}>
        {props.label}
      </Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={handleText}
        onBlur={handleFocus}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorCont}>
          <Text style={styles.errorText}>
            {props.errorText}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formCont: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderBottomColor: '#6B7280',
    borderBottomWidth: 1,
  },
  errorCont: {
    marginVertical: 6,
  },
  errorText: {
    fontSize: 15,
    color: '#DC2626',
    fontWeight: '600',
  },
});

export default Input;
