import Gameboard from "@factories/gameboard";

export function Player(myName = "Player") {
  const name = myName;
  const board = Gameboard();

  let attack = (board, coords) => {
    return board.receiveAttack(coords);
  };

  return { name, board, attack };
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
