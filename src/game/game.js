import { Computer, Player } from "@factories/player";

export function Game() {
  const player = Player();
  const computer = Computer();
  let turn = "player";

  const setPlayerName = (name) => {
    player.name = name;
  };

  const getTurn = () => turn;

  const nextTurn = () => {
    if (turn === "player") turn = "computer";
    else turn = "player";
  };

  const isWon = () => {
    const isPlayerWon = computer.board.isAllSunk();
    const isComputerWon = player.board.isAllSunk();
    if (isPlayerWon) return "player";
    else if (isComputerWon) return "computer";
    else return "none";
  };

  const playComputer = () => computer.attack(player.board);

  return {
    player,
    computer,
    setPlayerName,
    getTurn,
    nextTurn,
    playComputer,
    isWon,
  };
}
