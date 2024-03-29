import { describe, beforeEach, test, expect } from "vitest";
import Gameboard from "@factories/gameboard";

let myGameBoard;
beforeEach(() => {
  myGameBoard = Gameboard();
});

describe("Placing tests", () => {
  test("places a ship on y", () => {
    expect(myGameBoard.place(0, 2, "y")).toBe("placed");
    expect(myGameBoard.hasShipAt(0)).toBe(true);
    expect(myGameBoard.hasShipAt(10)).toBe(true);
    expect(myGameBoard.hasShipAt(2)).toBe(false);
  });

  test("places a ship on x", () => {
    expect(myGameBoard.place(0, 2, "x")).toBe("placed");
    expect(myGameBoard.hasShipAt(0)).toBe(true);
    expect(myGameBoard.hasShipAt(1)).toBe(true);
    expect(myGameBoard.hasShipAt(2)).toBe(false);
  });

  test("handles illegal placement", () => {
    expect(myGameBoard.place(101, 3)).toBe("illegal");
    expect(myGameBoard.place(-1, 3)).toBe("illegal");
  });

  test("handles placing in the same place", () => {
    myGameBoard.place(11, 3);
    expect(myGameBoard.place(11, 3)).toBe("illegal");
    expect(myGameBoard.place(12, 3)).toBe("illegal");
  });

  test("quick test", () => {
    expect(myGameBoard.isLegalPlacement(18, 2, "x")).toBe(true);
    expect(myGameBoard.place(18, 2, "x")).toBe("placed");
  });

  test("handles placing ships next to other ships", () => {
    expect(myGameBoard.place(12, 3, "x")).toBe("placed");
    expect(myGameBoard.place(16, 3, "y")).toBe("placed");

    // Right x
    expect(myGameBoard.place(15, 3, "x")).toBe("illegal");
    // Left x
    expect(myGameBoard.place(11, 3, "x")).toBe("illegal");
    // Bellow x
    expect(myGameBoard.place(21, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(22, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(23, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(24, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(25, 3, "x")).toBe("illegal");
    // Above x
    expect(myGameBoard.place(1, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(2, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(3, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(4, 3, "x")).toBe("illegal");
    expect(myGameBoard.place(5, 3, "x")).toBe("illegal");
    // Right y
    expect(myGameBoard.place(7, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(17, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(27, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(37, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(47, 3, "y")).toBe("illegal");
    // Left y
    expect(myGameBoard.place(5, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(15, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(25, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(35, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(45, 3, "y")).toBe("illegal");
    // Bellow y
    expect(myGameBoard.place(46, 3, "y")).toBe("illegal");
    // Above y
    expect(myGameBoard.place(6, 3, "y")).toBe("illegal");
  });

  test("handles intersecting ships", () => {
    myGameBoard.place(11, 3);
    expect(myGameBoard.place(1, 3, "y")).toBe("illegal");
    expect(myGameBoard.hasShipAt(1)).toBe(false);
  });

  test("handles adding to the edges", () => {
    expect(myGameBoard.place(99, 3, "y")).toBe("illegal");
    expect(myGameBoard.place(19, 3, "x")).toBe("illegal");
    expect(myGameBoard.hasShipAt(19)).toBe(false);
  });
});

describe("receiveAttack tests", () => {
  test("receives attack on ship", () => {
    expect(myGameBoard.place(0, 1, "x")).toBe("placed");
    expect(myGameBoard.receiveAttack(0)).toBe("hit");
  });

  test("receives attack on empty block", () => {
    expect(myGameBoard.place(1, 3, "x")).toBe("placed");
    expect(myGameBoard.receiveAttack(4)).toBe("miss");
  });

  test("can't hit a place already hit", () => {
    myGameBoard.place(1, 3, "x");
    myGameBoard.receiveAttack(1);
    myGameBoard.receiveAttack(11);
    expect(myGameBoard.receiveAttack(1)).toBe("illegal");
    expect(myGameBoard.receiveAttack(11)).toBe("illegal");
  });

  test("most of the ships sunk", () => {
    myGameBoard.place(1, 3, "x");
    myGameBoard.place(11, 3, "y");
    myGameBoard.place(50, 2, "y");

    myGameBoard.receiveAttack(1);
    myGameBoard.receiveAttack(2);
    myGameBoard.receiveAttack(3);
    myGameBoard.receiveAttack(11);
    myGameBoard.receiveAttack(21);
    myGameBoard.receiveAttack(31);
    myGameBoard.receiveAttack(50);

    expect(myGameBoard.isAllSunk()).toBe(false);
  });

  test("all ships sunk", () => {
    myGameBoard.place(1, 3, "x");
    myGameBoard.place(11, 3, "y");
    myGameBoard.place(50, 2, "y");

    myGameBoard.receiveAttack(1);
    myGameBoard.receiveAttack(2);
    myGameBoard.receiveAttack(3);
    myGameBoard.receiveAttack(11);
    myGameBoard.receiveAttack(21);
    myGameBoard.receiveAttack(31);
    myGameBoard.receiveAttack(50);
    myGameBoard.receiveAttack(60);

    expect(myGameBoard.isAllSunk()).toBe(true);
  });
});
