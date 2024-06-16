const clockElement = document.querySelector('#clock');

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const am_pm = (hours >= 12) ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const result = `${hours}:${minutes} ${am_pm}`;
    clockElement.innerHTML = result;
}

updateClock();
setInterval(updateClock, 1000);