function GenerateBackground() {
  for (let i = 0; i < 500; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let radius = 0.5;

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
      }
    }
  }
}

const keys = { isWPressed: false, isAPressed: false, isSPressed: false, isDPressed: false };
window.addEventListener("keydown", e => {
  switch (e.code) {
    case "KeyP":
      if (isPaused) {
        isPaused = false;
        animate();
      } else {
        isPaused = true;
      }
      break;
    case "KeyW":
    case "ArrowUp":
      keys.isWPressed = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.isAPressed = true;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.isSPressed = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.isDPressed = true;
      break;
    case "Space":
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
      break;
    default:
      break;
  }
});
window.addEventListener("keyup", e => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      keys.isWPressed = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.isAPressed = false;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.isSPressed = false;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.isDPressed = false;
      break;
    default:
      break;
  }
});
function HandleKeyPress() {
  if (keys.isWPressed) {
    player.velocity.vx = Math.cos(player.rotation) * player.speedModifier;
    player.velocity.vy = Math.sin(player.rotation) * player.speedModifier;
  } else if (!keys.isWPressed) {
    player.velocity.vx *= player.friction;
    player.velocity.vy *= player.friction;
  }
  //   if (keys.isSPressed) {
  //     player.velocity.vx = -Math.cos(player.rotation) * player.speedModifier;
  //     player.velocity.vy = -Math.sin(player.rotation) * player.speedModifier;
  //   }
  if (keys.isAPressed) {
    player.rotation -= player.rotationSpeed;
  }
  if (keys.isDPressed) {
    player.rotation += player.rotationSpeed;
  }
}
