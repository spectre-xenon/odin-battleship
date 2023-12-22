import Gameboard from "./gameboard";

export function Player() {
  const board = Gameboard();

  let attack = (board, coords) => {
    return board.receiveAttack(coords);
  };

  return { board, attack };
}

export function Computer() {
  const board = Gameboard();

  const attack = (board) => {
    let randomCoords = Math.floor(Math.random() * 100);
    while (board.hasShipAt(randomCoords) === false) {
      randomCoords = Math.floor(Math.random() * 100);
    }
  };

  return { board, attack };
}
