const readline = require('readline/promises');

const {stdin: input, stdout: output} = require('node:process');

const gameboard = ['','','','','','','','',''];

let round = 1;

let currentPlayer;

async function getFirstPlayer(rl) {
  try {
    const answer = (await rl.question("Who should play first, X or O?\n")).toUpperCase();
    if (answer !== 'X' && answer !== 'O') {
      throw new Error('Invalid choice: you should pick either X or O.');
    }
    return answer;
  } catch(error) {
    console.log(error.message);
  }
}

async function getCurrentPlayer(rl) {
  if (round === 1) {
    currentPlayer = await getFirstPlayer(rl);
  } else {
    currentPlayer = getNextPlayer();
  }
  return currentPlayer;
}

let isGameOver = false;

function updateGameboard(position, currentPlayer) {
  gameboard[position] = currentPlayer === 'O' ? 'O' : 'X';
}

async function getPosition(rl) {
  const availablePositions = [1,2,3,4,5,6,7,8,9];
  try {
    const position = Number(await rl.question("What position would you like to create a mark on? Choose from 1 to 9.\n"));
    if (!(availablePositions.includes(position))) {
      throw new Error('Invalid position. Please enter a number between 1 and 9.\n');
    } else if (gameboard[position-1]) {
      throw new Error('That position has already been marked. Please pick another position.\n');
    };
    return parseInt(position) - 1;
  } catch (error) {
    console.log(error.message);
  } 
}

function getNextPlayer() {
  return currentPlayer === 'O' ? 'X' : 'O';
}

function updateRound() {
  round++;
}

function checkIfGameOver(currentPlayer) {
  if (checkForWin(currentPlayer) || checkForDraw()) return true;
}

function checkForWin(currentPlayer) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  return winningCombos.some(winningCombo => winningCombo.every(position => gameboard[position] === currentPlayer));
}

function checkForDraw() {
  return gameboard.every(position => position !== '');
}

function displayGameboard() {
  let formattedGameboard = [];
  for (let i = 0; i < gameboard.length; i+=3) {
    formattedGameboard.push(gameboard.slice(i, i+3))
  }

  console.log(formattedGameboard);
}

async function playGame() {
  const rl = readline.createInterface({input, output});
  try {
    while (!isGameOver) {
      currentPlayer = await getCurrentPlayer(rl);
      const position = await getPosition(rl);
      updateGameboard(position, currentPlayer);
      displayGameboard();
      updateRound();
      isGameOver = checkIfGameOver(currentPlayer);
    }
    console.log(`${currentPlayer} has won the match after ${round} rounds`);
  } catch (error) {
    console.log(error.message);
  } finally {
  rl.close();
  }
}

(async () => {
  await playGame();
})();

const playerX = {
  isMyTurn: false,
  mark: 'X',
};

const playerO = {
  isMyTurn: true,
  mark: 'O',
};