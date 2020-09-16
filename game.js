import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersection,
  getSnakeLength,
  writeLogs,
} from "./snake.js";

import { draw as drawFood, update as updateFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { getSetBy } from "./snakeAi.js";
let gameOver = false;
let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");

function main(currentTime) {
  if (gameOver) {
    // writeLogs();
    console.log(getSetBy());
    if (confirm("You lost. Press ok to restart")) {
      window.location = "./";
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;
  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  scoreElement.innerHTML = getSnakeLength();
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  // gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
  gameOver = snakeIntersection();
}
