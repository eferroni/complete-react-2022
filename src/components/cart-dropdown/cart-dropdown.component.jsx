import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useCart } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems?.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={() => navigate("/checkout")}>Checkout</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;
