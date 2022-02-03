import * as productAction from '../../store/actions/products';

import {
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
import React, { useLayoutEffect } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector(
    (state) => state.products.userProducts
  );

  const dispatch = useDispatch();

  const handleSelect = (id) => {
    navigation.navigate('Edit', {
      prodId: id,
    });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Are you sure!',
      'Do you really want to delete this item?',
      [
        {
          text: 'No',
          style: 'default',
          onPress: () => {},
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            dispatch(
              productAction.deleteProduct(id)
            );
          },
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons
          HeaderButtonComponent={
            CustomHeaderButton
          }
        >
          <Item
            title='Menu'
            iconName={
              Platform.OS === 'android'
                ? 'md-menu'
                : 'ios-menu'
            }
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={
            CustomHeaderButton
          }
        >
          <Item
            title='Add'
            iconName={
              Platform.OS === 'android'
                ? 'md-create'
                : 'ios-create'
            }
            onPress={() => {
              navigation.navigate('Edit', {
                prodId: '',
              });
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (userProducts.length === 0) {
    return (
      <View style={styles.cont}>
        <Text>
          No products found! Start adding some.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            handleSelect(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              handleSelect(itemData.item.id);
            }}
          />
          <Button
            color='#EF4444'
            title='Delete'
            onPress={() => {
              handleDelete(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProductsScreen;
