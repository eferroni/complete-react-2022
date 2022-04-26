import React, { createContext, useContext, useState, useEffect } from "react";

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

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subtractItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    );
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Provider not found");
  }
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    cartCount,
    cartTotal,
  } = context;

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const subtractItemFromCart = (productToRemove) => {
    setCartItems(subtractCartItem(cartItems, productToRemove));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  return {
    isCartOpen,
    toggleIsCartOpen,
    cartItems,
    addItemToCart,
    subtractItemFromCart,
    removeItemFromCart,
    cartCount,
    cartTotal,
  };
};
