function GenerateBackgroundStars(starsAmount = 100, starsRadius = 0.9) {
  for (let i = 0; i < starsAmount; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let radius = starsRadius;

    backgroundStars.push({ x, y, radius });
  }
}
function DrawBackground() {
  for (let i = 0; i < backgroundStars.length; i++) {
    let star = backgroundStars[i];

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}

function IsOffScreen({ position, radius }) {
  if (position.x + radius < 0 || position.x - radius > width || position.y + radius < 0 || position.y - radius > height) {
    return true;
  }
}

function CalculateDistanceBetweenTwoPoints(point1, point2) {
  let xDifference = point1.x - point2.x;
  let yDifference = point1.y - point2.y;
  let distance = Math.sqrt(xDifference ** 2 + yDifference ** 2);

  return distance;
}

function ProjectileAsteroidsCollision() {
  for (let i = asteroids.length - 1; i >= 0; i--) {
    let asteroid = asteroids[i];
    for (let j = projectiles.length - 1; j >= 0; j--) {
      let projectile = projectiles[j];

      let distance = CalculateDistanceBetweenTwoPoints(asteroid.position, projectile.position);
      if (distance < asteroid.radius + projectile.radius) {
        asteroids.splice(i, 1);
        projectiles.splice(j, 1);

        let newAstroid;
        if (asteroid.radius > 30) {
          newAstroid = new Asteroid({
            position: asteroid.position,
            velocity: asteroid.velocity,
            radius: asteroid.radius / 2,
          });
          player.score += 50;
        } else {
          newAstroid = GenerateRandomAsteroid();
          player.score += 200;
        }
        asteroids.push(newAstroid);
        document.querySelectorAll("#score").forEach(scoreboard => {
          scoreboard.textContent = player.score;
        });
      }
    }
  }
}

function FireProjectile() {
  let newProjectile = new Projectile({
    position: {
      x: player.position.x + Math.cos(player.rotation) * player.headDistance * player.radius,
      y: player.position.y + Math.sin(player.rotation) * player.headDistance * player.radius,
    },
    velocity: {
      vx: Math.cos(player.rotation) * projectileSpeed,
      vy: Math.sin(player.rotation) * projectileSpeed,
    },
  });
  projectiles.push(newProjectile);

}

const keys = { isWPressed: false, isAPressed: false, isSPressed: false, isDPressed: false, isSpacePressed: false };
let fireInterval = null;
window.addEventListener("keydown", e => {
  let key = e.code;

  if (key === "KeyP") {
    if (isPaused) {
      isPaused = false;
      animate();
    } else {
      isPaused = true;
    }
  }
  if (key === "KeyW" || key === "ArrowUp") {
    keys.isWPressed = true;
  }
  if (key === "KeyA" || key === "ArrowLeft") {
    keys.isAPressed = true;
  }
  if (key === "KeyD" || key === "ArrowRight") {
    keys.isDPressed = true;
  }
  if (key === "KeyS" || key === "ArrowDown") {
    keys.isSPressed = true;
  }
  if (key === "Space") {
    keys.isSpacePressed = true;
    if (!fireInterval) {
      fireInterval = setInterval(FireProjectile, fireRate); // Adjust the interval as needed
    }
  }
});
window.addEventListener("keyup", e => {

  let key = e.code;

  if (key === "KeyW" || key === "ArrowUp") {
    keys.isWPressed = false;
  }
  if (key === "KeyA" || key === "ArrowLeft") {
    keys.isAPressed = false;
  }
  if (key === "KeyD" || key === "ArrowRight") {
    keys.isDPressed = false;
  }
  if (key === "KeyS" || key === "ArrowDown") {
    keys.isSPressed = false;
  }
  if (key === "Space") {
    keys.isSpacePressed = false;
    clearInterval(fireInterval);
    fireInterval = null;
    FireProjectile();
  }
});
function startInterval() {
  intervalId = setInterval(() => {
    let newAsteroid = GenerateRandomAsteroid();
    asteroids.push(newAsteroid);
  }, 500);
}
function startGame() {
  GenerateBackgroundStars(1000, 0.5);
  startInterval();
  animate();
}
function pauseGame() {

}