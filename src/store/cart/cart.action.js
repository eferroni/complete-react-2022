import { CART_ACTION_TYPE } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  const found = cartItems.find((item) => item.id === productToAdd.id);

  if (found) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const subtractCartItem = (cartItems, productToSubtract) => {
  const remove = cartItems.find(
    (item) => item.id === productToSubtract.id && item.quantity === 1
  );

  if (remove) {
    return cartItems.filter((item) => item.id !== productToSubtract.id);
  } else {
    return cartItems.map((item) =>
      item.id === productToSubtract.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const setCartIsOpen = (boolean) => {
  return createAction(CART_ACTION_TYPE.SET_CART_IS_OPEN, boolean);
};

export const addItemToCart = (cartItems, productToAdd) =>
  createAction(
    CART_ACTION_TYPE.SET_CART_ITEMS,
    addCartItem(cartItems, productToAdd)
  );

export const subtractItemFromCart = (cartItems, productToRemove) =>
  createAction(
    CART_ACTION_TYPE.SET_CART_ITEMS,
    subtractCartItem(cartItems, productToRemove)
  );

export const removeItemFromCart = (cartItems, productToRemove) =>
  createAction(
    CART_ACTION_TYPE.SET_CART_ITEMS,
    removeCartItem(cartItems, productToRemove)
  );
