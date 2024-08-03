const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



const gameboard = ['','','','','','','','',''];

let round = 1;
let firstPlayer = getFirstPlayer();
let currentPlayer = round === 1 ? getFirstPlayer() : getNextPlayer();
let isGameOver = false;

function getFirstPlayer() {
  return new Promise((resolve, reject) => {
    rl.question("Who should play first, X or O?", (answer) => {
      if (answer !== "X" && answer !== "O") reject(new Error('Invalid choice; you should pick either X or O'))
      else resolve(answer);
    })
  })
}

function updateGameboard(position) {
  gameboard[position] = currentPlayer === 'O' ? 'O' : 'X';
}

function getPosition() {
  const availablePositions = [1,2,3,4,5,6,7,8,9];
  let position = new Promise((resolve, reject) => {
    rl.question("What position would you like to create a mark on?", (answer) => {
      if (!(availablePositions.includes(answer))) reject(new Error('Invalid position. Please enter a number between 1 and 9'));
      else if (gameboard[answer]) reject(new Error('That position has already been marked. Please pick another position'));
      else resolve(answer);
    })
  });
  return parseInt(position) - 1;
}

function getNextPlayer() {
  return currentPlayer === 'O' ? 'X' : 'O';
}

function updateRound() {
  round++;
}

function checkIfGameOver() {
  if (checkForWin() || checkForDraw()) return true;
}

function checkForWin() {
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

function checkForDraw() {
  return gameboard.every(position => position !== '');
}

function displayGameboard() {
  console.log(gameboard);
}

function playGame(firstPlayer) {
  while (!isGameOver) {
    const position = getPosition();
    updateGameboard(position);
    displayGameboard();
    updateRound();
    isGameOver = checkIfGameOver();
  }
  console.log(`${currentPlayer} has won the match after ${round} rounds`);
}

playGame();

const playerX = {
  isMyTurn: false,
  mark: 'X',
};

const playerO = {
  isMyTurn: true,
  mark: 'O',
};