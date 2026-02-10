/* ========= COUNTER ========= */
const startDate = new Date("2023-12-03T00:00:00"); // CAMBIA LA FECHA

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


/* ========= CANVAS ========= */
const canvas = document.getElementById("tree");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


/* ========= HEART FIREWORK ========= */
let particles = [];

function heartEquation(t) {
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
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < 120; i++) {
    const t = (Math.PI * 2 * i) / 120;
    const h = heartEquation(t);

    particles.push({
      x: cx,
      y: cy,
      vx: h.x * 0.06,
      vy: -h.y * 0.06,
      life: 100
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.fillStyle = "rgba(255, 77, 109, 0.95)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(animate);
}

setInterval(createFirework, 1400);
animate();
