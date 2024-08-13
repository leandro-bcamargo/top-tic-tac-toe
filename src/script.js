const cells = [...document.querySelectorAll("[data-cell]")];

let currentPlayer;

function setStartingPlayer() {
  let startingPlayer = prompt("Who should play first, X or O?").toUpperCase();
  while (startingPlayer !== "X" && startingPlayer !== "O") {
    startingPlayer = prompt("Invalid choice. Please select either X or O").toUpperCase();
  }
  currentPlayer = startingPlayer;
}

function checkWin(player) {
  const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  return winPatterns.some(pattern => {
    return pattern.every(index => {
      return cells[index].textContent === player;
    })
  })
}

function setUpBoard() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener('click', handleClick, {once: true}
    )
  })
  setStartingPlayer();
}

function checkDraw() {
  return cells.every(cell => cell.textContent);
}

function switchCurrentPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    setUpBoard();
  } else if (checkDraw()) {
    alert("It's a draw!")
    setUpBoard();
  } else {
    switchCurrentPlayer();
  }
}

function handleOkX() {
  const inputValue = document.querySelector("#player-x").value;
  const name = document.querySelector(".player-name-x");
  name.textContent = `${inputValue} (X)`;
}

function handleOkO() {
  const inputValue = document.querySelector("#player-o").value;
  const name = document.querySelector(".player-name-o");
  name.textContent = `${inputValue} (O)`;
}

function setUpEventListeners() {
  const okBtnPlayerX = document.querySelector("#ok-btn-x");
  const okBtnPlayerO = document.querySelector("#ok-btn-o");
  okBtnPlayerX.addEventListener('click', handleOkX);
  okBtnPlayerO.addEventListener('click', handleOkO);
}

(() => {
  setUpBoard();
  setUpEventListeners();
})();