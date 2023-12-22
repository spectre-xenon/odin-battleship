import Ship from "./ship";

export default function Gameboard() {
  const board = [];
  const ships = [];
  for (let i = 0; i < 100; i += 1) {
    board.push({
      ship: false,
      hit: false,
    });
  }

  const hasShipAt = (coords) => {
    // Illegal placement
    if (coords > 100 || coords < 0) return undefined;
    if (board[coords] === undefined) return undefined;
    // Occupied
    if (board[coords].ship) return true;
    return false;
  };

  const reversePlacedBlocks = (currentCoords, originalCoords, addFactor) => {
    for (let i = currentCoords; i >= originalCoords; i -= addFactor) {
      board[i].ship = false;
    }
  };

  const place = (coords, length, axis = "x") => {
    // Guard clauses
    if (hasShipAt(coords) === undefined) return "illegal";
    if (hasShipAt(coords) === true) return "illegal";
    // Check that the surronding area is empty
    const addFactor = axis === "x" ? 1 : 10;

    if (axis === "x") {
      if (hasShipAt(coords - 1) === true) return "illegal";
      if (hasShipAt(coords + length + 1) === true) return "illegal";

      for (let i = -addFactor; i < length + addFactor; i += addFactor) {
        if (hasShipAt(coords + 10 + i) === true) return "illegal";
        if (hasShipAt(coords - 10 + i) === true) return "illegal";
      }
    }

    if (axis === "y") {
      if (hasShipAt(coords - 10) === true) return "illegal";
      if (hasShipAt(coords + length + 10) === true) return "illegal";

      for (let i = -addFactor; i < length + addFactor; i += addFactor) {
        if (hasShipAt(coords + 1 + i) === true) return "illegal";
        if (hasShipAt(coords - 1 + i) === true) return "illegal";
      }
    }

    // Placing logic
    const ship = Ship(length);
    const illegalX = {
      10: true,
      20: true,
      30: true,
      40: true,
      50: true,
      60: true,
      70: true,
      80: true,
      90: true,
      100: true,
    };

    // Place ship blocks on board depending the placement is x or y
    for (let i = coords; i < coords + length * addFactor; i += addFactor) {
      if (axis === "x" && illegalX[i] && i !== coords + length) {
        reversePlacedBlocks(i, coords, addFactor);
        return "illegal";
      }

      if (hasShipAt(i) === true || hasShipAt(i) === undefined) {
        reversePlacedBlocks(i, coords, addFactor);
        // Placment failed
        return "illegal";
      }
      board[i].ship = ship;
      ships.push(ship);
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
  const isAllSunk = () => !ships.some((ship) => ship.isSunk() === false);

  return { place, receiveAttack, isAllSunk, hasShipAt };
}
