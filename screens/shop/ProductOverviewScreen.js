import * as cartAction from '../../store/actions/cart';
import * as productAction from '../../store/actions/products';

import {
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
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Error from '../../components/UI/Error';
import ProductItem from '../../components/shop/ProductItem';
import Spinner from '../../components/UI/Spinner';

const ProductOverviewScreen = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] =
    useState(false);
  const [isRefreshing, setIsRefreshing] =
    useState(false);
  const [error, setError] = useState();
  const products = useSelector(
    (state) => state.products.availableProducts
  );

  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(
        productAction.fetchProducts()
      );
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        loadProducts();
      }
    );
    return () => {
      unsubscribe();
    };
  }, [loadProducts, navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts, setIsLoading]);
  const handleSelect = (id, title) => {
    navigation.navigate('Details', {
      prodTitle: title,
      prodId: id,
    });
  };
  const renderProducts = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          handleSelect(
            itemData.item.id,
            itemData.item.title
          );
        }}
      >
        <Button
          color={Colors.primary}
          title='Details'
          onPress={() => {
            handleSelect(
              itemData.item.id,
              itemData.item.title
            );
          }}
        />
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => {
            dispatch(
              cartAction.addToCart(itemData.item)
            );
          }}
        />
      </ProductItem>
    );
  };

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

  if (error) {
    return <Error click={loadProducts} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.loadCont}>
        <Text>
          Start adding some products! Right now
          there are none to show
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={renderProducts}
    />
  );
};

const styles = StyleSheet.create({
  loadCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductOverviewScreen;
