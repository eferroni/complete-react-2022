import React, { createContext, useContext, useState } from "react";

const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Provider not found");
  }
  const { isCartOpen, setIsCartOpen } = context;

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return { isCartOpen, setIsCartOpen, toggleIsCartOpen };
};
