window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", keyPress);
    setInterval(game, 1000 / 15);
}

function keyPress(evt) {
    switch (evt.key) {
        case 'ArrowUp':
            if (velocityX != 0) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if (velocityX != 0) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowRight':
            if (velocityY != 0) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        case 'ArrowLeft':
            if (velocityY != 0) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
    }
}

var playerX = playerY = 10;
var velocityX = 1;
var velocityY = 0;
var gridSize = tileCount = 20;
var tail = 5;
var trail = [];
var foodX = foodY = Math.floor(Math.random() * gridSize);

function game() {
    playerX += velocityX;
    playerY += velocityY;
    const limit = tileCount - 1;

    if (playerX < 0) {
        playerX = limit;
    }

    if (playerX > limit) {
        playerX = 0;
    }

    if (playerY < 0) {
        playerY = limit;
    }

    if (playerY > limit) {
        playerY = 0;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);

    ctx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        const actualTrail = trail[i];
        ctx.fillRect(actualTrail.x * gridSize, actualTrail.y * gridSize, gridSize - 2, gridSize - 2)

        if (actualTrail.x == playerX && actualTrail.y == playerY) {
            tail = 5;
        }
    }

    trail.push({ x: playerX, y: playerY });

    while (trail.length > tail) {
        trail.shift();
    }

    if (foodX == playerX && foodY == playerY) {
        tail++;
        foodX = Math.floor(Math.random() * gridSize);
        foodY = Math.floor(Math.random() * gridSize);
    }
}