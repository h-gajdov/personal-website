const coords = {x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

let debug = 0.5;

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