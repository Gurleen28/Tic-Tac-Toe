/*
 * This file contains the game logic, which accesses and manipulates the game state data stored in App.js
 * and the HTML Elements of the page through their addresses stored in App.js.
 */

// Game Logic

function startNewGame() {
  if (!players[0].name || !players[1].name) {
    // Display error message: Please name both players first.
    gameStartErrorElement.style.display = 'block';
    return;
  }
  gameStarted = true;
  gameAreaElement.style.display = 'block';
  gameOverElement.style.display = 'none';
  turnInfoElement.style.display = 'block';

  resetGameState();
  updateActivePlayerName();
}

function handleCellClick(event) {
  if (!gameStarted) return;
  const selectedCellElement = event.target;

  if (selectedCellElement.classList.contains('disabled')) return;

  const activePlayerSymbol = players[activePlayer].symbol;
  const cellNumber = cellElements.indexOf(selectedCellElement);
  cells[cellNumber].value = activePlayerSymbol;
  selectedCellElement.textContent = activePlayerSymbol;
  selectedCellElement.classList.add('disabled');

  let winner = checkWinner();

  if (!winner) {
    activePlayer = 1 - activePlayer; // Toogle active player
    updateActivePlayerName();
  } else {
    gameStarted = false;
    gameOver(winner);
  }
}

function updateActivePlayerName() {
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function resetGameState() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].value = '';
  }

  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].textContent = '';
    cellElements[i].classList.remove('disabled');
  }
  activePlayer = 0;
  gameOverElement.style.display = 'none';
}

function checkWinner() {
  // Check if there are winners
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      cells[i].value &&
      cells[i].value === cells[i + 3].value &&
      cells[i].value === cells[i + 6].value
    ) {
      const winner = cells[i].value;
      return winner;
    }
  }

  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (
      cells[i].value &&
      cells[i].value === cells[i + 1].value &&
      cells[i].value === cells[i + 2].value
    ) {
      const winner = cells[i].value;
      return winner;
    }
  }

  // Check diagonals
  if (
    cells[0].value &&
    cells[0].value === cells[4].value &&
    cells[0].value === cells[8].value
  ) {
    const winner = cells[0].value;
    return winner;
  }
  if (
    cells[2].value &&
    cells[2].value === cells[4].value &&
    cells[2].value === cells[6].value
  ) {
    const winner = cells[2].value;
    return winner;
  }

  // Check if there are empty cells left on the gameboard
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].value) {
      return '';
    }
  }

  return 'DRAW';
}

function gameOver(winner) {
  // Disable game cells
  for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].classList.add('disabled');
  }

  if (winner === 'DRAW') {
    gameOverElement.style.display = 'block';
    gameOverElement.children[0].style.display = 'none';
    gameOverElement.children[1].style.display = 'block';
    turnInfoElement.style.display = 'none';
    return;
  }

  // Display game over with winner message
  if (winner === players[0].symbol) {
    winner = players[0].name;
  } else if (winner === players[1].symbol) {
    winner = players[1].name;
  }

  winnerPlayerNameElement.textContent = winner;
  gameOverElement.style.display = 'block';
  gameOverElement.children[0].style.display = 'block';
  gameOverElement.children[1].style.display = 'none';
  turnInfoElement.style.display = 'none';
}
