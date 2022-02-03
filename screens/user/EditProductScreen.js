import * as productAction from '../../store/actions/products';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import Spinner from '../../components/UI/Spinner';

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

const EditProductScreen = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] =
    useState(false);
  const [error, setError] = useState();
  const { prodId } = route.params;
  const dispatch = useDispatch();
  const editProd = useSelector((state) =>
    state.products.userProducts.find(
      (prod) => prod.id === prodId
    )
  );

  const [formState, dispatchState] = useReducer(
    formReducer,
    {
      inputValues: {
        title: editProd ? editProd.title : '',
        imageUrl: editProd
          ? editProd.imageUrl
          : '',
        description: editProd
          ? editProd.description
          : '',
        price: '',
      },
      inputValidations: {
        title: editProd ? true : false,
        imageUrl: editProd ? true : false,
        description: editProd ? true : false,
        price: editProd ? true : false,
      },
      formIsValid: editProd ? true : false,
    }
  );

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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [
        {
          text: 'Okay',
        },
      ]);
    }
  }, [error]);

  const handleSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert(
        'From cannot be submitted!!',
        'Please fill all the fields first!',
        [
          {
            text: 'Okay',
          },
        ]
      );
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editProd) {
        dispatch(
          productAction.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        dispatch(
          productAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title:
        prodId === ''
          ? 'Add Product'
          : 'Edit Product',
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={
            CustomHeaderButton
          }
        >
          <Item
            title='Save'
            iconName={
              Platform.OS === 'android'
                ? 'md-save'
                : 'ios-save'
            }
            onPress={handleSubmit}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, handleSubmit]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.mainCont}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCorrect
            autoCapitalize='sentences'
            returnKeyType='next'
            onInputChange={textHandler}
            initialValue={
              editProd ? editProd.title : ''
            }
            initiallyValid={!!editProd}
            required
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Please enter a valid image url!'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={textHandler}
            initialValue={
              editProd ? editProd.imageUrl : ''
            }
            initiallyValid={!!editProd}
            required
          />
          {editProd ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={textHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description!'
            keyboardType='default'
            autoCorrect
            autoCapitalize='sentences'
            multiline
            numberOfLines={3}
            onInputChange={textHandler}
            initialValue={
              editProd ? editProd.description : ''
            }
            initiallyValid={!!editProd}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    margin: 20,
  },
});

export default EditProductScreen;
