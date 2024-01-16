export function renderPlayerBoard(board) {
  const boardDiv = document.getElementById("playerBoard");
  boardDiv.textContent = "";

  board.getBoard().forEach((block, index) => {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block");
    blockElement.setAttribute("data-index", index);
    if (block.ship) blockElement.classList.add("ship");
    boardDiv.appendChild(blockElement);
  });
}

function toggleWonScreen(text) {
  const winScreen = document.getElementById("winScreenContainer");
  const winHeader = document.getElementById("winHeader");
  const resetButt = document.getElementById("resetGame");

  if (text === "player") winHeader.textContent = "YOU WIN!";
  else if (text === "computer") winHeader.textContent = "COMPUTER WINS!";

  resetButt.addEventListener("click", () => {
    window.location.reload();
  });

  winScreen.style.display = "flex";
}

function checkWin(game) {
  const isWon = game.isWon();
  if (isWon === "none") return console.log("zeeeewwwww");
  if (isWon === "player") return toggleWonScreen("player");
  return toggleWonScreen("computer");
}

export function renderComputerBoard(game) {
  const boardDiv = document.getElementById("computerBoard");
  boardDiv.textContent = "";

  game.computer.board.getBoard().forEach((block, index) => {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block");
    blockElement.setAttribute("data-index", index);

    blockElement.addEventListener("click", () => {
      const attack = game.player.attack(game.computer.board, index);
      if (attack === "illegal") return;
      if (attack === "hit") blockElement.classList.add("hit");
      else if (attack === "miss") blockElement.classList.add("miss");

      checkWin(game);

      const [blockIndex, computerAttack] = game.playComputer();
      const playerBlockElement = document.querySelector(
        `#playerBoard .block[data-index = '${blockIndex}']`
      );
      if (computerAttack === "hit") playerBlockElement.classList.add("hit");
      else if (computerAttack === "miss")
        playerBlockElement.classList.add("miss");

      checkWin(game);

      game.nextTurn();
    });

    boardDiv.appendChild(blockElement);
  });
}
