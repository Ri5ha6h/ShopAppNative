import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Card from '../UI/Card';

const ProductItem = (props) => {
  let TouchableComp = TouchableOpacity;
  if (
    Platform.OS === 'android' &&
    Platform.Version >= 21
  ) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.prodCont}>
      <View style={styles.touchCont}>
        <TouchableComp
          useForeground
          onPress={props.onSelect}
        >
          <View>
            <View style={styles.imgCont}>
              <Image
                style={styles.image}
                source={{ uri: props.image }}
              />
            </View>
            <View style={styles.textCont}>
              <Text style={styles.title}>
                {props.title}
              </Text>
              <Text style={styles.price}>
                ${props.price}
              </Text>
            </View>
            <View style={styles.btnCont}>
              {props.children}
            </View>
          </View>
        </TouchableComp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchCont: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  prodCont: {
    width: '90%',
    height: 300,
    margin: 20,
  },
  imgCont: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  textCont: {
    height: '18%',
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    color: '#3B82F6',
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  btnCont: {
    height: '22%',
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProductItem;
