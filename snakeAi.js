import { getSnakeHead, onSnake, clampPos } from "./snake.js";
import { getCurrentFoodPosition } from "./food.js";

var inputDirection = { x: 0, y: 0 };
var lastInputDirection = { x: 0, y: 0 };
var setBy = "";

export function getSetBy() {
  return setBy;
}
export function getInputDirection() {
  let snakePos = getSnakeHead();
  let foodPos = getCurrentFoodPosition();
  if (snakePos.x != foodPos.x) {
    // if (lastInputDirection.x != (foodPos.x < 0 ? -1 : 1))
    if (lastInputDirection.x == 0)
      inputDirection = { x: snakePos.x - foodPos.x < 0 ? 1 : -1, y: 0 };
    setBy = "normalDirection";
  } else if (snakePos.y != foodPos.y) {
    // if (lastInputDirection.y != (foodPos.y < 0 ? -1 : 1))
    if (lastInputDirection.y == 0)
      inputDirection = { x: 0, y: snakePos.y - foodPos.y < 0 ? 1 : -1 };
    setBy = "normalDirection";
  } else {
    inputDirection = lastInputDirection;
    setBy = "normalDirection";
  }

  let loops = 0;

  while (
    snakeHit(loops) &&
    // onSnake(clampPos(addPositions(snakePos, inputDirection))) &&
    // onFutureSnake(3) &&
    loops < 20
  ) {
    loops++;

    inputDirection = getRandomDirection();
  }

  lastInputDirection = inputDirection;
  return inputDirection;
}

function getRandomDirection() {
  let rand = Math.floor(Math.random() * 3);
  let dir = { x: 0, y: 0 };
  if (rand != 0) {
    if (lastInputDirection.x == 0) dir.x = rand == 1 ? 1 : -1;
    else dir.y = rand == 1 ? 1 : -1;
    return dir;
  }
  return lastInputDirection;
}

function onFutureSnake(viewDistance) {
  let snakePos = getSnakeHead();
  for (let i = 1; i <= viewDistance; i++) {
    let inputDirDistance = { x: inputDirection.x * i, y: inputDirection.y * i };
    if (onSnake(clampPos(addPositions(snakePos, inputDirDistance))))
      return true;
  }
  return false;
}

function snakeHit(i) {
  if (i < 11) {
    setBy = "future snake";
    return onFutureSnake(3);
  }
  setBy = "normal onsnake";
  return onSnake(clampPos(addPositions(getSnakeHead(), inputDirection)));
}

function addPositions(p1, p2) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

function positionStr(pos) {
  return "X:" + pos.x + " Y:" + pos.y;
}
