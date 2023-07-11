const asteroidsRadius = 50 * Math.random() + 10;
const asteroidsSpeed = 10 * Math.random() + 1;
const asteroidsFriction = 0.97;
const asteroidsRotationSpeed = 0.05;

class Asteroid {
  constructor({ position, velocity, radius }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.speedModifier = asteroidsSpeed;
    this.friction = asteroidsFriction;
    this.rotation = 0;
    this.rotationSpeed = asteroidsRotationSpeed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.vx;
    this.position.y += this.velocity.vy;
  }
}

function AnimateAsteroids() {
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i];
    asteroid.update();

    //Remove asteroids that go off screen
    if (IsOffScreen(asteroid)) {
      asteroids.splice(i, 1);
    }
  }
}

function GenerateRandomAsteroid() {
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

  return newAsteroid;
}
