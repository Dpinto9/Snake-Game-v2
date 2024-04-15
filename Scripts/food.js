import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { playAudio } from "./audio.js";

export{ score, scoreElement, highScore };

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
let food = getRandomFoodPosition()
let newFood = null;
const scoreElement = document.getElementById('score');
export const highElement = document.querySelector('.high');

const EXPANSION_RATE = 1

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        
        score += 10 ;
        playAudio('eating');
        showNotification('+10 pontos!');
        scoreElement.textContent = `Score: ${score}`;
        
        highScore = score >=highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        highElement.textContent = `High Score: ${highScore}`;
    }

    // Check if there is new food
    if (newFood) {
        // If there is, add it to the game
        food = newFood;
        newFood = null;
    }
}

export function addNewFood() {
    newFood = getRandomFoodPosition();
}

export function draw(gameBoard){
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition(){
    let newFoodPostion

    while(newFoodPostion == null || onSnake(newFoodPostion)){
        newFoodPostion = randomGridPosition()
    }

    return newFoodPostion
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;

    setTimeout(() => {
        notification.textContent = '';
    }, 1000);
}