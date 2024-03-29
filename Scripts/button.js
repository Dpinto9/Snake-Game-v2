// buttons.js
import { setSnakeSpeed, getSnakeSpeed } from "./snake.js";
import { setGridSize } from "./grid.js";

const speedElement = document.getElementById('speed'); 
const slowButton = document.getElementById('slow');
const fastButton = document.getElementById('fast');
const normalButton = document.getElementById('normal');
const bigButton = document.getElementById('big');

const gameBoard = document.getElementById('game-board');

const buttons = document.querySelectorAll('.buttons button');



let selectedButtons = [];

buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the parent div of the clicked button
        const parentDiv = this.parentNode;

        // Get the currently selected button in the same div
        const selectedButtonInSameDiv = parentDiv.querySelector('.selected');

        // If there is a selected button in the same div and it's not the clicked button, deselect it
        if (selectedButtonInSameDiv && selectedButtonInSameDiv !== this) {
            selectedButtonInSameDiv.classList.remove('selected');
        }

        // Select the clicked button
        this.classList.add('selected');

        // Update the selectedButtons array
        selectedButtons = Array.from(document.querySelectorAll('.selected'));
    });
});

// Set default selected buttons
document.getElementById('slow').classList.add('selected');
document.getElementById('normal').classList.add('selected');

// Update the selectedButtons array with the default selected buttons
selectedButtons = Array.from(document.querySelectorAll('.selected'));


// Buttons functions
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