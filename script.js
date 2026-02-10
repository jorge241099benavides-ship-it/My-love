/* ===================== COUNTER ===================== */
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

/* ================= HEART FIREWORK AUTO ================= */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];

function heartShape(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y:
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  };
}

function spawnFirework() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = Math.min(canvas.width, canvas.height) / 22;

  for (let i = 0; i < Math.PI * 2; i += 0.06) {
    const p = heartShape(i);
    particles.push({
      x: centerX,
      y: centerY,
      vx: p.x * scale * 0.025,
      vy: -p.y * scale * 0.025,
      life: 120,
      alpha: 1
    });
  }
}

setInterval(spawnFirework, 1800);
spawnFirework();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    p.alpha = p.life / 120;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 60, 100, ${p.alpha})`;
    ctx.fill();
  });

  particles = particles.f
