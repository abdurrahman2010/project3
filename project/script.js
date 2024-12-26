const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const fireworksCanvas = document.getElementById('fireworks');

const canvasContext = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

const newYear = new Date(new Date().getFullYear() + 1, 0, 1);

function updateTimer() {
    const now = new Date();
    const difference = newYear - now;

    if (difference <= 0) {
        timerElement.textContent = "00:00:00:00";
        messageElement.textContent = "Happy New Year! 🎉";
        startFireworks();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerElement.textContent = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(updateTimer, 1000);

// Fireworks Effect
function startFireworks() {
    const particles = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    function createParticle(x, y) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
            x,
            y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            life: Math.random() * 100 + 50,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function drawParticles() {
        canvasContext.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        particles.forEach((particle, index) => {
            canvasContext.fillStyle = particle.color;
            canvasContext.beginPath();
            canvasContext.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            canvasContext.fill();

            particle.x += particle.dx;
            particle.y += particle.dy;
            particle.life--;

            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(drawParticles);
        }
    }

    setInterval(() => {
        for (let i = 0; i < 20; i++) {
            createParticle(Math.random() * fireworksCanvas.width, Math.random() * fireworksCanvas.height);
        }
    }, 300);

    drawParticles();
}

// Snowflakes Effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 8000);
}

setInterval(createSnowflake, 200);