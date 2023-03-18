import { createContext, useReducer } from "react";

import { Card, CardCoordinates } from "../helpers/types";

const initialState = {
  stock: [],
  talon: [],
  tableaus: [[], [], [], [], [], [], []],
  foundations: [[], [], [], []],
  pickupLocation: { pileType: null, pileNumber: null, cardNumber: null },
  isCardSelected: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setStock":
      return { ...state, stock: action.payload };
    case "setTalon":
      return { ...state, talon: action.payload };
    case "setTableaus":
      return { ...state, tableaus: action.payload };
    case "setFoundations":
      return { ...state, foundations: action.payload };
    case "setIsCardSelected":
      return { ...state, isCardSelected: action.payload };
    case "setPickupLocation":
      return { ...state, pickupLocation: action.payload };
    default:
      return state;
  }
};

const getClickedElement = (clickedElement: HTMLElement) => {
  const clickedPileType = clickedElement!.parentElement!.parentElement!.id!;
  const clickedPileNumber = +clickedElement.parentElement?.dataset.pile!;
  const clickedCardNumber = +clickedElement.dataset.card!;

  return { clickedPileType, clickedPileNumber, clickedCardNumber };
};

export const CardPilesContext = createContext<{
  talon: Card[];
  tableaus: (Card[] | [])[];
  foundations: (Card[] | [])[];
  isCardSelected: boolean;
  stock: Card[];
  setStock: (stock: Card[]) => void;
  setTableaus: (tableaus: Card[][]) => void;
  drawCard: () => void;
  selectCard: (event: React.MouseEvent) => void;
  moveCard: (event: React.MouseEvent) => void;
  unselectCard: () => void;
  flipTalonToStock: () => void;
}>({
  ...initialState,

  setTableaus: () => {},
  setStock: () => {},
  drawCard: () => {},
  selectCard: () => {},
  moveCard: () => {},
  unselectCard: () => {},
  flipTalonToStock: () => {},
});

export const CardPilesContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setTableaus = (tableaus: Card[][]) => {
    dispatch({ type: "setTableaus", payload: tableaus });
  };

  const setStock = (stock: Card[]) => {
    dispatch({ type: "setStock", payload: stock });
  };

  const setFoundations = (foundations: (Card[] | null)[]) => {
    dispatch({ type: "setFoundations", payload: foundations });
  };

  const setTalon = (talon: Card[] | null) => {
    dispatch({ type: "setTalon", payload: talon });
  };

  const drawCard = () => {
    const { stock, talon } = state;

    if (stock.length > 0) {
      const drawnCard = stock.at(-1);
      drawnCard.faceUp = true;
      const newStock = stock.slice(0, -1);
      const newTalon = [drawnCard, ...talon];

      dispatch({ type: "setStock", payload: newStock });
      dispatch({ type: "setTalon", payload: newTalon });
    }
  };

  const selectCard = (event: React.MouseEvent) => {
    const pickupLocation = getClickedElement(event.target as HTMLElement);

    dispatch({ type: "setPickupLocation", payload: pickupLocation });
    dispatch({ type: "setIsCardSelected", payload: true });
  };

  const unselectCard = () => {
    dispatch({
      type: "setPickupLocation",
      payload: initialState.pickupLocation,
    });
    dispatch({
      type: "setIsCardSelected",
      payload: false,
    });
  };

  const moveCard = (event: React.MouseEvent) => {
    const { talon, tableaus, foundations } = state;
    const legalMove = isLegalMove(event);
    if (!legalMove) {
      unselectCard();
      return;
    }

    const {
      fromPileType,
      toPileType,
      fromCardNumber,
      fromPileNumber,
      toPileNumber,
    } = legalMove;

    let movingCards;

    switch (fromPileType) {
      case "talon":
        const newTalon = [...talon];
        movingCards = [newTalon.shift()];
        setTalon(newTalon);
        break;
      case "tableaus":
        const newTableaus = [...tableaus];
        movingCards = newTableaus[fromPileNumber].splice(fromCardNumber);
        if (newTableaus[fromPileNumber].length) {
          newTableaus[fromPileNumber].at(-1).faceUp = true;
        }
        setTableaus(newTableaus);
        break;
      case "foundations":
        const newFoundations = [...foundations];
        movingCards = [newFoundations[fromPileNumber].shift()];
        setFoundations(newFoundations);
    }

    switch (toPileType) {
      case "tableaus":
        const newTableaus = [...tableaus];
        newTableaus[toPileNumber].push(...movingCards);
        setTableaus(newTableaus);
        break;
      case "foundations":
        const newFoundations = [...foundations];
        newFoundations[toPileNumber].unshift(...movingCards);
        setFoundations(newFoundations);
        break;
    }

    unselectCard();
  };

  const isLegalMove = (
    event: React.MouseEvent
  ): CardCoordinates | undefined => {
    const {
      clickedPileType: fromPileType,
      clickedPileNumber: fromPileNumber,
      clickedCardNumber: fromCardNumber,
    } = state.pickupLocation;

    const {
      clickedPileType: toPileType,
      clickedPileNumber: toPileNumber,
      clickedCardNumber: toCardNumber,
    } = getClickedElement(event.target as HTMLElement);

    const fromCard =
      fromPileType === "talon"
        ? (state[fromPileType][0] as Card)
        : (state[fromPileType][fromPileNumber][fromCardNumber] as Card);

    const toCard = state[toPileType][toPileNumber][toCardNumber] as Card;

    const moveConfiguration = {
      fromPileType,
      toPileType,
      fromCardNumber,
      toCardNumber,
      fromPileNumber,
      toPileNumber,
    };

    if (
      toPileType === "tableaus" &&
      toCard &&
      toCard.color !== fromCard.color &&
      toCard.value - fromCard.value === 1
    ) {
      return moveConfiguration;
    } else if (toPileType === "tableaus" && !toCard && fromCard.value === 13) {
      return moveConfiguration;
    } else if (
      (toPileType === "foundations" && !toCard && fromCard.value === 1) ||
      (toPileType === "foundations" &&
        toCard &&
        toCard.suit === fromCard.suit &&
        toCard.value - fromCard.value === -1)
    ) {
      return moveConfiguration;
    } else {
      return false;
    }
  };

  const flipTalonToStock = () => {
    const newStock = [...state.talon];
    setStock(newStock);
    setTalon([]);
  };

  return (
    <CardPilesContext.Provider
      value={{
        talon: state.talon,
        tableaus: state.tableaus,
        foundations: state.foundations,
        stock: state.stock,
        moveCard,
        setStock,
        setTableaus,
        drawCard,
        selectCard,
        unselectCard,
        flipTalonToStock,
        isCardSelected: state.isCardSelected,
      }}
    >
      {children}
    </CardPilesContext.Provider>
  );
};
