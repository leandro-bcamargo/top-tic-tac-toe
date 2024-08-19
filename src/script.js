const cells = [...document.querySelectorAll("[data-cell]")];
let currentPlayer = "X";
let gameActive = true;
const players = { X: { name: "", score: 0 }, O: { name: "", score: 0 } };

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWin(player) {
  return winPatterns.some(pattern => 
    pattern.every(index => cells[index].textContent === player)
  );
}

function setUpBoard() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener('click', handleClick, { once: true });
  });
  gameActive = true;
  updateResultDisplay("");
}

function checkDraw() {
  return cells.every(cell => cell.textContent !== "");
}

function switchCurrentPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleClick(e) {
  if (!gameActive) return;
  
  try {
    checkPlayers();
    const cell = e.target;
    cell.textContent = currentPlayer;
    
    if (checkWin(currentPlayer)) {
      endGame(false);
    } else if (checkDraw()) {
      endGame(true);
    } else {
      switchCurrentPlayer();
    }
  } catch (error) {
    updateResultDisplay(error.message);
  }
}

function endGame(isDraw) {
  gameActive = false;
  if (isDraw) {
    showDraw();
  } else {
    showWinner(currentPlayer);
    increaseScore(currentPlayer);
  }
  setTimeout(setUpBoard, 2000);
}

function handlePlayerNameInput(player) {
  const inputValue = document.querySelector(`#player-${player.toLowerCase()}-input`).value;
  players[player].name = inputValue;
  updatePlayerDisplay(player);
}

function handleFirstPlayer(player) {
  currentPlayer = player;
}

function setUpEventListeners() {
  document.querySelector("#ok-btn-x").addEventListener('click', () => handlePlayerNameInput("X"));
  document.querySelector("#ok-btn-o").addEventListener('click', () => handlePlayerNameInput("O"));
  document.querySelector("#o-first-btn").addEventListener('click', () => handleFirstPlayer("O"));
  document.querySelector("#x-first-btn").addEventListener('click', () => handleFirstPlayer("X"));
}

function updatePlayerDisplay(player) {
  console.log("player:", player)
  const playerName = document.querySelector(`.player-${player.toLowerCase()}-name`);
  const playerType = document.querySelector(`.player-${player.toLowerCase()}-type`);
  const playerScore = document.querySelector(`.player-${player.toLowerCase()}-score`);

  playerName.textContent = players[player].name;
  playerType.textContent = `Player ${player}`;
  playerScore.textContent = `Score: ${players[player].score}`;
}

function showWinner(player) {
  updateResultDisplay(`${players[player].name} has won!`);
}

function showDraw() {
  updateResultDisplay("It's a draw!");
}

function checkPlayers() {
  if (!players.X.name || !players.O.name) {
    throw new Error("You must enter both player names before playing!");
  }
}

function updateResultDisplay(message) {
  document.querySelector("#result").textContent = message;
}

function increaseScore(player) {
  players[player].score++;
  updatePlayerDisplay(player);
}

(() => {
  setUpBoard();
  setUpEventListeners();
})();