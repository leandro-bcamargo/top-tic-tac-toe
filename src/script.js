const readline = require('readline/promises');

const {stdin: input, stdout: output} = require('node:process');

const rl = readline.createInterface({input, output});

const gameboard = ['','','','','','','','',''];

let round = 1;

let firstPlayer;

(async () => {
  firstPlayer = await getFirstPlayer();
})();

async function getFirstPlayer() {
  try {
    const answer = await rl.question("Who should play first, X or O?");
    if (answer !== 'X' && answer !== 'O') {
      throw new Error('Invalid choice: you should pick either X or O.');
    }
    return answer;
  } catch(error) {
    console.log(error.message);
  } finally {
    rl.close();
  }
}

let currentPlayer;

(async () => {
  currentPlayer = await getCurrentPlayer();
})

async function getCurrentPlayer() {
  let currentPlayer;
  if (round === 1) {
    currentPlayer = await getFirstPlayer();
  } else {
    currentPlayer = getNextPlayer();
  }
  return currentPlayer;
}

let isGameOver = false;

function updateGameboard(position) {
  gameboard[position] = currentPlayer === 'O' ? 'O' : 'X';
}

async function getPosition() {
  const availablePositions = [1,2,3,4,5,6,7,8,9];
  try {
    const position = await rl.question("What position would you like to create a mark on?");
    if (!(availablePositions.includes(answer))) {
      throw new Error('Invalid position. Please enter a number between 1 and 9');
    } else if (gameboard[answer]) {
      throw new Error('That position has already been marked. Please pick another position');
    };
    return parseInt(position) - 1;
  } catch (error) {
    console.log(error.message);
  } finally {
    rl.close();
  }
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

async function playGame(firstPlayer) {
  while (!isGameOver) {
    const position = await getPosition();
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