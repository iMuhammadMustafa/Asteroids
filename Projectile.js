const projectileRadius = 3;
const projectileSpeed = playerSpeed * 1.5;
const projectileFriction = 0.97;
const projectileRotationSpeed = 0.05;

class Projectile {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = projectileRadius;
    this.speedModifier = projectileSpeed;
    this.friction = projectileFriction;
    this.rotation = 0;
    this.rotationSpeed = projectileRotationSpeed;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.vx;
    this.position.y += this.velocity.vy;
  }
}

function AnimateProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    projectile.update();

    //Remove projectiles that go off screen
    if (IsOffScreen(projectile)) {
      projectiles.splice(i, 1);
    }
  }
}
