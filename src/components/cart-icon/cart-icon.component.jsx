import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import { useCart } from "../../contexts/cart.context";

const CartIcon = () => {
  const { toggleIsCartOpen, cartCount } = useCart();

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
