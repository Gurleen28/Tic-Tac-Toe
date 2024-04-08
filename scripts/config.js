/*
 * This file contains logic related to player configuration, which accesses and manipulates the 
 * HTML Elements of the page through their addresses stored in App.js.
 */

function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset['playerId']; //+{string} converts string to a number
  configOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
  document.getElementById('playername').value =
    players[editedPlayer - 1]['name'];
}

function closePlayerConfig() {
  configOverlayElement.style.display = 'none';
  backdrop.style.display = 'none';
  formControlDiv.classList.remove('error');
  errorOutputElement.textContent = '';
  document.getElementById('playername').value = '';
}

function savePlayerConfig(event) {
  event.preventDefault(); // default action: browser submits form data to server
  const formData = new FormData(event.target);
  let enteredPlayerName = formData.get('playername').trim();
  const isPlayerNameValid = validatePlayerName(enteredPlayerName);

  if (!isPlayerNameValid) {
    return;
  }

  // Capitalize the first letter of player name
  enteredPlayerName =
    enteredPlayerName.charAt(0).toUpperCase() + enteredPlayerName.slice(1);
  updatePlayerName(enteredPlayerName);
  closePlayerConfig();

  // No error message when starting game if both player names have been set
  if (players[0].name && players[1].name)
    gameStartErrorElement.style.display = 'none';
}

function validatePlayerName(playerName) {
  if (!playerName) {
    formControlDiv.classList.add('error');
    errorOutputElement.textContent =
      'Player name cannot be empty. Please enter a valid player name.';
    return false;
  } else {
    return true;
  }
}

function updatePlayerName(enteredPlayerName) {
  const playerDataElement = document.getElementById(
    'player-' + editedPlayer + '-data'
  );

  playerDataElement.querySelector('h3').textContent = enteredPlayerName;
  players[editedPlayer - 1]['name'] = enteredPlayerName;
}
