import { describe, beforeEach, test, expect } from "vitest";
import Gameboard from "../src/factories/gameboard";

let myGameBoard;
beforeEach(() => {
  myGameBoard = Gameboard();
});

describe("Placing tests", () => {
  test("places a ship on y", () => {
    expect(myGameBoard.place(50, 2, "y")).toBe(true);
    expect(myGameBoard.hasShipAt(60)).toBe(true);
    expect(myGameBoard.hasShipAt(70)).toBe(false);
  });

  test("places a ship on x", () => {
    expect(myGameBoard.place(23, 2, "x")).toBe(true);
    expect(myGameBoard.hasShipAt(24)).toBe(true);
    expect(myGameBoard.hasShipAt(25)).toBe(false);
  });

  test("handles illegal placement", () => {
    expect(myGameBoard.place(101, 3)).toBe(false);
    expect(myGameBoard.place(-1, 3)).toBe(false);
  });

  test("handles placing in the same place", () => {
    myGameBoard.place(11, 3);
    expect(myGameBoard.place(11, 3)).toBe(false);
    expect(myGameBoard.place(12, 3)).toBe(false);
  });

  test("handles placing ships next to other ships", () => {
    expect(myGameBoard.place(12, 3, "x")).toBe(true);
    expect(myGameBoard.place(16, 3, "y")).toBe(true);

    // Right x
    expect(myGameBoard.place(15, 3, "x")).toBe(false);
    // Left x
    expect(myGameBoard.place(11, 3, "x")).toBe(false);
    // Bellow x
    expect(myGameBoard.place(21, 3, "x")).toBe(false);
    expect(myGameBoard.place(22, 3, "x")).toBe(false);
    expect(myGameBoard.place(23, 3, "x")).toBe(false);
    expect(myGameBoard.place(24, 3, "x")).toBe(false);
    expect(myGameBoard.place(25, 3, "x")).toBe(false);
    // Above x
    expect(myGameBoard.place(1, 3, "x")).toBe(false);
    expect(myGameBoard.place(2, 3, "x")).toBe(false);
    expect(myGameBoard.place(3, 3, "x")).toBe(false);
    expect(myGameBoard.place(4, 3, "x")).toBe(false);
    expect(myGameBoard.place(5, 3, "x")).toBe(false);
    // Right y
    expect(myGameBoard.place(7, 3, "y")).toBe(false);
    expect(myGameBoard.place(17, 3, "y")).toBe(false);
    expect(myGameBoard.place(27, 3, "y")).toBe(false);
    expect(myGameBoard.place(37, 3, "y")).toBe(false);
    expect(myGameBoard.place(47, 3, "y")).toBe(false);
    // Left y
    expect(myGameBoard.place(5, 3, "y")).toBe(false);
    expect(myGameBoard.place(15, 3, "y")).toBe(false);
    expect(myGameBoard.place(25, 3, "y")).toBe(false);
    expect(myGameBoard.place(35, 3, "y")).toBe(false);
    expect(myGameBoard.place(45, 3, "y")).toBe(false);
    // Bellow y
    expect(myGameBoard.place(46, 3, "y")).toBe(false);
    // Above y
    expect(myGameBoard.place(6, 3, "y")).toBe(false);
  });

  test("handles intersecting ships", () => {
    myGameBoard.place(11, 3);
    expect(myGameBoard.place(1, 3, "y")).toBe(false);
    expect(myGameBoard.hasShipAt(1)).toBe(false);
  });

  test("handles adding to the edges", () => {
    expect(myGameBoard.place(100, 3, "y")).toBe(false);
    expect(myGameBoard.place(10, 3, "x")).toBe(false);
  });
});

describe("receiveAttack tests", () => {
  test("receives attack on ship", () => {
    myGameBoard.place(1, 3, "x");
    expect(myGameBoard.receiveAttack(1)).toBe(true);
  });

  test("receives attack on empty block", () => {
    myGameBoard.place(1, 3, "x");
    expect(myGameBoard.receiveAttack(4)).toBe(false);
  });

  test("can't hit a place already hit", () => {
    myGameBoard.place(1, 3, "x");
    myGameBoard.receiveAttack(1);
    myGameBoard.receiveAttack(11);
    expect(myGameBoard.receiveAttack(1)).toBe(false);
    expect(myGameBoard.receiveAttack(11)).toBe(false);
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
