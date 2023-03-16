import { useContext } from "react";
import { CardPilesContext } from "../context/card-piles";
import { Card } from "../helpers/types";
import "./PlayingCard.css";

const cardBack =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Card_back_01.svg/1200px-Card_back_01.svg.png";

const PlayingCard: React.FC<{ card: Card; cardIndex: number }> = ({
  card,
  cardIndex,
}) => {
  const { selectCard } = useContext(CardPilesContext);

  return (
    <img
      data-card={cardIndex}
      src={card.faceUp ? card.image : cardBack}
      className={card.faceUp ? "card faceup" : "card"}
      alt={`${card.value} ${card.suit}`}
      key={card.suit + card.value}
      onClick={(event) => selectCard(event)}
    />
  );
};

export default PlayingCard;
