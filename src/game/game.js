import { Computer, Player } from "@factories/player";

export function Game() {
  const player = Player();
  const computer = Computer();

  const setPlayerName = (name) => {
    player.name = name;
  };

  return { player, setPlayerName };
}
