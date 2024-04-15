let GRID_SIZE = 20

export function setGridSize(size, gameBoard) {
    GRID_SIZE = size;

    if (size === 30) {
        gameBoard.classList.add('big-grid');
    } else {
        gameBoard.classList.remove('big-grid');
    }
}

export function randomGridPosition(){
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1,
    }
}

export function outsideGrid (position)
{
    return position.x < 1 || position.x > GRID_SIZE ||position.y < 1 || position.y > GRID_SIZE
}