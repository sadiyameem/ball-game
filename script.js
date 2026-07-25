const playButton = document.getElementById('startGameBtn');
const startGameContainer = document.getElementById('startGame');

playButton.addEventListener('click', () => {
    startGameContainer.style.display = 'none';
    alertTimer();
})

const alertTimer = () => {
    const countDownContainer = document.getElementById('countDownContainer');
    let currentSecond = 3;
    let timerInterval = setInterval(() => {
        countDownContainer.innerHTML = ``;
        countDownContainer.innerHTML = `<h1>${currentSecond}</h1>`;
        currentSecond -= 1;
        if (currentSecond < 0) {
            clearInterval(timerInterval);
            countDownContainer.innerHTML = ``;
        }
    },1000)
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Ball() {
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 10) + 35);
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
}