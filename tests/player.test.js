import { describe, test, expect } from "vitest";
import { Player, Computer } from "@factories/player";
import { beforeEach } from "vitest";

describe("Player tests", () => {
  let player;
  let enemy;

  beforeEach(() => {
    player = Player();
    enemy = Computer();
  });

  test("Player attacks enemy ships", () => {
    enemy.board.place(1, 3);
    expect(player.attack(enemy.board, 2)).toBe("hit");
  });

  test("Player attacks empty block", () => {
    expect(player.attack(enemy.board, 2)).toBe("miss");
  });
});
