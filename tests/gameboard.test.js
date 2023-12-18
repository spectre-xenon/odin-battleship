import { describe, beforeEach, test, expect } from "vitest";
import Gameboard from "../src/lib/gameboard";

describe("Placing tests", () => {
  let myGameBoard;
  beforeEach(() => {
    myGameBoard = Gameboard();
  });

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
