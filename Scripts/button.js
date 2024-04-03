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
        const parentDiv = this.parentNode;
       
        const selectedButtonInSameDiv = parentDiv.querySelector('.selected');

        if (selectedButtonInSameDiv && selectedButtonInSameDiv !== this) {
            selectedButtonInSameDiv.classList.remove('selected');
        }

        this.classList.add('selected');

        selectedButtons = Array.from(document.querySelectorAll('.selected'));
    });
});

document.getElementById('slow').classList.add('selected');
document.getElementById('normal').classList.add('selected');

selectedButtons = Array.from(document.querySelectorAll('.selected'));


slowButton.addEventListener('click', function() {
    setSnakeSpeed(10);
    speedElement.textContent = `Speed: ${getSnakeSpeed()}`;
});

fastButton.addEventListener('click', function() {
    setSnakeSpeed(15);
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


// Extra Skins Button
document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.extra button');
    const skin = document.querySelector('.skins');

    let isVisible = false;

    button.addEventListener('click', function() {
        if (isVisible) {
            skin.style.animation = 'none'; 
            setTimeout(() => { 
                skin.style.top = '-43vmin'; 
            }, 500);
        } else {
            skin.style.top = '25%';
            skin.style.animation = 'bounce 2s ease forwards'; //
        }
        isVisible = !isVisible; 
    });
});