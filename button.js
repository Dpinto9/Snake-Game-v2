// buttons.js
import { setSnakeSpeed, getSnakeSpeed } from "./snake.js";
import { setGridSize } from "./grid.js";

const speedElement = document.getElementById('speed'); // get the speed element
const slowButton = document.getElementById('slow');
const fastButton = document.getElementById('fast');
const normalButton = document.getElementById('normal');
const bigButton = document.getElementById('big');

const gameBoard = document.getElementById('game-board');

slowButton.addEventListener('click', function() {
    setSnakeSpeed(7);
    speedElement.textContent = `Speed: ${getSnakeSpeed()}`;
});

fastButton.addEventListener('click', function() {
    setSnakeSpeed(12);
    speedElement.textContent = `Speed: ${getSnakeSpeed()}`;
});

normalButton.addEventListener('click', function() {
    setGridSize(21, gameBoard);
    gameBoard.classList.remove('big-grid');
});

bigButton.addEventListener('click', function() {
    setGridSize(31, gameBoard);
    gameBoard.classList.add('big-grid');
});