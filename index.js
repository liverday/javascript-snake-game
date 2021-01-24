window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    window.addEventListener("keydown", keyPress);
    scoreSpan = document.getElementById("score");
    gameTimer = setInterval(game, 1000 / 15);
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
        case 'r':
        case 'R':
            if (state.current == state.gameOver) {
                restart();
            }
            break;
    }
}

var playerX = playerY = 10;
var velocityX = 1;
var velocityY = 0;
var gridSize = tileCount = Math.sqrt(canvas.width);
var tail = 5;
var trail = [];
var foodX = foodY = Math.floor(Math.random() * gridSize);
var score = 0;
const state = {
    current: 0,
    game: 0,
    gameOver: 1
}

function game() {
    if (state.current != state.game)
        return;

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
    let collided = false;
    for (let i = 0; i < trail.length; i++) {
        const actualTrail = trail[i];
        ctx.fillRect(actualTrail.x * gridSize, actualTrail.y * gridSize, gridSize - 2, gridSize - 2)

        if (actualTrail.x == playerX && actualTrail.y == playerY) {
            collided = true;
        }
    }

    if (collided) {
        gameOver();
    }

    trail.push({ x: playerX, y: playerY });

    while (trail.length > tail) {
        trail.shift();
    }

    if (foodX == playerX && foodY == playerY) {
        score += 100;
        scoreSpan.textContent = score.toString();

        tail++;
        foodX = Math.floor(Math.random() * gridSize);
        foodY = Math.floor(Math.random() * gridSize);
    }
}

function gameOver() {
    state.current = state.gameOver;
    clearInterval(gameTimer);

    ctx.save();

    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 50, 350, 130);

    ctx.font = 'bold 20px Roboto';
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", canvas.width / 2 - 25, canvas.height / 2 - 5);
    ctx.fillText("Press R to Restart", canvas.width / 2 - 55, canvas.height / 2 + 20);
    let highestScore = localStorage.getItem('highest_score');
    if (!highestScore || parseInt(highestScore) < score) {
        localStorage.setItem('highest_score', score);
        ctx.fillText(`New high score achieved: ${score}`, canvas.width / 2 - 95, canvas.height / 2 + 50);
    } else {
        ctx.fillText(`Highest score achieved: ${highestScore}`, canvas.width / 2 - 95, canvas.height / 2 + 50);
    }

}

function restart() {
    state.current = state.game;
    ctx.restore();
    tail = 5;
    score = 0;
    trail = [];
    scoreSpan.textContent = score.toString();
    
    gameTimer = setInterval(game, 1000/15);
}