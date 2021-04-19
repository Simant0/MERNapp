import React from "react";
import "./Card.css";

function Card({ title, image, body }) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt="" style={{ width: "100%" }} />
      </div>
      <div className="card__title">{title}</div>
      <div className="card__body">{body}</div>
    </div>
  );
}

export default Card;
