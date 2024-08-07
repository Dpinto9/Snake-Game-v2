import { getInputDirection } from "./input.js"

export let SNAKE_SPEED = 10

const snakeBody = [{
    x:11, y:11,
    x:11, y:12,
    x:11, y:13
}]

let newSegments = 2

export function setSnakeSpeed(speed) {
    SNAKE_SPEED = speed

    if(score > 30 ){
        SNAKE_SPEED += 4
    }
    
}

export function getSnakeSpeed() {
    return SNAKE_SPEED
}

export function update(){
    addSegments()
    const inputDirection = getInputDirection()
    
    for (let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = { ... snakeBody[i]}
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}


let directions = [];

export function draw(gameBoard) {
    directions.unshift(getInputDirection());
    
    if (directions.length > snakeBody.length) {
        directions.pop();
    }

    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;

        if (index === 0) {
            snakeElement.classList.add('snake-head');
            
            const inputDirection = directions[0];
            snakeElement.style.transform = getRotation(inputDirection);

        } else if (index === snakeBody.length - 1) {
            
            snakeElement.classList.add('snake-tail');
            const inputDirection = directions[directions.length - 1];
            snakeElement.style.transform = getRotation(inputDirection);

        } else {
            snakeElement.classList.add('snake');
        }

        gameBoard.appendChild(snakeElement);
    });
}

function getRotation(inputDirection) {

    if (inputDirection.x === 0 && inputDirection.y === -1) {
        return 'rotate(180deg)'; // up
    } else if (inputDirection.x === 0 && inputDirection.y === 1) {
        return 'rotate(0deg)'; // down
    } else if (inputDirection.x === -1 && inputDirection.y === 0) {
        return 'rotate(90deg)'; // left
    } else if (inputDirection.x === 1 && inputDirection.y === 0) {
        return 'rotate(270deg)'; // right
    }
}

export function expandSnake(amount){
    newSegments += amount
}

export function addSegments(){
    for (let i = 0; i < newSegments; i++ ){
        snakeBody.push({...snakeBody[snakeBody.length - 1 ]})
    }
    newSegments = 0
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return
        return position.x === segment.x && position.y === segment.y
    })
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(getSnakeHead(), {
        ignoreHead: true
    })
}