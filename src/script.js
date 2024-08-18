const cells = [...document.querySelectorAll("[data-cell]")];

let currentPlayer = "X";
let xScore = 0;
let oScore = 0;

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
    cell.addEventListener('click', (e) => {
      try {
        handleClick(e);
      } catch (error) {
        const result = document.querySelector("#result");
        result.textContent = error.message;
      }
    }, {once: true})
  })
}


function checkDraw() {
  return cells.every(cell => cell.textContent);
}

function switchCurrentPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleClick(e) {
  checkPlayers();
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    showWinner(currentPlayer);
    increaseScore(currentPlayer);
    setUpBoard();
  } else if (checkDraw()) {
    showDraw();
    setUpBoard();
  } else {
    switchCurrentPlayer();
  } 
}

function handleOkX() {
  const inputValue = document.querySelector("#player-x-input").value;
  const name = document.querySelector("#player-x-paragraph");
  name.textContent = `Player X: ${inputValue} --- Total Score: 0`;
}

function handleOkO() {
  const inputValue = document.querySelector("#player-o-input").value;
  const name = document.querySelector("#player-o-paragraph");
  name.textContent = `Player O: ${inputValue} --- Total Score: 0`;
}

function handleFirstPlayer(e) {
  const firstPlayer = e.target.textContent;
  currentPlayer = firstPlayer === 'X' ? 'X' : 'O';
}

function setUpEventListeners() {
  const okBtnPlayerX = document.querySelector("#ok-btn-x");
  const okBtnPlayerO = document.querySelector("#ok-btn-o");
  okBtnPlayerX.addEventListener('click', handleOkX);
  okBtnPlayerO.addEventListener('click', handleOkO);
  const oFirstBtn = document.querySelector("#o-first-btn");
  const xFirstBtn = document.querySelector("#x-first-btn");
  oFirstBtn.addEventListener('click', handleFirstPlayer, {once: true});
  xFirstBtn.addEventListener('click', handleFirstPlayer, {once: true});
}

function showWinner(player) {
  const result = document.querySelector("#result");
  const winnerName = document.querySelector(`#player-${player.toLowerCase()}-paragraph`).textContent.split(" ")[2];
  result.textContent = `${winnerName} has won!`;
}

function showDraw() {
  const result = document.querySelector("#result");
  result.textContent = "It's a draw!";
}

function checkPlayers() {
  const playerX = document.querySelector("#player-x-paragraph").textContent;
  const playerO = document.querySelector("#player-o-paragraph").textContent;
  if (!playerO || !playerX) {
    throw new Error("You must enter both player names before playing!");
  }
  clearResult();
}

function clearResult() {
  const result = document.querySelector("#result");
  result.textContent = "";
}

function increaseScore(player) {
  const name = document.querySelector(`#player-${player.toLowerCase()}-paragraph`);
  const arrLength = name.textContent.split(" ").length;
  const previousScore = Number(name.textContent.split(" ")[arrLength - 1]);
  const currentScore = previousScore + 1;
  name.textContent = name.textContent.split(" ").slice(0, arrLength - 1).join(" ") + " " + currentScore;
}

(() => {
    setUpBoard();
    setUpEventListeners();
    clearResult();
})();