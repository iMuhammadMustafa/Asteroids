const playerRadius = 8;
const playerHeadDistance = 3;
const playerSpeed = 8;
const playerFriction = 0.97;
const playerRotationSpeed = 0.1;
let fireRate = 100;

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = playerRadius;
    this.speedModifier = playerSpeed;
    this.friction = playerFriction;
    this.rotation = 0;
    this.rotationSpeed = playerRotationSpeed;
    this.headDistance = playerHeadDistance;
    this.score = 0;
  }

  draw() {
    //Rotate
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);
    //Draw Player
    ctx.beginPath();
    ctx.moveTo(this.position.x + this.radius * this.headDistance, this.position.y);
    ctx.lineTo(this.position.x - this.radius, this.position.y - this.radius);
    ctx.lineTo(this.position.x - this.radius, this.position.y + this.radius);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.restore();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.vx;
    this.position.y += this.velocity.vy;

    this.head = { x: this.position.x + this.radius * this.headDistance, y: this.position.y };
    this.baseStart = { x: this.position.x - this.radius, y: this.position.y - this.radius };
    this.baseEnd = { x: this.position.x - this.radius, y: this.position.y + this.radius };
  }
}
