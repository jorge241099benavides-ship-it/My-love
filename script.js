/* ========= COUNTER ========= */
const startDate = new Date("2023-12-03T00:00:00"); // CAMBIA ESTA FECHA

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("counter").textContent =
    `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

setInterval(updateCounter, 1000);
updateCounter();


/* ========= HEART TREE ========= */
const canvas = document.getElementById("tree");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let growth = 0;

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = "#ff4d6d";
  ctx.beginPath();

  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size * 2);
  ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);

  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // CRECIMIENTO DEL TRONCO
  if (growth < canvas.height * 0.75) {
    growth += 1.2;

    particles.push({
      x: canvas.width / 2 + (Math.random() * 30 - 15),
      y: canvas.height - growth,
      size: Math.random() * 6 + 6,
      opacity: 1
    });
  }

  particles.forEach(p => {
    drawHeart(p.x, p.y, p.size, p.opacity);
    p.opacity -= 0.002;
  });

  particles = particles.filter(p => p.opacity > 0);

  requestAnimationFrame(animate);
}

animate();
