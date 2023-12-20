import { test, expect } from "vitest";
import Ship from "../src/factories/ship";

const myShip = Ship(4);

test("ship hit() function", () => {
  expect(myShip.hit()).toBe(1);
});

test("ship not sunk yet from 2 hits", () => {
  expect(myShip.isSunk()).toBe(false);
});

test("ship sinks after 4 hits", () => {
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});
