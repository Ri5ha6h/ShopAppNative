import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from '../actions/products';

import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default productsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts:
          state.availableProducts.concat(
            newProduct
          ),
        userProducts:
          state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const prodIndex =
        state.userProducts.findIndex(
          (prod) => prod.id === action.pid
        );
      const updatedProd = new Product(
        action.pid,
        state.userProducts[prodIndex].ownerId,
        state.userProducts[prodIndex].pushToken,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[prodIndex].price
      );
      const updatedUserProd = [
        ...state.userProducts,
      ];
      updatedUserProd[prodIndex] = updatedProd;
      const availProdIndex =
        state.availableProducts.findIndex(
          (prod) => prod.id === action.pid
        );
      const updatedAvailProd = [
        ...state.availableProducts,
      ];
      updatedAvailProd[availProdIndex] =
        updatedProd;
      return {
        ...state,
        availableProducts: updatedAvailProd,
        userProducts: updatedUserProd,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.pid
        ),
        availableProducts:
          state.availableProducts.filter(
            (prod) => prod.id !== action.pid
          ),
      };
    default:
      return state;
  }
};
