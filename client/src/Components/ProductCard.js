import React from "react";
import "./ProductCard.css";
import { useStateValue } from "../StateProvider";
import { useAlert } from "react-alert";

function ProductCard({ id, name, image, price, info, type }) {
  const [{ basket }, dispatch] = useStateValue();
  const alert = useAlert();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        item: id,
        name: name,
        image: image,
        price: price,
        type: type,
      },
    });

    alert.success("Added to order");
  };
  return (
    <div className="product">
      <div className="product__image">
        <img src={`http://localhost:5000/${image}`} alt="" />
        <div className="product__name">{name}</div>
      </div>

      <div className="product__ip">
        <div className="product__info">{info}</div>
        <div className="product__price">Rs. {price}</div>
      </div>

      <button
        className="product__button"
        onClick={() => {
          addToBasket();
        }}
      >
        Add to order
      </button>
    </div>
  );
}

export default ProductCard;
