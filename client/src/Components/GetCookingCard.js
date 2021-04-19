import React from "react";
import "./GetCookingCard.css";
import { useStateValue } from "../StateProvider";

function GetCookingCard({ val }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasketGC = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: val.id,
        name: val.name,
        price: val.price,
        type: val.type,
      },
    });
  };
  return (
    <div className="getCookingCard">
      <div className="getCookingCardName">{val.name}</div>
      <div className="getCookingCardInfo">{val.info}</div>
      <div className="getCookingCardPrice">Rs. {val.price}</div>
      <button className="getCookingCardButton" onClick={addToBasketGC}>
        Add to order
      </button>
    </div>
  );
}

export default GetCookingCard;
