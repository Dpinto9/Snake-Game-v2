// game.js

import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
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
    }
}

// Function to display entrance message and set up event listener for Enter key press
function showEntranceMessage() {
    gameBoard.innerHTML = '<div class="entrance-message">Press ENTER to start</div>';
    // Add an event listener to start the game when Enter key is pressed
    document.addEventListener('keydown', startGameKeyPressHandler);
}

// Function to handle key press for starting the game
function startGameKeyPressHandler(event) {
    const resetKeys = ['Enter', 'R']; // Define keys that reset the game (e.g., Enter and R)
    if (resetKeys.includes(event.key)) { // Check if the pressed key is in the resetKeys array
        document.removeEventListener('keydown', startGameKeyPressHandler);
        if (gameOver) {
            resetGame(); // Reset the game if it's over
        } else {
            startGame();
        }
    }
}

// Function to reset the game state
function resetGame() {
    gameOver = false;
    gameStarted = false;
    gameBoard.innerHTML = ''; // Clear the game board
    // Reset any other game state variables if necessary
    // Call functions to set up the game again (e.g., displaying entrance message)
    showEntranceMessage();
}

// Display entrance message initially
showEntranceMessage();

// Function to display the game over message
function showGameOverMessage() {
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = 'Game Over';
    gameOverMessage.classList.add('game-over-message');
    gameBoard.appendChild(gameOverMessage);
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
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
