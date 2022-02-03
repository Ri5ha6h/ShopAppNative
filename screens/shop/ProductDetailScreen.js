import React, {useLayoutEffect} from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Button,
  Image,
  Platform
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as cartAction from '../../store/actions/cart'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';


const ProductDetailScreen = ({
  navigation,
  route,
}) => {
  const { prodId } = route.params;
  const products = useSelector(
    (state) => state.products.availableProducts
  );
  const item = products.find(
    (prod) => prod.id === prodId
  );

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={
            CustomHeaderButton
          }
        >
          <Item
            title='Cart'
            iconName={
              Platform.OS === 'android'
                ? 'md-cart'
                : 'ios-cart'
            }
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.mainCont}>
      <ScrollView>
        <View style={styles.cont}>
          <View style={styles.imgCont}>
            <Image
              style={styles.image}
              source={{ uri: item.imageUrl }}
            />
          </View>
          <View style={styles.descCont}>
            <Text style={styles.desc}>
              {item.description}
            </Text>
          </View>
          <View style={styles.btnCont}>
            <Text style={styles.price}>
              ${item.price}
            </Text>
            <Button
              color={Colors.primary}
              title='Add to Cart'
              onPress={() => {
                  dispatch(cartAction.addToCart(item))
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  cont: {
    padding: 10,
  },
  imgCont: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 15,
  },
  descCont: {
    padding: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 15,
    fontWeight: '700',
    color: '#6B7280',
  },
  btnCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
});

export default ProductDetailScreen;
