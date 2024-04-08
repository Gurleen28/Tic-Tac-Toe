// Game State Variables
let editedPlayer = 0;
const players = [
    {
        name: '',
        symbol: 'X'
    },
    {
        name: '',
        symbol: 'O'
    }
];
const cells = new Array(9);
for (let i = 0; i < cells.length; i++) { 
    cells[i] = {
        id: i,
        value: ''
    };
}


let gameStarted = false;
let activePlayer = 0;

// Overlay Elements
const configOverlayElement = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const formControlDiv = formElement.querySelector('div');
const errorOutputElement = document.getElementById('config-errors');

// Overlay Buttons
const editPlayer1Btn = document.getElementById('edit-player-1-button');
const editPlayer2Btn = document.getElementById('edit-player-2-button');
const cancelEditPlayerButton = document.getElementById('cancel-config-btn');

//  Add event listeners for config overlay
editPlayer1Btn.addEventListener('click', openPlayerConfig);
editPlayer2Btn.addEventListener('click', openPlayerConfig);
cancelEditPlayerButton.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);
formElement.addEventListener('submit', savePlayerConfig);

// Start game configuration button
const startGameButton = document.getElementById('start-new-game-button');
startGameButton.addEventListener('click', startNewGame);


// Active Game
const gameAreaElement = document.getElementById('active-game');
const gameStartErrorElement = document.getElementById('start-new-game-error');
const activePlayerNameElement = document.getElementById('active-player-name');
const gameOverElement = document.getElementById('game-over');
const winnerPlayerNameElement = document.getElementById('winner-name');
const turnInfoElement = document.querySelector('#active-game p');
const cellElements = Array.from(document.querySelectorAll('#game-board li'));

for (let i = 0; i < cellElements.length; i++) {
  cellElements[i].addEventListener('click', handleCellClick);
}
