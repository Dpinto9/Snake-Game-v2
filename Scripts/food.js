import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
import { playAudio } from "./audio.js";

export{ score, scoreElement, highScore };

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
export let food = [getRandomFoodPosition()];
const scoreElement = document.getElementById('score');
export const highElement = document.querySelector('.high');

const GROWINGLENGTH = 1

export function update(){
    let remainingFood = [];

    for (let i = 0; i < food.length; i++) {
        if(onSnake(food[i])){
            expandSnake(GROWINGLENGTH)
            score += 5 ;
            playAudio('eating');
            showNotification('+5 pontos!');
            scoreElement.textContent = `Score: ${score}`;
            
            highScore = score >=highScore ? score : highScore;
            localStorage.setItem("high-score", highScore);
            highElement.textContent = `High Score: ${highScore}`;
        } else {
            remainingFood.push(food[i]);
        }
    }

    food = remainingFood;

    if (food.length === 0) {
        addNewFood();
    }
}

export function addNewFood() {
    food.push (getRandomFoodPosition());
}

export function draw(gameBoard){
    document.querySelectorAll('.food').forEach(foodElement => foodElement.remove());

    food.forEach(foodItem => {
        const foodElement = document.createElement('div');
        foodElement.style.gridColumnStart = foodItem.x;
        foodElement.style.gridRowStart = foodItem.y;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
    });
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