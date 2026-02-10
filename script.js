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


/* ========= CANVAS SETUP ========= */
const canvas = document.getElementById("tree");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


/* ========= HEART FIREWORK ========= */
let particles = [];

function createHeartFirework() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  for (let i = 0; i < 120; i++) {
    const angle = (Math.PI * 2 * i) / 120;
    const r = 12 * (1 - Math.sin(angle));

    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * r * 0.15,
      vy: Math.sin(angle) * r * 0.15,
      life: 100
    });
  }
}

function drawHeartParticle(p) {
  ctx.fillStyle = "rgba(255, 77, 109, 0.9)";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    drawHeartParticle(p);
  });

  particles = particles.filter(p => p.life > 0);

  requestAnimationFrame(animate);
}

/* ========= START ========= */
setInterval(createHeartFirework, 1300);
animate();
