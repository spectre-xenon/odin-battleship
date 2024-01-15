import Ship from "@factories/ship";

export default function Gameboard() {
  const board = [];
  const shipBlocks = [];
  for (let i = 0; i < 100; i += 1) {
    board.push({
      ship: false,
      hit: false,
    });
  }

  const hasShipAt = (coords) => {
    if (board[coords].ship) return true;
    return false;
  };

  const isLegalPlacement = (coords, length, axis) => {
    // Illegal placement
    // Illegal ship length outside board placement
    const addFactor = axis === "x" ? 1 : 10;
    const illegalX = {
      9: true,
      19: true,
      29: true,
      39: true,
      49: true,
      59: true,
      69: true,
      79: true,
      89: true,
      99: true,
    };

    for (let i = coords; i < coords + length * addFactor; i += addFactor) {
      if (axis === "x" && illegalX[i] && i !== coords + (length - 1)) {
        return false;
      }

      // Illegal placement
      if (i > 99 || i < 0) return false;
      if (board[i] === undefined) return false;
      // Occupied
      if (board[i].ship) return false;
    }
    // Too close to other ship
    // if place we checking is not on board skip this check

    if (axis === "x") {
      // Block before ship
      if (board[coords - 1] !== undefined && board[coords - 1].ship)
        return false;
      // Block after ship
      if (board[coords + length] !== undefined && board[coords + length].ship)
        return false;

      for (let i = -addFactor; i <= length * addFactor; i += addFactor) {
        // Blocks above ship
        if (board[coords + 10 + i] !== undefined && board[coords + 10 + i].ship)
          return false;
        // Blocks below ship
        if (board[coords - 10 + i] !== undefined && board[coords - 10 + i].ship)
          return false;
      }
    }

    if (axis === "y") {
      // Block above ship
      if (board[coords - 10] !== undefined && board[coords - 10].ship)
        return false;
      // Block below ship
      if (
        board[coords + length * 10] !== undefined &&
        board[coords + length * 10].ship
      )
        return false;

      for (let i = -addFactor; i <= length * addFactor; i += addFactor) {
        // Blocks right of ship
        if (board[coords + 1 + i] !== undefined && board[coords + 1 + i].ship)
          return false;
        // Blocks left of ship
        if (board[coords - 1 + i] !== undefined && board[coords - 1 + i].ship)
          return false;
      }
    }

    return true;
  };

  const place = (coords, length, axis = "x") => {
    // Guard clauses
    if (isLegalPlacement(coords, length, axis) === false) return "illegal";

    // Placing logic
    const addFactor = axis === "x" ? 1 : 10;
    const ship = Ship(length);

    // Place ship blocks on board depending the placement is x or y
    for (let i = coords; i < coords + length * addFactor; i += addFactor) {
      board[i].ship = ship;
      shipBlocks.push(board[i]);
    }
    // Placment succseseded
    return "placed";
  };

  const receiveAttack = (coords) => {
    if (board[coords].hit === true) return "illegal";
    if (board[coords].ship === false) {
      board[coords].hit = true;
      return "miss";
    }
    board[coords].ship.hit();
    board[coords].hit = true;
    return "hit";
  };

  // Filter board by blocks that has ships then stop at the first
  // ship that reports false and return false (!)
  const isAllSunk = () =>
    !shipBlocks.some((block) => block.ship.isSunk() === false);

  const getBoard = () => board;

  return {
    shipBlocks,
    place,
    receiveAttack,
    isAllSunk,
    isLegalPlacement,
    hasShipAt,
    getBoard,
  };
}
