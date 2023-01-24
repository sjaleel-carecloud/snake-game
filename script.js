const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let snake = [{ x: 150, y: 150 }];
let direction = "right";
let foodX = 0;
let foodY = 0;

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
}

let gameOver = false;

let score = 0;
const gameOverElement = document.getElementById("game-over");
const scoreElement = document.getElementById("score");

function moveSnake() {
  let head = snake[0];
  if (direction == "right") {
    head = { x: (head.x + 10) % canvas.width, y: head.y };
  } else if (direction == "left") {
    head = { x: (head.x - 10 + canvas.width) % canvas.width, y: head.y };
  } else if (direction == "up") {
    head = { x: head.x, y: (head.y - 10 + canvas.height) % canvas.height };
  } else if (direction == "down") {
    head = { x: head.x, y: (head.y + 10) % canvas.height };
  }
  if(snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameOverElement.style.display = "block";
    scoreElement.innerText = score;

    if(snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
      gameOver = true;
      gameOverElement.style.display = "block";
      scoreElement.innerText = score;
      resetButton.style.display = "block";
      return;
    }
    return;
  }
  snake.unshift(head);
  if (head.x == foodX && head.y == foodY) {
    score++;
    foodX = Math.floor(Math.random() * canvas.width / 10) * 10;
    foodY = Math.floor(Math.random() * canvas.height / 10) * 10;
  } else {
    snake.pop();
  }

}

const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", function(){
  gameOver = false;
  snake = [{ x: 150, y: 150 }];
  direction = "right";
  foodX = 0;
  foodY = 0;
  score = 0;
  gameOverElement.style.display = "none";
  resetButton.style.display = "none";
});


function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, 10, 10);
}

document.onkeydown = function(event) {
  if (event.keyCode == 37 && direction != "right") {
    direction = "left";
  } else if (event.keyCode == 38 && direction != "down") {
    direction = "up";
  } else if (event.keyCode == 39 && direction != "left") {
    direction = "right";
  } else if (event.keyCode == 40 && direction != "up") {
    direction = "down";
  }
}

setInterval(function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  moveSnake();
  drawFood();
}, 100);
