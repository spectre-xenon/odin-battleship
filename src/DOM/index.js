import {
  renderPlacementBarebones,
  renderPlacementBoard,
} from "@DOM/renderPlacement";
import { renderComputerBoard, renderPlayerBoard } from "@DOM/renderBoard";

function initPlayButt(game, playerName) {
  document.getElementById("playButt").addEventListener("click", () => {
    if (game.player.board.getPlacableShipLength() !== 0) return;
    document.getElementById("playerName").textContent = playerName;
    renderPlayerBoard(game.player.board);
    game.computer.generateBoard();
    renderComputerBoard(game);
    document.getElementById("dialog").style.display = "none";
  });
}

export function initDOM(game) {
  document.getElementById("placeShipsButt").addEventListener("click", () => {
    let name;
    const nameInput = document.getElementById("nameInput");
    if (nameInput.value === "") name = "Player";
    else name = nameInput.value;
    game.setPlayerName(name);
    renderPlacementBarebones(game.player.board, name);
    initPlayButt(game, name);
    renderPlacementBoard(game.player.board);
  });
}
