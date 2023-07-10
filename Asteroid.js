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
