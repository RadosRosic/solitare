import { useContext } from "react";
import { CardPilesContext } from "../context/card-piles";

import {
  getNewDeck,
  drawCard,
  formTabealu,
  formStock,
  flipTabealuCards,
  addCardProperties,
} from "../helpers/start-game-functions";

const useInitializeGame = () => {
  const { setStock, setTableaus } = useContext(CardPilesContext);

  const startGame = async () => {
    try {
      const fetchedDeck = await getNewDeck();
      const drawnCardsRes = await drawCard(fetchedDeck.deck_id, 52);
      const drawnCards = addCardProperties(drawnCardsRes.cards);
      const tabealueRes = await formTabealu(drawnCards);
      const tabealue = await flipTabealuCards(tabealueRes);
      const stockRes = await formStock(drawnCards);
      setStock(stockRes);
      setTableaus(tabealue);
    } catch (error) {
      console.error(error);
    }
  };

  return { startGame };
};

export default useInitializeGame;
