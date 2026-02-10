/* ===== COUNTER ===== */
const startDate = new Date("2023-12-03T00:00:00"); // CAMBIÁ AQUÍ LA FECHA REAL

const counterEl = document.getElementById("counter");

function updateCounter() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  counterEl.textContent =
    `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

setInterval(updateCounter, 1000);
updateCounter();

/* ===== HEART FIREWORK ===== */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let t = 0;

function drawHeart(x, y, size) {
  ctx.beginPath();
  for (let i = 0; i < Math.PI * 2; i += 0.05) {
    const px =
      size * 16 * Math.pow(Math.sin(i), 3) + x;
    const py =
      -size *
        (13 * Math.cos(i) -
          5 * Math.cos(2 * i) -
          2 * Math.cos(3 * i) -
          Math.cos(4 * i)) +
      y;
    ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "rgba(255, 77, 109, 0.8)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const size = 10 + Math.sin(t) * 2;

  drawHeart(centerX, centerY, size);

  t += 0.03;
  requestAnimationFrame(animate);
}

animate();
