// game.js
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, setSnakeSpeed, getSnakeSpeed } from "./snake.js";
import { update as updateFood, draw as drawFood, score, scoreElement, highScore, highElement, addNewFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { playAudio } from "./audio.js";

const gameBoard = document.getElementById('game-board');
const speedElement = document.getElementById('speed');

let lastRender = 0;
let gameOver = false;
let gameStarted = false;


function startGame() {
    if (!gameStarted) {
        gameStarted = true;

        document.removeEventListener('keydown', startGameKeyPressHandler); 
        requestAnimationFrame(main);

    }
}

function showEntranceMessage() {
    gameBoard.innerHTML = '<div class="entrance-message"><img src="Assets/Imgs/logo.png"><p>Snake Game</p></div>';

    const pressEnter = document.createElement('div');
    pressEnter.textContent = '*Press "ENTER" to start*';
    pressEnter.classList.add('pressEnter');
    gameBoard.appendChild(pressEnter);
    
    const highScores = document.createElement('div');
    highScores.textContent = ` -- HighScore Pessoal: ${highScore} --`;
    highScores.classList.add('highScores');
    gameBoard.appendChild(highScores);


    document.addEventListener('keydown', startGameKeyPressHandler);
}

function startGameKeyPressHandler(event) {
    if (!gameStarted) {
        if (event.key === 'Enter') {
            document.removeEventListener('keydown', startGameKeyPressHandler);
            startGame();

            playAudio("start");

            document.querySelectorAll('.buttons button').forEach(element => {
                element.style.display = 'none';
            });

        }
    }
}

showEntranceMessage();

function showGameOverMessage() {

    const head = document.getElementsByClassName("snake-head")[0];
    if (head) {
        head.style.display = 'none';
    }

    const bodies = document.querySelectorAll(".snake, .snake-tail");
    for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        body.style.animationPlayState = 'paused';
    }

    playAudio("gameover");
    
    const gameOverMessage = document.createElement('div');
    gameOverMessage.textContent = 'Game Over';
    gameOverMessage.classList.add('game-over-message');
    gameBoard.appendChild(gameOverMessage);

    const finalScoreMessage = document.createElement('div');
    finalScoreMessage.textContent = `Score: ${score}`;
    finalScoreMessage.classList.add('final-score-message');
    gameBoard.appendChild(finalScoreMessage);

    const pressEnter = document.createElement('div');
    pressEnter.textContent = '*Press "ENTER" to continue*';
    pressEnter.classList.add('pressEnter');
    gameBoard.appendChild(pressEnter);

    window.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            location.reload();
        }
    });
}

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

gameBoard.addEventListener('click', addNewFood);

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
    highElement.textContent = `High Score: ${highScore}`;

}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function adjustSnakeSpeed() {
    const elementToFlash = document.querySelector('#game-board');
    const currentSpeed = getSnakeSpeed();

    switch(true) {
        case (score > 30 && currentSpeed === 10):
            setSnakeSpeed(14);
            break;
        case (score > 40 && currentSpeed === 15):
            setSnakeSpeed(18);
            break;
        case (score > 200 && currentSpeed === 14):
            setSnakeSpeed(16);
            break;
        case (score > 240 && currentSpeed === 18):
            setSnakeSpeed(19);
            break;
    }

    if (currentSpeed !== getSnakeSpeed()) {
        playAudio("boost");
        flashBoard(elementToFlash);
    }
}

function flashBoard(element) {
    element.style.animation = 'flash 0.1s infinite alternate';
    setTimeout(() => {
        element.style.animation = '';
    }, 1000);
}
