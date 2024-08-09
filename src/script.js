const cells = document.querySelectorAll("[data-cell]");

let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, {once: true})
})


function handleClick(e) {

}

