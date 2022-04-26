import React, { createContext, useContext, useState } from "react";
import SHOP_DATA from "../shop-data.json";

const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_DATA);
  const value = { products, setProducts };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("Provider not found!");
  }
  const { products, setProducts } = context;
  return { products, setProducts };
};
