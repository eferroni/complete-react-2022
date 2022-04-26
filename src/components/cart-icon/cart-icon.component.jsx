import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useCart } from "../../contexts/cart.context";

const CartIcon = () => {
  const { toggleIsCartOpen, cartCount } = useCart();

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
