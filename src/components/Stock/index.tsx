import { useContext } from "react";
import { CardPilesContext } from "../../context/card-piles";

import "./Stock.css";

const cardBack =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Card_back_01.svg/1200px-Card_back_01.svg.png";

const Stock = () => {
  const { drawCard } = useContext(CardPilesContext);
  return (
    <div className="stock">
      <button onClick={drawCard}>
        <img src={cardBack} className="card" />
      </button>
    </div>
  );
};

export default Stock;
