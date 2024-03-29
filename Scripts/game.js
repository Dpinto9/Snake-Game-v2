// game.js

import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, setSnakeSpeed, getSnakeSpeed } from "./snake.js";
import { update as updateFood, draw as drawFood, score, scoreElement } from "./food.js";
import { outsideGrid, setGridSize } from "./grid.js";
import { getInputDirection } from "./input.js";

const gameBoard = document.getElementById('game-board');
const speedElement = document.getElementById('speed');

let lastRender = 0;
let gameOver = false;
let gameStarted = false;


// Entry function to start the game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        
        document.removeEventListener('keydown', startGameKeyPressHandler); 
        requestAnimationFrame(main);

    }
}

// Function to display entrance message and set up event listener for Enter key press
function showEntranceMessage() {
    gameBoard.innerHTML = '<div class="entrance-message"><img src="Assets/Imgs/logo.png"><p>Press "ENTER" to start</p></div>';
    document.addEventListener('keydown', startGameKeyPressHandler);
}

// Function to handle key press for starting the game and resetting the game
function startGameKeyPressHandler(event) {
    if (!gameStarted) {
        if (event.key === 'Enter') {
            document.removeEventListener('keydown', startGameKeyPressHandler);
            startGame();

            document.querySelectorAll('.buttons button').forEach(element => {
                element.style.display = 'none';
            });

        }
    }
}

// Display entrance message initially
showEntranceMessage();

function showGameOverMessage() {
    
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = 'Game Over';
    gameOverMessage.classList.add('game-over-message');
    gameBoard.appendChild(gameOverMessage);

    const finalScoreMessage = document.createElement('div');
    finalScoreMessage.textContent = `Score: ${score}`;
    finalScoreMessage.classList.add('final-score-message');
    gameBoard.appendChild(finalScoreMessage);

    // Add an event listener for the Enter key
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            location.reload();
        }
    });
}

// Main game loop
function main(currentTime) {
    if (gameOver) {
        showGameOverMessage();
        return;
    }
    requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRender) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRender = currentTime;

    update();
    draw();
}

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    adjustSnakeSpeed();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
    scoreElement.textContent = `Score: ${score}`;
    scoreElement.classList.add('top-element');
    speedElement.textContent = `Speed: ${getSnakeSpeed()}`;

}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function adjustSnakeSpeed() {
    if (score > 3 && getSnakeSpeed() === 7) {
        setSnakeSpeed(11);
    } else if (score > 2 && getSnakeSpeed() === 12) {
        setSnakeSpeed(16);
    }
}
