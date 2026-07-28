const playButton = document.getElementById('startGameBtn');
const startGameContainer = document.getElementById('startGame');
const inGameContainer = document.getElementById('inGAmeContainer');

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        isGamePause = false;
    } else {
        isGamePause = true;
    }
})

playButton.addEventListener('click', () => {
    startGameContainer.style.display = 'none';
    inGameContainer.style.display = 'flex';
    alertTimer();
    settimeout(() => {
        animate();
        // startRenderingBallInterval();
        startGameTimer();
    }, 4000)
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
            isGamePause = false;
        }
    },1000)
}

const startGameTimer = () => {
    let minutesInGame = 2;
    let totalTime = minutesInGame * 60;
    let interval = setInterval(() => {
        let min = Math.floor(totalTime / 60);
        let sec = totalTime % 60;

        document.getElementById('getMinuteAndSecond').innerHTML = `${min < 10? '0' + min : min} : ${min < 10? '0' + sec : sec}`
        totalTime--;
        if (totalTime < 0) {
            document.getElementById('gameMinuteAndSecond').innerHTML = `00 : 00`;
            isGameEnd = true;
            isGameStarted = false;
            ballArray = [];
            ballParticlesArray = [];
            enemyBombArray = [];
        }
    },1000)
}

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

const updateScore = (noOfScore) => {
    if (noOfScore + score < 0) {
        score = 0;
        return
    }
    score = score + noOfScore;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        document.getElementById('highScore').innerHTML = score;
        document.getElementById('homeHighScore').innerHTML = score;
    }
    document.getElementById('score').innerHTML = score;
}

updateScore(0);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballArray = [];
let ballParticlesArray = [];
let enemyBombArray = [];

function EnemyBomb() {
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 10) + 40);
    this.color = `black`;
    
    
    this.speedY = 10;
    this.speedX = Math.round((Math.random() - 0.5) * 4);

    this.update = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.lineWidth = 6;
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.stroke();
        context.strokeStyle = 'red';
        context.fill();
    }
}

function Ball() {
    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 10) + 35);
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    
    
    this.speedY = 10;
    this.speedX = Math.round((Math.random() - 0.5) * 4);

    this.update = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

function BallParticles(x,y,color) {
    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 3 + 8);
    this.color = color;
    
    
    this.speedY = Math.random() * 2 - 2;
    this.speedX = Math.round((Math.random() - 0.5) * 10);

    this.update = () => {
        if (this.size > .2) {
            this.size -= .1;
        }
        this.y += this.speedY;
        this.x += this.speedX;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI * 2);
        context.fill();
    }
}

let strikeCount = 1;
let lastBallSlice;

function renderBalls() {
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].draw();
        ballArray[i].update();

        let distanceBetweenMouseAndBall = Math.hypot(mouseX - ballArray[i].x,mouseY - ballArray[1].y)

        if (distanceBetweenMouseAndBall - ballArray[i].size < 1) {


            for (let index = 0; index < Array.length; index++) {
                ballParticlesArray.push(new BallParticles(ballArray[i].x,ballArray[i].y,ballArray[i].color));
            }
            let timeNow = new Date().getTime()
            if (timeNow - lastBallSlice < 500) {
                strikeCount += 1;
                document.getElementById('strikeCountDiv').innerHTML = `<h1 class= "strikeCount">x</h2>`
            } else {
                strikeCount = 1;
                document.getElementById('strikeCountDiv').innerHTML = `<h1 class= "strikeCount">x</h2>`
            }

            lastBallSlice = new Date().getTime();
            let scoreToUpdate = (ballArray[i].size < 40? 3 : 5);
            updateScore(scoreToUpdate)

            ballArray.splice(i,1);
            i--;
            return
        }

        if (ballArray[i].y > window.innerHeight + 10) {
            ballArray.splice(i,1);
            i--;
        }
    }
}

function renderEnemyBombs() {
    for (let i = 0; i < enemyBombArray.length; i++) {
        enemyBombArray[i].draw();
        enemyBombArray[i].update();

        let distanceBetweenMouseAndBomb = Math.hypot(mouseX - enemyBombArray[i].x,mouseY - enemyBallArray[1].y)

        if (distanceBetweenMouseAndBomb - enemyBombArray[i].size < 1) {

            if (isGamePause) {
                return
            }

            ballArray = [];
            ballParticlesArray = [];
            isGamePause = [];
            alertTimer();
            updateScore(-7);
            enemyBombArray.splice(i,1);
            i--;
            return
        }

        if (enemyBombArray[i].y > window.innerHeight + 10) {
            enemyBombArray.splice(i,1);
            i--;
        }
    }
}

function renderBallParticles() {
    for (let i = 0; i < ballParticlesArray.length; i++) {
        ballParticlesArray[i].draw();
        ballParticlesArray[i].update();

        if (ballParticlesArray[i].y <= .2) {
            ballParticlesArray.splice(i,1);
            i--;
        }
    }
}

let numberOfBallsToRender = [1,2,3,4,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1];

const startRenderingBallInterval = () => {
    let interval = setInterval(() => {
        if (isGamePause) {
            return
        }
        const numberOfBalls = Math.round(Math.random() * numberOfBallsToRender.length);
        let indexOf = numberOfBallsToRender[numberOfBalls];

        if (numberOfBalls >= Math.floor(numberOfBallsToRender.length / 2)) {
            enemyBombArray.push(new EnemyBomb())
        }

        for (let i = 0; i < indexOf; i++) {
            ballArray.push(new Ball())
        }
    }, 1000)
}

let isGameStarted = false;
let isGamePause = false;
let isGameEnd = false;

let animationId;

function animate() {
    context.fillStyle = 'rgba(24, 28, 31, .5)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    renderBalls();
    renderBallParticles();
    renderEnemyBombs();
    renderMouseLines();
    animationId = requestAnimationFrame(animate);
}

// enemyBombArray.push(new EnemyBall());

let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let isMouseClicked = false;

let linesArray = [];

function renderMouseLines() {
    for (let i = 0; i < linesArray.length; i++) {
        contextstrokeStyle = 'white';
        context.beginPath();
        context.moveTo(linesArray[i].x, linesArray[i].y);
        context.lineTo(linesArray[i].pMouseX, linesArray[i].pMouseY);
        context.stroke();
        context.lineWidth = 4;
        context.closePath();
    }
    if (linesArray.length > 4) {
        linesArray.shift();
        linesArray.shift();
    }
}

canvas.addEventListener('mousedown', (e) => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseClicked = true;
})

canvas.addEventListener('mousemove', (e) => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseClicked = true;
    // linesArray.push((x: mouseX, y:mouseY,pMouseX: prevMouseX,pMouseY: prevMouseY))
})

canvas.addEventListener('mouseup', (e) => {
    // prevMouseX = mouseX;
    // prevMouseY = mouseY;
    mouseX = 0;
    mouseY = 0;
    linesArray = [];
    isMouseClicked = false;
})

canvas.addEventListener('mouseout', (e) => {
    // prevMouseX = mouseX;
    // prevMouseY = mouseY;
    mouseX = 0;
    mouseY = 0;
    linesArray = [];
    isMouseClicked = false;
})

