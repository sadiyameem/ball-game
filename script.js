const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');

let score = 0;
let timeLeft = 30;
let fruits = [];
const fruitTypes = ['⚠️','💣', '🍎', '🍐', '🍊', '🍋', '🥥', '🍉', '🍍'];

function createFruit() {
    if (timeLeft <= 0) return;

    const fruit = document.createElement('div');
    fruit.className = 'fruit';
    const type = fruitTypes[Math.random() * fruitTypes.length];
    fruit.textContent = type;

    const colors = [
    '#ff0000',
    '#ff9900',
    '#ffff00',
    '#ff0066',
    '#9900ff',
    '#ff0066',
    '#ffcc99',
    '#ffff00',
];
fruit.style.background = colors[type] || '#ffffff';

fruits.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
fruit.style.bottom = '-60px';
game.appendChild(fruits);

let position = -60;
const speed = Math.random() * 3 + 2;
const angle = Math.random() * 20 - 10;
let rotation = 0;

const animate = setInterval(() => {
    position += speed;
    rotation += angle;
    fruit.style.bottom = `${position}px`;
    fruit.style.transform = `rotate(${rotation}deg)`;

    if (position > window.innerHeight) {
        clearInterval(animate);
        fruit.remove();
    }
}, 20);

fruit.addEventListener('click', () => {
    clearInterval(animate);
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    fruit.style.transform = `scale(1.5)`;
    fruit.style.opacity = '0';
    setTimeout(() => fruit.remove(), 200);

    if (score >= 200) {
        winGame();
    }
});

fruits.push(fruit);
setTimeout(createFruit, Math.random() * 800 + 200);


const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}, 1000);

function endGame() {
    message.textContent = `GAME OVER! Score: ${score}`;
    message.style.color = `#ff0000`;
    message.style.textShadow = `0 0 10px #ff0000`;
    message.style.display = 'block';

    setTimerout(() => {
        if (confirm(`GAME OVER! Your score: ${score}\nPlay again?`)) {
            location.reload();
        }
    }, 1000);
}

function winGame() {
    clearInterval(timer);
    message.style.display = 'block';

    setTimeout(() => {
        if (confirm(`You won with ${score} points!\nPlay again?`)) {
            location.reload();
        }
    }, 1000);
}

createFruit();
}

// const colors = [
//     '#ff0000',
//     '#ff9900',
//     '#ffff00',
//     '#ff0066',
//     '#9900ff',
//     '#ff0066',
//     '#ffcc99',
//     '#ffff00',
// ];
// fruit.style.background = colors[type] || '#ffffff';

// fruits.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
// fruit.style.bottom = '-60px';
// game.appendChild(fruits);

// let position = -60;
// const speed = Math.random() * 3 + 2;
// const angle = Math.random() * 20 - 10;
// let rotation = 0;

// const animate = setInterval(() => {
//     position += speed;
//     rotation += angle;
//     fruit.style.bottom = `${position}px`;
//     fruit.style.transform = `rotate(${rotation}deg)`;

//     if (position > window.innerHeight) {
//         clearInterval(animate);
//         fruit.remove();
//     }
// }, 20);

// fruit.addEventListener('click', () => {
//     clearInterval(animate);
//     score += 10;
//     scoreDisplay.textContent = `Score: ${score}`;
//     fruit.style.transform = `scale(1.5)`;
//     fruit.style.opacity = '0';
//     setTimeout(() => fruit.remove(), 200);

//     if (score >= 200) {
//         winGame();
//     }
// });

// fruits.push(fruit);
// setTimeout(createFruit, Math.random() * 800 + 200);


// const timer = setInterval(() => {
//     timeLeft--;
//     timerDisplay.textContent = `Time: ${timeLeft}`;

//     if (timeLeft <= 0) {
//         clearInterval(timer);
//         endGame();
//     }
// }, 1000);

// function endGame() {
//     message.textContent = `GAME OVER! Score: ${score}`;
//     message.style.color = `#ff0000`;
//     message.style.textShadow = `0 0 10px #ff0000`;
//     message.style.display = 'block';

//     setTimerout(() => {
//         if (confirm(`GAME OVER! Your score: ${score}\nPlay again?`)) {
//             location.reload();
//         }
//     }, 1000);
// }

// function winGame() {
//     clearInterval(timer);
//     message.style.display = 'block';

//     setTimeout(() => {
//         if (confirm(`You won with ${score} points!\nPlay again?`)) {
//             location.reload();
//         }
//     }, 1000);
// }

// createFruit();