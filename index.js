const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const backgroundStars = [];
GenerateBackground();

let isPaused = false;
function animate() {
  if (isPaused) {
    return;
  }

  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  DrawBackground();
  player.update();

  AnimateProjectiles();

  AnimateAsteroids();

  //Check for collisions between asteroids and projectiles
  ProjectileAsteroidsCollision();

  //Check for collisions between asteroids and player
  for (let i = asteroids.length - 1; i >= 0; i--) {
    let asteroid = asteroids[i];

    let distance = CalculateDistanceBetweenTwoPoints(asteroid.position, player.position);
    if (distance < asteroid.radius + player.radius) {
      isPaused = true;
      alert("Game Over");
    }
  }

  HandleKeyPress();
}

const player = new Player({ position: { x: width / 2, y: height / 2 }, velocity: { vx: 0, vy: 0 } });
player.draw();

const projectiles = [];
const asteroids = [];

let intervalId = setInterval(() => {
  let newAsteroid = GenerateRandomAsteroid();
  asteroids.push(newAsteroid);
}, 500);

animate();
