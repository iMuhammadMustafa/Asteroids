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

  if (keys.isWPressed) {
    player.velocity.vx = Math.cos(player.rotation) * player.speedModifier;
    player.velocity.vy = Math.sin(player.rotation) * player.speedModifier;
  } else if (!keys.isWPressed) {
    player.velocity.vx *= player.friction;
    player.velocity.vy *= player.friction;
  }
  if (keys.isSPressed) {
    player.velocity.vx = -Math.cos(player.rotation) * player.speedModifier;
    player.velocity.vy = -Math.sin(player.rotation) * player.speedModifier;
  }
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

animate();
