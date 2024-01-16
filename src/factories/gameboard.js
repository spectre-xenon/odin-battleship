import Ship from "@factories/ship";

export default function Gameboard() {
  const board = [];
  const shipBlocks = [];
  let placableShips = [5, 4, 3, 3, 2];
  for (let i = 0; i < 100; i += 1) {
    board.push({
      ship: false,
      hit: false,
    });
  }

  const getPlacableShipLength = () => placableShips[0] ?? 0;

  const shiftPlacableShipLength = () => placableShips.shift();

  const populatePlacableShips = () => (placableShips = [5, 4, 3, 3, 2]);

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
    const illegalX_2 = {
      0: true,
      10: true,
      20: true,
      30: true,
      40: true,
      50: true,
      60: true,
      70: true,
      80: true,
      90: true,
    };
    const illegalY = {
      90: true,
      91: true,
      92: true,
      93: true,
      94: true,
      95: true,
      96: true,
      97: true,
      98: true,
      99: true,
    };
    const illegalY_2 = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
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
      if (
        !illegalX_2[coords] &&
        board[coords - addFactor] !== undefined &&
        board[coords - addFactor].ship
      )
        return false;
      // Block after ship
      if (
        !illegalX[coords + length - addFactor] &&
        board[coords + length] !== undefined &&
        board[coords + length].ship
      )
        return false;

      // Blocks above ship
      // don't check top if on the top edge
      if (!illegalY[coords]) {
        for (let i = -addFactor; i <= length; i += addFactor) {
          if (illegalX[coords + 10 + i]) break;
          if (
            !illegalX[coords + 10 + i] &&
            board[coords + 10 + i] !== undefined &&
            board[coords + 10 + i].ship
          ) {
            return false;
          }
        }
      }

      // Blocks below ship
      // don't check bottom if on the bottom edge
      if (!illegalY_2[coords]) {
        for (let i = -addFactor; i <= length * addFactor; i += addFactor) {
          if (illegalX[coords - 10 + i]) break;
          if (
            board[coords - 10 + i] !== undefined &&
            board[coords - 10 + i].ship
          )
            return false;
        }
      }
    }

    if (axis === "y") {
      // Block above ship
      if (
        board[coords - addFactor] !== undefined &&
        board[coords - addFactor].ship
      )
        return false;
      // Block below ship
      if (
        board[coords + length * addFactor] !== undefined &&
        board[coords + length * addFactor].ship
      )
        return false;

      // Blocks left of ship
      // don't check left if on the left edge
      if (!illegalX_2[coords]) {
        for (let i = -addFactor; i <= length * addFactor; i += addFactor) {
          if (
            board[coords - 1 + i] !== undefined &&
            board[coords - 1 + i].ship
          ) {
            return false;
          }
        }
      }

      // Blocks right of ship
      // don't check right if on the right edge
      if (!illegalX[coords]) {
        for (let i = -addFactor; i <= length * addFactor; i += addFactor) {
          if (
            board[coords + 1 + i] !== undefined &&
            board[coords + 1 + i].ship
          ) {
            return false;
          }
        }
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
    if (board[coords].ship) {
      board[coords].ship.hit();
      board[coords].hit = true;
      return "hit";
    }
    board[coords].hit = true;
    return "miss";
  };

  // Filter board by blocks that has ships then stop at the first
  // ship that reports false and return false (!)
  const isAllSunk = () =>
    !shipBlocks.some((block) => block.ship.isSunk() === false);

  const getBoard = () => board;

  const getBlock = (block) => board[block];

  return {
    getPlacableShipLength,
    shiftPlacableShipLength,
    populatePlacableShips,
    shipBlocks,
    place,
    receiveAttack,
    isAllSunk,
    isLegalPlacement,
    hasShipAt,
    getBoard,
    getBlock,
  };
}
