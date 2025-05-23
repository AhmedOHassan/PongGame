// Game variables.
/** The start text element. */
const startText = document.getElementById("startText");

/** The paddle 1 element. */
const paddle1 = document.getElementById("paddle1");

/** The paddle 2 element. */
const paddle2 = document.getElementById("paddle2");

/** The ball element. */
const ball = document.getElementById("ball");

/** The player 1 score element. */
const player1ScoreElement = document.getElementById("player1Score");

/** The player 2 score element. */
const player2ScoreElement = document.getElementById("player2Score");

/** The loss sound element. */
const lossSound = document.getElementById("lossSound");

/** The wall sound element. */
const wallSound = document.getElementById("wallSound");

/** The paddle sound element. */
const paddleSound = document.getElementById("paddleSound");

/** The constant acceleration that the paddle can use to speed up. */
const paddleAcceleration = 1;

/** The constant deceleration that the paddle can use to slow down. */
const paddleDeceleration = 1;

/** The maximum paddle speed in the game. */
const maxPaddleSpeed = 5;

/** The minimum paddle speed in the game. */
const minPaddleSpeed = 0;

/** The height of the game area. */
const gameHeight = 400;

/** The width of the game area. */
const gameWidth = 600;

/** A boolean to determine if the game is running or not. */
let gameRunning = false;

/** A map of booleans to determine if a key was pressed or released. */
let keysPressed = {};

/** The speed of paddle 1. */
let paddle1Speed = 0;

/** The position of paddle 1. */
let paddle1Y = 150;

/** The speed of paddle 2. */
let paddle2Speed = 0;

/** The position of paddle 2. */
let paddle2Y = 150;

/** The speed of the ball in the x direction. */
let ballSpeedX = 2;

/** The position of the ball in the x direction. */
let ballX = 290;

/** The speed of the ball in the y direction. */
let ballSpeedY = 2;

/** The position of the ball in the y direction. */
let ballY = 190;

/** The player 1 score. */
let player1Score = 0;

/** The player 2 score. */
let player2Score = 0;

// Creating event listeners for the game.
document.addEventListener("keydown", startGame);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

/**
 * This function will be responsible for starting the game.
 */
function startGame() {
  // Setting the game to be running.
  gameRunning = true;

  // Removing the starting text shown to the user.
  startText.style.display = "none";

  // Removing the event listener after starting the game.
  document.removeEventListener("keydown", startGame);

  // Starting the looping mechanic for the game.
  gameLoop();
}

/**
 * This function will be responsible for keep looping the game mechanics unitll some player wins.
 */
function gameLoop() {
  // Check if the game is running.
  if (gameRunning) {
    // Updating player 1 paddle.
    updatePaddle1();

    // Updating player 2 paddle.
    updatePaddle2();

    // Moving the game ball.
    moveBall();

    // Keep looping the game mechanics and wait 8ms between each loop.
    setTimeout(gameLoop, 8);
  }
}

/**
 * This function will be responsible for handling when the user press on a key after the game has started.
 *
 * @param e an event that is passed by the user releasing a pressed key on the keyboard.
 */
function handleKeyDown(e) {
  // Setting the event key to be true.
  keysPressed[e.key] = true;
}

/**
 * This function will be responsible for handling when the user release a pressed key after the game has started.
 *
 * @param e an event that is passed by the user pressing a key on the keyboard.
 */
function handleKeyUp(e) {
  // Setting the event key to be true.
  keysPressed[e.key] = false;
}

/**
 * This function will be responsible for controlling player 1 paddle.
 */
function updatePaddle1() {
  // Checking if the player has pressed w, if so then move the paddle in the upward direction and speed it up.
  if (keysPressed["w"] || keysPressed["W"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, -maxPaddleSpeed);
  } // Checking if the player has pressed s, if so then move the paddle in the downward direction and speed it up.
  else if (keysPressed["s"] || keysPressed["S"]) {
    paddle1Speed = Math.min(paddle1Speed + paddleAcceleration, maxPaddleSpeed);
  } // Then the player has released the w or s button.
  else {
    // Check if the paddle has not stopped yet in the downward direction, if so slow it down untill it stops.
    if (paddle1Speed > 0) {
      paddle1Speed = Math.max(
        paddle1Speed - paddleDeceleration,
        minPaddleSpeed
      );
    } // Check if the paddle has not stopped yet in the upward direction, if so slow it down untill it stops.
    else if (paddle1Speed < 0) {
      paddle1Speed = Math.min(
        paddle1Speed + paddleDeceleration,
        minPaddleSpeed
      );
    }
  }

  // Changing the position of the paddle based on the speed.
  paddle1Y += paddle1Speed;

  // Check if the paddle position is higher than the game area limit to prevent the paddle from moving infinitely in the upward direction.
  if (paddle1Y < 0) {
    paddle1Y = 0;
  }

  // Check if the paddle position is lower than the game area limit to prevent the paddle from moving infinitely in the downward direction.
  if (paddle1Y > gameHeight - paddle1.clientHeight) {
    paddle1Y = gameHeight - paddle1.clientHeight;
  }

  // Moving the paddle to the changed position.
  paddle1.style.top = paddle1Y + "px";
}

/**
 * This function will be responsible for controlling player 2 paddle.
 */
function updatePaddle2() {
  // Checking if the player has pressed w, if so then move the paddle in the upward direction and speed it up.
  if (keysPressed["ArrowUp"]) {
    paddle2Speed = Math.max(paddle2Speed - paddleAcceleration, -maxPaddleSpeed);
  } // Checking if the player has pressed s, if so then move the paddle in the downward direction and speed it up.
  else if (keysPressed["ArrowDown"]) {
    paddle2Speed = Math.min(paddle2Speed + paddleAcceleration, maxPaddleSpeed);
  } // Then the player has released the w or s button.
  else {
    // Check if the paddle has not stopped yet in the downward direction, if so slow it down untill it stops.
    if (paddle2Speed > 0) {
      paddle2Speed = Math.max(
        paddle2Speed - paddleDeceleration,
        minPaddleSpeed
      );
    } // Check if the paddle has not stopped yet in the upward direction, if so slow it down untill it stops.
    else if (paddle2Speed < 0) {
      paddle2Speed = Math.min(
        paddle2Speed + paddleDeceleration,
        minPaddleSpeed
      );
    }
  }

  // Changing the position of the paddle based on the speed.
  paddle2Y += paddle2Speed;

  // Check if the paddle position is higher than the game area limit to prevent the paddle from moving infinitely in the upward direction.
  if (paddle2Y < 0) {
    paddle2Y = 0;
  }

  // Check if the paddle position is lower than the game area limit to prevent the paddle from moving infinitely in the downward direction.
  if (paddle2Y > gameHeight - paddle2.clientHeight) {
    paddle2Y = gameHeight - paddle2.clientHeight;
  }

  // Moving the paddle to the changed position.
  paddle2.style.top = paddle2Y + "px";
}

/**
 * This function will be responsible for moving the ball in the game.
 */
function moveBall() {
  // Changing the position of the ball on the x axis based on its speed.
  ballX += ballSpeedX;

  // Changing the position of the ball on the y axis based on its speed.
  ballY += ballSpeedY;

  // Check if the ball in y direction have hit the wall of the game area, if so make it bounce back.
  if (ballY >= gameHeight - ball.clientHeight || ballY <= 0) {
    ballSpeedY = -ballSpeedY;
    playSound(wallSound);
  }

  // Check if the ball in x direction have hit the player 1 paddle, if so make it bounce back.
  if (
    ballX <= paddle1.clientWidth &&
    ballY >= paddle1Y &&
    ballY <= paddle1Y + paddle1.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
    playSound(paddleSound);
  }

  // Check if the ball in x direction have hit the player 2 paddle, if so make it bounce back.
  if (
    ballX >= gameWidth - paddle2.clientWidth - ball.clientWidth &&
    ballY >= paddle2Y &&
    ballY <= paddle2Y + paddle2.clientHeight
  ) {
    ballSpeedX = -ballSpeedX;
    playSound(paddleSound);
  }

  // Check if the ball in x direction have hit the out of game area for player 1, if so increase player 2 score, reset the ball to the center, and pause the game.
  if (ballX <= 0) {
    player2Score++;
    playSound(lossSound);
    updateScoreBoard();
    resetBall();
    pauseGame();
  } // Check if the ball in x direction have hit the out of game area for player 2, if so increase player 1 score, reset the ball to the center, and pause the game.
  else if (ballX >= gameWidth - ball.clientWidth) {
    player1Score++;
    playSound(lossSound);
    updateScoreBoard();
    resetBall();
    pauseGame();
  }

  // Moving the ball to the changed position on the x axis.
  ball.style.left = ballX + "px";

  // Moving the ball to the changed position on the y axis.
  ball.style.top = ballY + "px";
}

/**
 * This function will be responsible for updating players score.
 */
function updateScoreBoard() {
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
}

/**
 * This function will be responsible for resetting the ball to the center of the game area.
 */
function resetBall() {
  ballX = gameWidth / 2 - ball.clientWidth / 2;
  ballY = gameHeight / 2 - ball.clientHeight / 2;

  // Making the ball randomly start moving in different direction every round.
  ballSpeedX = Math.random() > 0.5 ? 2 : -2;
  ballSpeedY = Math.random() > 0.5 ? 2 : -2;
}

/**
 * This function will be responsible for pausing the game after one of the players score a point untill one of the players move again.
 */
function pauseGame() {
  gameRunning = false;
  document.addEventListener("keydown", startGame);
}

/**
 * This function will be responsible for playing in game sounds.
 *
 * @param sound the given sound to be played.
 */
function playSound(sound) {
  // Stopping sound if it was already playing.
  sound.currentTime = 0;

  // Playing the game sounds.
  sound.play();
}
