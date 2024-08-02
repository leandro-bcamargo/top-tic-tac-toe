
const gameboard = ['','','','','','','','',''];

let round = 1;
let firstPlayer = getFirstPlayer();
let currentPlayer = round === 1 ? getFirstPlayer() : getNextPlayer();

function getFirstPlayer() {
  const firstPlayer = prompt("Who should play first, X or O?");
  if (firstPlayer !== "X" && firstPlayer !== "O") throw new Error('Invalid choice; you should pick either X or O');

  return firstPlayer;
}

function updateGameboard(position) {
  gameboard[position] = currentPlayer === 'O' ? 'O' : 'X';
}

function getPosition() {
  const availablePositions = [1,2,3,4,5,6,7,8,9];
  const position = prompt("What position would you like to create a mark on?");
  if (!(availablePositions.includes(position.toString))) throw new Error('Invalid position. Please enter a number between 1 and 9');
  if (gameboard[position]) throw new Error('That position has already been marked. Please pick another position');
  return parseInt(position) - 1;
}

function getNextPlayer() {
  return currentPlayer === 'O' ? 'X' : 'O';
}

function updateRound() {
  round++;
}

function checkIfGameOver() {

}

function checkForWins() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let winningCombo of winningCombos) {
    if (winningCombo.every(position => gameboard[position] === currentPlayer)) return true;
  }

  return false;
}

function playGame(firstPlayer) {
  const position = getPosition();
  updateGameboard(position);
  updateRound();
  checkIfGameOver();
}

const playerX = {
  isMyTurn: false,
  mark: 'X',
};

const playerO = {
  isMyTurn: true,
  mark: 'O',
};