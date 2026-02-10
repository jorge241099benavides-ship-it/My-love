/* ===================== COUNTER ===================== */
const startDate = new Date("2023-12-03T00:00:00"); // AJUSTÁ LA FECHA REAL

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

/* ================= HEART FIREWORK ================= */
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

function createFirework() {
  particles = [];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = Math.min(canvas.width, canvas.height) / 25;

  for (let i = 0; i < Math.PI * 2; i += 0.08) {
    const pos = heartShape(i);
    particles.push({
      x: centerX,
      y: centerY,
      vx: pos.x * scale * 0.03,
      vy: -pos.y * scale * 0.03,
      life: 100,
      alpha: 1
    });
  }
}

createFirework();
setInterval(createFirework, 2200);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    p.alpha = p.life / 100;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 77, 109, ${p.alpha})`;
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(animate);
}

animate();
