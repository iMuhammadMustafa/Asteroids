const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


const backgroundStars = [];
const projectiles = [];
const asteroids = [];
const player = new Player({ position: { x: width / 2, y: height / 2 }, velocity: { vx: 0, vy: 0 } });
player.draw();


let isPaused = false;
let isMovingBackground = false;
let intervalId;


const pauseButton = document.querySelector("#pause");
pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;

  if (isPaused) {
    pauseButton.innerHTML = "Resume";
    clearInterval(intervalId);
  } else {
    pauseButton.innerHTML = "Pause";
    animate();
  }
});

const isMovingBackgroundButton = document.querySelector("#isMovingBackground");
isMovingBackgroundButton.addEventListener("click", () => {
  isMovingBackground = !isMovingBackground;
  if (isMovingBackground) {
    isMovingBackgroundButton.innerHTML = "Stop Background";
    GenerateBackgroundStars(1000, 0.5);
  } else {
    isMovingBackgroundButton.innerHTML = "Animate Background";
  }
});

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", () => {
  isPaused = false;
  player.score = 0;
  player.position = { x: width / 2, y: height / 2 };
  player.velocity = { vx: 0, vy: 0 };
  asteroids.splice(0, asteroids.length);
  projectiles.splice(0, projectiles.length);
  backgroundStars.splice(0, backgroundStars.length);
  GenerateBackgroundStars(1000, 0.5);

  restartButton.classList.add("hidden");
  document.querySelector("#game-over").classList.add("hidden");
  document.querySelectorAll("#score").forEach(scoreboard => {
    scoreboard.textContent = player.score;
  });

  clearInterval(intervalId);
  startGame()
});

function animate() {
  if (isPaused) {
    return;
  }

  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (isMovingBackground) {
    backgroundStars.splice(0, backgroundStars.length);
    GenerateBackgroundStars();
  }

  AnimateProjectiles();
  AnimateAsteroids();
  DrawBackground();

  //Check for collisions between asteroids and projectiles
  ProjectileAsteroidsCollision();

  //Check for collisions between asteroids and player
  for (let i = asteroids.length - 1; i >= 0; i--) {
    let asteroid = asteroids[i];

    let distance = CalculateDistanceBetweenTwoPoints(asteroid.position, player.position);
    if (distance < asteroid.radius + player.radius) {
      isPaused = true;
      clearInterval(intervalId);
      document.querySelector("#game-over").classList.remove("hidden");
      const restartButton = document.querySelector("#restart");
      restartButton.classList.remove("hidden");
    }
  }

  if (keys.isWPressed) {
    player.velocity.vx = Math.cos(player.rotation) * player.speedModifier;
    player.velocity.vy = Math.sin(player.rotation) * player.speedModifier;
  } else if (!keys.isWPressed) {
    player.velocity.vx *= player.friction;
    player.velocity.vy *= player.friction;
  }
  if (keys.isSPressed) {
    // player.velocity.vx = -Math.cos(player.rotation) * player.speedModifier;
    // player.velocity.vy = -Math.sin(player.rotation) * player.speedModifier;

    player.velocity.vx *= 1 - 0.03;
    player.velocity.vy *= 1 - 0.03;

  }
  if (keys.isAPressed) {
    player.rotation -= player.rotationSpeed;
  }
  if (keys.isDPressed) {
    player.rotation += player.rotationSpeed;
  }

  if (player && player.position && player.position.x > width) {
    player.position.x = 0;
  }
  if (player && player.position && player.position.x < 0) {
    player.position.x = width;
  }
  if (player && player.position && player.position.y > height) {
    player.position.y = 0;
  }
  if (player && player.position && player.position.y < 0) {
    player.position.y = height;
  }

  fireRate = fireRate <= 100 ? fireRate : (player.score) / 500

  player.update();
}

startGame();