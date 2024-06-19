//Fullscreen button input
const fullscreenButton = document.getElementById("fullscreen-button");
var isFullScreen = false;

fullscreenButton.addEventListener("click", function (e) {
    if(!isFullScreen) document.documentElement.requestFullscreen().catch((e) => console.log(e));
    else document.exitFullscreen().catch((e) => console.log(e));

    isFullScreen = !isFullScreen;
})

//Clock
const clockElement = document.getElementById('clock');

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const am_pm = (hours >= 12) ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    clockElement.innerHTML = `${hours}:${minutes} ${am_pm}`;
}

updateClock();
setInterval(updateClock, 1000);

//Mouse follower
const coords = {x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

circles.forEach(function(circle) {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', function(e) {
    coords.x = e.clientX;
    coords.y = e.clientY;

    const cursorType = window.getComputedStyle(e.target).cursor;

    if(cursorType === "pointer") {
        circles.forEach((circle) => {circle.classList.add('animate')});
    } else {
        circles.forEach((circle) => {circle.classList.remove('animate')});
    }
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function(circle, index) {
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.7;
        y += (nextCircle.y - y) * 0.7;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

//Particles
const canvas = document.querySelector('canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const ctx = canvas.getContext('2d');

const particles = [];
for (let i = 0; i < 28; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        color: `hsl(${Math.random() * 360}, 50%, 50%, 50%)`
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
        }
    });

    requestAnimationFrame(animate);
}

animate();

//Tilt effect
const cards = document.querySelectorAll(".tilt");

let scrollY = 0;
window.addEventListener('scroll', () => {scrollY = document.documentElement.scrollTop;});

for(let i = 0; i < cards.length; i++) {
    const container = document.createElement('div');
    container.setAttribute('class', 'tilt-container');
    cards[i].parentElement.insertBefore(container, cards[i].parentElement.firstChild);
    container.appendChild(cards[i]);

    container.addEventListener("mousemove", (e) => {
        const innerX = e.clientX - container.offsetLeft;
        const innerY = e.clientY - container.offsetTop + scrollY;
        const x = cards[i].offsetWidth / 2;
        const y = cards[i].offsetHeight / 2;
        const intensityX = 15;
        const intensityY = 15;
        let convertX = ((innerX - x) * intensityX) / x;
        let convertY = ((innerY - y) * intensityY) / y;
        cards[i].style.transform = `rotateY(${convertX * -1}deg) rotateX(${convertY}deg)`;
    });

    container.addEventListener("mouseout", (e) => {
       cards[i].style.transform = 'rotateY(0deg)';
    });
}