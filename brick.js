let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let poleSpeed = 5;
let gravity = 9.8;
let brick = document.getElementById("brick");
let score = 0;
let highScore = 0;
let bird = {
  x: 50,
  y: 50
};
//bottom pole
let pole1 = new bottomPole(900);
//top pole
let pole2 = new topPole(900, pole1.height);
//bottom pole 2
let pole3 = new bottomPole(1300);
//top pole 2
let pole4 = new topPole(1300, pole3.height);

//constructer function for bottom pole
function bottomPole(x) {
  (this.x = x),
    (this.y = canvas.height),
    (this.width = 50),
    (this.height = 100 + Math.round(Math.random() * 470));
}
//Top pole
function topPole(x, height) {
  (this.x = x), (this.y = 0), (this.width = 50), (this.height = 470 - height);
}

window.onload = function() {
  ctx.font = "50px Lucida Console";
  ctx.fillText(
    "Press enter to start",
    canvas.width / 2 - 250,
    canvas.height / 2
  );

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 32) {
      gravity = -8;
    } else if (event.keyCode == 13) {
      restart();
    }
  });
};

function drawBird() {
  bird.y += gravity;

  //Draws bird
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(brick, bird.x, bird.y, 50, 50);
}
function keepScore() {
  ctx.fillStyle = "white";
  ctx.font = " 20px Georgia";
  ctx.fillText(score, canvas.width - 50, canvas.height - 50);

  if (score > highScore) {
    highScore = score;
  }
}

function drawPoles() {
  pole1.x -= poleSpeed;
  pole2.x -= poleSpeed;
  pole3.x -= poleSpeed;
  pole4.x -= poleSpeed;

  //bottom pole
  ctx.fillStyle = "BlueViolet";
  ctx.fillRect(pole1.x, pole1.y - pole1.height, pole1.width, pole1.height);
  ctx.fill();
  //top pole
  ctx.fillStyle = "BlueViolet";
  ctx.fillRect(pole2.x, pole2.y, pole2.width, pole2.height);
  ctx.fill();
  //second bottom pole

  ctx.fillStyle = "BlueViolet";
  ctx.fillRect(pole3.x, pole3.y - pole3.height, pole3.width, pole3.height);
  ctx.fill();
  //second top pole
  ctx.fillStyle = "BlueViolet";
  ctx.fillRect(pole4.x, pole4.y, pole4.width, pole4.height);
  ctx.fill();

  if (pole1.x + 25 <= 0) {
    pole1 = new bottomPole(900);
    pole2 = new topPole(900, pole1.height);
    poleSpeed += 0.3;
    score++;
  }
  if (pole3.x + 25 <= 0) {
    pole3 = new bottomPole(900);
    pole4 = new topPole(900, pole3.height);
    score++;
  }
}

function restart() {
  document.getElementById("canvas").style.backgroundColor = "black";

  pole1 = new bottomPole(900);
  pole2 = new topPole(900, pole1.height);
  pole3 = new bottomPole(1300);
  pole4 = new topPole(1300, pole3.height);
  bird.y = 50;
  poleSpeed = 5;
  score = 0;
  gravity = 9.8;
  gameLoop();
}
function gameOverScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("canvas").style.backgroundColor = "lightblue";
  ctx.fillStyle = "blue";
  ctx.font = " 30px Comic Sans Ms";
  ctx.fillText("GAME OVER", 420, 100);
  ctx.fillText("Score: " + score, 435, 150);
  ctx.fillText("High Score: " + highScore, 410, 200);
  ctx.fillText("Press enter to play again", 350, 250);
}

function gameLoop() {
  drawBird();
  drawPoles();
  keepScore();
  gravity += .5;
  

  //Collisions
  if (
    (bird.x + 25 >= pole1.x - 25 &&
      bird.x - 25 <= pole1.x + 25 &&
      670 - bird.y - 50 <= pole1.height) ||
    //collision top pole1
    (bird.x + 25 >= pole1.x - 25 &&
      bird.x - 25 <= pole1.x + 25 &&
      bird.y <= pole2.height) ||
    //collision bottom pole2
    (bird.x + 25 >= pole3.x - 25 &&
      bird.x - 25 <= pole3.x + 25 &&
      670 - bird.y - 50 <= pole3.height) ||
    //collision top pole2
    (bird.x + 25 >= pole3.x - 25 &&
      bird.x - 25 <= pole3.x + 25 &&
      bird.y <= pole4.height)
  ) {
    cancelAnimationFrame(gameLoop);
    gameOverScreen();
  } else if (bird.y >= canvas.height - 50) {
    //If bird hits ground
    cancelAnimationFrame(gameLoop);
    gameOverScreen();
  } else {
    requestAnimationFrame(gameLoop);
  }
}