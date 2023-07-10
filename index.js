const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.speedModifier = 5;
    this.rotation = 0;
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

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  player.velocity = { vx: 0, vy: 0 };

  if (keys.isWPressed) {
    player.velocity.vx += Math.cos(player.rotation) * player.speedModifier;
    player.velocity.vy += Math.sin(player.rotation) * player.speedModifier;
  }
  if (keys.isSPressed) {
    player.velocity.vx -= Math.cos(player.rotation) * player.speedModifier;
    player.velocity.vy -= Math.sin(player.rotation) * player.speedModifier;
  }
  if (keys.isAPressed) {
    player.rotation -= 0.1;
  }
  if (keys.isDPressed) {
    player.rotation += 0.1;
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
animate();
