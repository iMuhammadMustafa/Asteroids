class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 8;
    this.speedModifier = 5;
    this.friction = 0.97;
    this.rotation = 0;
    this.rotationSpeed = 0.05;
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
    ctx.moveTo(this.position.x + this.radius * 3, this.position.y);
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
