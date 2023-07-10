const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function DrawBackground() {
  for (let i = 0; i < 50; i++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    let radius = 1;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}

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

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    //Remove projectiles that go off screen
    if (
      projectile.position.x + projectile.radius < 0 ||
      projectile.position.x - projectile.radius > width ||
      projectile.position.y + projectile.radius < 0 ||
      projectile.position.y - projectile.radius > height
    ) {
      projectiles.splice(i, 1);
    }
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update();

    //Remove asteroids that go off screen
    if (
      asteroid.position.x + asteroid.radius < 0 ||
      asteroid.position.x - asteroid.radius > width ||
      asteroid.position.y + asteroid.radius < 0 ||
      asteroid.position.y - asteroid.radius > height
    ) {
      asteroids.splice(i, 1);
    }
  }

  //Check for collisions between asteroids and projectiles
  for (let i = asteroids.length - 1; i >= 0; i--) {
    let asteroid = asteroids[i];
    for (let j = projectiles.length - 1; j >= 0; j--) {
      let projectile = projectiles[j];

      let xDifference = asteroid.position.x - projectile.position.x;
      let yDifference = asteroid.position.y - projectile.position.y;
      let distance = Math.sqrt(xDifference ** 2 + yDifference ** 2);
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

  //Check for collisions between asteroids and player
  for (let i = asteroids.length - 1; i >= 0; i--) {
    let asteroid = asteroids[i];
  }

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

const player = new Player({ position: { x: width / 2, y: height / 2 }, velocity: { vx: 0, vy: 0 } });
player.draw();

const projectiles = [];
const asteroids = [];

setInterval(() => {
  let newAsteroid = GenerateRandomAsteroid();
  asteroids.push(newAsteroid);
}, 500);

animate();
