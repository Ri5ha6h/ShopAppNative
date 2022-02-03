import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';
import CartItem from './CartItem';

const OrderItem = (props) => {
  const [showDetail, setShowDetail] =
    useState(false);
  return (
    <Card style={styles.orderCont}>
      <View style={styles.orderSummary}>
        <Text style={styles.total}>
          Total:{' '}
          <Text style={styles.amount}>
            ${props.amount.toFixed(2)}
          </Text>
        </Text>
        <Text style={styles.date}>
          {props.date}
        </Text>
      </View>
      <Button
        color={Colors.accent}
        title={
          showDetail
            ? 'Hide Details'
            : 'Show Details'
        }
        onPress={() => {
          setShowDetail((det) => !det);
        }}
      />
      {showDetail && (
        <View style={styles.detailCont}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quant={cartItem.quantity}
              title={cartItem.productTitle}
              total={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderCont: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  total: {
    color: '#9CA3AF',
    fontSize: 19,
    fontWeight: '700',
  },
  amount: {
    color: '#6B7280',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans-bold',
    color: '#3B82F6',
    fontSize: 17,
  },
  detailCont: {
    width: '100%',
  },
});

export default OrderItem;
