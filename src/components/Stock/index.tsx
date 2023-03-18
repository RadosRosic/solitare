import { useContext } from "react";
import { CardPilesContext } from "../../context/card-piles";
import { cardBack } from "../PlayingCard";

import "./Stock.css";

const Stock = () => {
  const { drawCard, stock, flipTalonToStock } = useContext(CardPilesContext);
  return (
    <div className="stock">
      {!!stock.length ? (
        <button onClick={drawCard}>
          <img src={cardBack} className="card" alt="facedown card" />
        </button>
      ) : (
        <button className="flip-btn" onClick={flipTalonToStock}>
          Flip Talon
        </button>
      )}
    </div>
  );
};

export default Stock;
