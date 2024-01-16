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

  const generateBoard = () => {
    while (board.getPlacableShipLength() !== 0) {
      const coords = Math.floor(Math.random() * 99);
      const length = board.getPlacableShipLength();
      const axis = ["x", "y", "x", "y", "x", "y"][
        Math.floor(Math.random() * 5)
      ];

      if (board.isLegalPlacement(coords, length, axis)) {
        board.place(coords, length, axis);
        board.shiftPlacableShipLength();
      }
    }
  };

  const attack = (board) => {
    let randomCoords = Math.floor(Math.random() * 99);
    let condition = true;
    let attack;
    while (condition) {
      attack = board.receiveAttack(randomCoords);
      if (attack === "illegal") randomCoords = Math.floor(Math.random() * 99);
      else condition = false;
    }
    return [randomCoords, attack];
  };

  return { board, generateBoard, attack };
}
