import React from "react";

function CardData({ number, name, icon }) {
  return (
    <>
      <div className="cards">
        <div className="name-details">
          <div className="number">{number}</div>
          <div className="name">{name}</div>
        </div>
        <div className="card-icons">{icon}</div>
      </div>
    </>
  );
}

export default CardData;
