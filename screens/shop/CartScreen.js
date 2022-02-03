import * as cartAction from '../../store/actions/cart';
import * as orderAction from '../../store/actions/orders';

import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Card from '../../components/UI/Card';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import React from 'react';

const CartScreen = (props) => {
  const cartTotal = useSelector(
    (state) => state.cart.total
  );
  const cartItems = useSelector((state) => {
    const arrCartItems = [];
    for (const key in state.cart.item) {
      arrCartItems.push({
        productId: key,
        productTitle:
          state.cart.item[key].productTitle,
        productPrice:
          state.cart.item[key].productPrice,
        quantity: state.cart.item[key].quantity,
        sum: state.cart.item[key].sum,
        productPushToken:
          state.cart.item[key].pushToken,
      });
    }
    return arrCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const renderCart = (itemData) => {
    return (
      <CartItem
        quant={itemData.item.quantity}
        title={itemData.item.productTitle}
        total={itemData.item.sum}
        deleteAble
        remove={() => {
          dispatch(
            cartAction.removeFromCart(
              itemData.item.productId
            )
          );
        }}
      />
    );
  };
  return (
    <View style={styles.mainCont}>
      <Card style={styles.summaryCont}>
        <Text style={styles.cartTotal}>
          Total:{' '}
          <Text style={styles.total}>
            $
            {Math.round(
              cartTotal.toFixed(2) * 100
            ) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(
              orderAction.addOrder(
                cartItems,
                cartTotal
              )
            );
          }}
        />
      </Card>
      <FlatList
        keyExtractor={(item, index) =>
          item.productId
        }
        data={cartItems}
        renderItem={renderCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  summaryCont: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    justifyContent: 'space-between',
    padding: 12,
  },
  cartTotal: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    color: '#9CA3AF',
  },
  total: {
    fontSize: 17,
    color: '#6B7280',
  },
  cartItems: {
    margin: 20,
  },
});

export default CartScreen;
