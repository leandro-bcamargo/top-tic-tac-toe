
const gameboard = ['','','','','','','','',''];

function getFirstPlayer(firstPlayer) {
  if (firstPlayer == 'X') {
    playerX.isMyTurn = true;
    playerO.isMyTurn = false;
  } else if (firstPlayer == 'O') {
    playerO.isMyTurn = true;
    playerX.isMyTurn = false;
  }
}

function updateGameboard(position) {
  gameboard[position] = playerO.isMyTurn ? '0' : 'X';
}

function getPosition() {
  const availablePositions = [1,2,3,4,5,6,7,8,9];
  const position = prompt("What position would you like to create a mark on?");
  if (!(availablePositions.includes(position.toString))) throw new Error('Invalid position. Please enter a number between 1 and 9');
  if (gameboard[position]) throw new Error('That position has already been marked. Please pick another position');
  return parseInt(position);
}

function playGame(firstPlayer) {
  setFirstPlayer(firstPlayer);
  const position = getPosition();
  updateGameboard(position);
}

const playerX = {
  isMyTurn: false,
  mark: 'X',
};

const playerO = {
  isMyTurn: true,
  mark: 'O',
};