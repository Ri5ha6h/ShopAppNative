import * as orderAction from '../../store/actions/orders';

import {
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
import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Spinner from '../../components/UI/Spinner';

const OrdersScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] =
    useState(false);
  const orders = useSelector(
    (state) => state.order.orders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderAction.fetchOrder()).then(
      () => {
        setIsLoading(false);
      }
    );
  }, [dispatch]);

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
    });
  }, [navigation]);

  if (isLoading) {
    return <Spinner />;
  }

  if (orders.length === 0) {
    return (
      <View style={styles.cont}>
        <Text>
          No orders found! Start ordering some.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
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

export default OrdersScreen;
