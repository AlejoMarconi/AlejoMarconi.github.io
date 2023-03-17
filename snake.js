const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 10;
const tileCount = canvas.width / gridSize;
let speed = 5; // 5 frames for second

let snake = {
  x: tileCount / 20,
  y: tileCount / 20,
  dx: 0,
  dy: 0,
  tail: [],
  length: 0
};

let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};

function draw() {
  // Move the snake
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Check for collisions with walls
  if (snake.x < 0 || snake.x >= tileCount || snake.y < 0 || snake.y >= tileCount) {
    gameOver();
    return;
  }

  // Check for collisions with tail
  for (let i = 0; i < snake.tail.length; i++) {
    if (snake.x === snake.tail[i].x && snake.y === snake.tail[i].y) {
      gameOver();
      return;
    }
  }

  // Check for collisions with food
  if (snake.x === food.x && snake.y === food.y) {
    snake.length++;
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
  }

  // Update the tail
  snake.tail.unshift({ x: snake.x, y: snake.y });
  while (snake.tail.length > snake.length) {
    snake.tail.pop();
  }

  // Clear the canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "#0f0";
  ctx.fillRect(snake.x * gridSize, snake.y * gridSize, gridSize, gridSize);
  for (let i = 0; i < snake.tail.length; i++) {
    ctx.fillRect(snake.tail[i].x * gridSize, snake.tail[i].y * gridSize, gridSize, gridSize);
  }

  // Draw the food
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  // Request the next frame
  setTimeout(() => requestAnimationFrame(draw), 1000 / speed);
  //requestAnimationFrame(draw);
}

function gameOver() {
  alert("Game over!");
  location.reload();
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp" && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = -1;
  } else if (event.key === "ArrowDown" && snake.dy === 0) {
    snake.dx = 0;
    snake.dy = 1;
  } else if (event.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -1;
    snake.dy = 0;
  } else if (event.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = 1;
    snake.dy = 0;
  }
});

requestAnimationFrame(draw);
