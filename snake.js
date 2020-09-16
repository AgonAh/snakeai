export const SNAKE_SPEED = 100; //Snake moves per second default=5
// import { getInputDirection } from "./input.js";
import { getInputDirection } from "./snakeAi.js";
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;
const cap = 21;
let logs = [];
export function update() {
  //Snake segments move up to the position of the one ahead of them, following the head
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }; //used spread operator to avoid using a changed element
  }
  snakeBody[0].x = clampPos(snakeBody[0].x + inputDirection.x);
  snakeBody[0].y = clampPos(snakeBody[0].y + inputDirection.y);
  addLog();
}

export function draw(gameBoard) {
  snakeBody.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    if (index < 2) snakeElement.classList.add("snakeHead");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(ammount) {
  newSegments += ammount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  try {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return equalPositions(segment, position);
    });
  } catch (err) {
    return false;
  }
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

export function getSnakeLength() {
  return snakeBody.length;
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}

export function clampPos(pos) {
  if (pos > cap) return 0;
  else if (pos < 0) return cap;
  return pos;
}

function addLog() {
  logs.push({ ...snakeBody[0] });
}

export function writeLogs() {
  for (let i = 1; i < logs.length; i++) {
    let curr = logs[i];
    let last = logs[i - 1];
    // console.log(positionStr(last) + " - TO - " + positionStr(curr));
    if (curr == last) {
      console.log(
        "you went back" + positionStr(last) + " - TO - " + positionStr(curr)
      );
    }
    if (curr.x != last.x && curr.y != last.y) {
      console.log("illegal move boi");
    }
  }
  console.log("Finished reading logs");
}

function positionStr(pos) {
  return "X:" + pos.x + " Y:" + pos.y;
}
