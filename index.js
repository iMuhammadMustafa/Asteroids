const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.rotation = 0;
  }

  draw() {
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
  }
}

const player = new Player({ position: { x: width / 2, y: height / 2 }, velocity: { vx: 0, vy: 0 } });
player.draw();
