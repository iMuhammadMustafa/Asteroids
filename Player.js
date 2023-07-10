const playerRadius = 8;
const playerHeadDistance = 3;
const playerSpeed = 5;
const playerFriction = 0.97;
const playerRotationSpeed = 0.05;

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

    // this.head = { x: this.position.x + this.radius * 3, y: this.position.y };
    // this.baseStart = { x: this.position.x - this.radius, y: this.position.y - this.radius };
    // this.baseEnd = { x: this.position.x - this.radius, y: this.position.y + this.radius };
  }

  draw() {
    //Rotate
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.translate(-this.position.x, -this.position.y);

    //Draw Center
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();

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
  }
}
