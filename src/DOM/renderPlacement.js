/* eslint no-use-before-define: "off" */
let axisX = true;

export function renderPlacementBarebones(board) {
  const dialog = document.getElementById("dialog");
  const template = document.getElementById("placementTemplate");

  dialog.textContent = "";
  dialog.innerHTML = template.innerHTML;

  document.getElementById("rotateButt").addEventListener("click", () => {
    axisX = !axisX;
  });

  document.getElementById("resetButt").addEventListener("click", () => {
    board.shipBlocks.forEach((block) => {
      block.ship = false;
    });
    board.populatePlacableShips();
    renderPlacementBoard(board);
  });
}

export function renderPlacementBoard(board) {
  const boardDiv = document.getElementById("placementBoard");
  boardDiv.textContent = "";

  board.getBoard().forEach((block, index) => {
    const blockElement = document.createElement("div");
    blockElement.classList.add("block");
    blockElement.setAttribute("data-index", index);

    if (block.hit === true) {
      if (block.ship) blockElement.classList.add("hit");
      else blockElement.classList.add("miss");
    } else if (block.ship) blockElement.classList.add("ship");

    boardDiv.appendChild(blockElement);
    addPlacementEventListener(board, block, index, blockElement);
  });
}

function addPlacementEventListener(board, block, index, blockElements) {
  const blockElement = blockElements;
  const coords = index;

  const illegalX = {
    9: true,
    19: true,
    29: true,
    39: true,
    49: true,
    59: true,
    69: true,
    79: true,
    89: true,
    99: true,
  };
  const illegalY = {
    90: true,
    91: true,
    92: true,
    93: true,
    94: true,
    95: true,
    96: true,
    97: true,
    98: true,
    99: true,
  };

  blockElement.addEventListener("mouseover", (ev) => {
    if (board.getPlacableShipLength() === 0) return;
    if (block.ship) return;
    const length = board.getPlacableShipLength();
    const axis = axisX ? "x" : "y";
    const addFactor = axis === "x" ? 1 : 10;
    const isLegalPlacement = board.isLegalPlacement(coords, length, axis);
    for (let i = coords; i < coords + length * addFactor; i += addFactor) {
      if (board.hasShipAt(i)) return;
      const currentElement = document.querySelector(
        `.block[data-index = "${i}"]`
      );
      if (isLegalPlacement) {
        currentElement.classList.add("ship");
      } else currentElement.classList.add("hit");

      if (axis === "x" && illegalX[i]) return;
      if (axis === "y" && illegalY[i]) return;
    }
  });

  blockElement.addEventListener("mouseout", (ev) => {
    if (board.getPlacableShipLength() === 0) return;
    if (block.ship) return;
    const length = board.getPlacableShipLength();
    const axis = axisX ? "x" : "y";
    const addFactor = axis === "x" ? 1 : 10;
    for (let i = coords; i < coords + length * addFactor; i += addFactor) {
      if (board.hasShipAt(i)) return;
      const currentElement = document.querySelector(
        `.block[data-index = "${i}"]`
      );
      currentElement.classList.remove("ship");
      currentElement.classList.remove("hit");
      if (axis === "x" && illegalX[i]) return;
      if (axis === "y" && illegalY[i]) return;
    }
  });

  blockElement.addEventListener("mousedown", (ev) => {
    if (board.getPlacableShipLength() === 0) return;
    if (block.ship) return;
    const length = board.getPlacableShipLength();
    const axis = axisX ? "x" : "y";
    const isLegalPlacement = board.isLegalPlacement(coords, length, axis);
    if (isLegalPlacement === false) return;
    board.place(coords, length, axis);
    board.shiftPlacableShipLength();
    renderPlacementBoard(board);
  });
}
