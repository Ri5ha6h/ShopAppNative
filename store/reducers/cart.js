import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../actions/cart';

import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  item: {},
  total: 0,
};

export default cartReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      const pushToken = addedProduct.pushToken;
      let updateOrNewCart;

      if (state.item[addedProduct.id]) {
        const updatedQuant =
          state.item[addedProduct.id].quantity;
        const updatedSum =
          state.item[addedProduct.id].sum;
        updateOrNewCart = new CartItem(
          updatedQuant + 1,
          prodPrice,
          prodTitle,
          pushToken,
          updatedSum + prodPrice
        );
      } else {
        updateOrNewCart = new CartItem(
          1,
          prodPrice,
          prodTitle,
          pushToken,
          prodPrice
        );
      }
      return {
        ...state,
        item: {
          ...state.item,
          [addedProduct.id]: updateOrNewCart,
        },
        total: state.total + prodPrice,
      };
    case REMOVE_FROM_CART:
      const selectedId = state.item[action.pid];
      const currentQty = selectedId.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedId.quantity - 1,
          selectedId.productPrice,
          selectedId.productTitle,
          selectedId.sum - selectedId.productPrice
        );
        updatedCartItems = {
          ...state.item,
          [action.pid]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.item };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        item: updatedCartItems,
        total:
          state.total - selectedId.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.item[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.item };
      const itemTotal =
        state.item[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        item: updatedItems,
        total: state.total - itemTotal,
      };
    default:
      return state;
  }
};
