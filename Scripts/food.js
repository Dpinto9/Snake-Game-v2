import { onSnake, expandSnake, getSnakeSpeed } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let score = 0;
let food = getRandomFoodPosition()
const scoreElement = document.getElementById('score');

export{ score, scoreElement };

const EXPANSION_RATE = 1

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        score += 10 ;

        showNotification('+10 pontos!');
        scoreElement.textContent = `Score: ${score}`;
    }
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