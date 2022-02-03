import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.qty}>
          #{props.quant}
        </Text>
        <Text style={styles.title}>
          {props.title}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.total}>
          ${props.total.toFixed(2)}
        </Text>
        {props.deleteAble && (
          <TouchableOpacity
            onPress={props.remove}
            style={styles.delete}
          >
            <Ionicons
              name={
                Platform.OS === 'android'
                  ? 'md-trash'
                  : 'ios-trash'
              }
              size={22}
              color='#DC2626'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 8,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    color: '#6B7280',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginLeft: 6,
  },
  total: {
    fontFamily: 'open-sans',
    color: '#6B7280',
  },
  delete: {
    marginLeft: 15,
  },
});

export default CartItem;
