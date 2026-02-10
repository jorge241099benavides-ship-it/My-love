/* ========= COUNTER ========= */
const startDate = new Date("2023-12-03T00:00:00"); // CAMBIA ESTA FECHA

function updateCounter() {
  const now = new Date();
  let diff = now - startDate;

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
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let hearts = [];

function drawHeart(x, y, size, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size, size);
  ctx.globalAlpha = opacity;
  ctx.fillStyle = "#ff4d6d";

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-1, -1, -3, 1, 0, 4);
  ctx.bezierCurveTo(3, 1, 1, -1, 0, 0);
  ctx.fill();
  ctx.restore();
}

function animateTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.3) {
    hearts.push({
      x: canvas.width / 2 + (Math.random() * 40 - 20),
      y: canvas.height,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 1.2 + 0.5,
      opacity: 1
    });
  }

  hearts.forEach(h => {
    h.y -= h.speed;
    h.opacity -= 0.002;
    drawHeart(h.x, h.y, h.size, h.opacity);
  });

  hearts = hearts.filter(h => h.opacity > 0);

  requestAnimationFrame(animateTree);
}

animateTree();
