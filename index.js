const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
  const positionIndex = Math.floor(Math.random() * 4);
  let x, y, vx, vy;
  let radius = 50 * Math.random() + 10;

  switch (positionIndex) {
    // Top of screen
    case 0:
      x = Math.random() * width;
      y = 0 - radius;
      vx = Math.random() * asteroidsSpeed;
      vy = Math.random() * asteroidsSpeed;
      break;
    // Right of screen
    case 1:
      x = width + radius;
      y = Math.random() * height;
      vx = -Math.random() * asteroidsSpeed;
      vy = Math.random() * asteroidsSpeed;
      break;
    // Bottom of screen
    case 2:
      x = Math.random() * width;
      y = height + radius;
      vx = Math.random() * asteroidsSpeed;
      vy = -Math.random() * asteroidsSpeed;
      break;
    // Left of screen
    case 3:
      x = 0 - radius;
      y = Math.random() * height;
      vx = Math.random() * asteroidsSpeed;
      vy = Math.random() * asteroidsSpeed;
      break;
    default:
      break;
  }

  const newAsteroid = new Asteroid({
    position: { x, y },
    velocity: { vx, vy },
    radius,
  });

  console.log(newAsteroid.radius);
  asteroids.push(newAsteroid);
}, 500);

animate();
