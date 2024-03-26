// game.js

import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood, score, scoreElement } from "./food.js";
import { outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";

const gameBoard = document.getElementById('game-board');
let lastRender = 0;
let gameOver = false;
let gameStarted = false;


// Entry function to start the game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        // Remove the event listener for keydown once the game starts
        document.removeEventListener('keydown', startGameKeyPressHandler); // Adjusted here
        requestAnimationFrame(main);
        scoreElement.style.display = 'block';
    }
}

// Function to display entrance message and set up event listener for Enter key press
function showEntranceMessage() {
    gameBoard.innerHTML = '<div class="entrance-message">Press ENTER to start</div>';
    // Add an event listener to start the game when Enter key is pressed
    document.addEventListener('keydown', startGameKeyPressHandler);
}

// Function to handle key press for starting the game and resetting the game
function startGameKeyPressHandler(event) {
    if (!gameStarted) {
        if (event.key === 'Enter') {
            document.removeEventListener('keydown', startGameKeyPressHandler);
            startGame();
        }
    }
}

// Display entrance message initially
showEntranceMessage();

function showGameOverMessage() {
    scoreElement.style.display = 'none';
    
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
            // Reload the page when the Enter key is pressed
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
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
    scoreElement.textContent = `Score: ${score}`;
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
