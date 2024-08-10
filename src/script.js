const cells = document.querySelectorAll("[data-cell]");

let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, {once: true})
})

function checkWin(player) {
  const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  return winPatterns.some(pattern => {
    return pattern.every(index => {
      console.log("cells[index]:", cells[index])
      return cells[index].textContent === player;
    })
  })
}

function resetBoard() {

}


function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);

  }
}
