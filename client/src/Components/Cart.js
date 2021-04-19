import React from "react";
import "./Card.css";
import { useStateValue } from "../StateProvider";
import { useAlert } from "react-alert";

function Cart({ id, name, price, type }) {
  const [{ basket }, dispatch] = useStateValue();
  const alert = useAlert();
  const removeFromBasket = () => {
    // remove item..
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
    alert.show("Item removed from order");
  };

  return (
    <div className="cart">
      <div className="cart__name">{name}</div>
      <div className="cart__type">{type}</div>
      <div className="cart__price">Rs {price}</div>

      <button
        className="cartButton"
        onClick={() => {
          removeFromBasket();
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default Cart;
