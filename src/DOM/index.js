import {
  renderPlacementBarebones,
  renderPlacementBoard,
} from "@DOM/renderPlacement";

export function initDOM(setPlayerName, board) {
  document.getElementById("placeShipsButt").addEventListener("click", () => {
    let name;
    const nameInput = document.getElementById("nameInput");
    if (nameInput.value === "") name = "Player";
    else name = nameInput.value;
    setPlayerName(name);
    renderPlacementBarebones(board);
    renderPlacementBoard(board);
  });
}
