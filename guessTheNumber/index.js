let randomNumber;
randomnNum()

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.result');
const win = document.querySelector('.win');


const p = document.createElement('p');
const btn = document.createElement('button')
btn.classList.add('newGameBtn')

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        // console.log(guess);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);

        if (guess === randomNumber) {
            cleanupInput(guess);
            displayMessage(`You guessed it right!`);
            endGame();
        } else if (numGuess === 10) {
            cleanupInput(guess);
            displayMessage(`Game over. The random number was ${randomNumber}`);
            endGame();
        } else {
            cleanupInput(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is TOO low`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is TOO high`);
    }
}

function cleanupInput(guess) {
    userInput.value = '';
    guessSlot.innerHTML = `${guess}, `;
    numGuess++;
    remaining.textContent = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.textContent = message;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', true);
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`
    btn.innerHTML = `New Game`
    startOver.appendChild(p);
    win.appendChild(lowOrHi)
    startOver.appendChild(btn)
    playGame = false;
    newGame();
}

function randomnNum() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    // console.log(randomNumber);
}

function newGame() {
    const newGameButton = document.querySelector('button');
    newGameButton.addEventListener('click', function () {
        randomnNum()
        // randomNumber = Math.floor(Math.random() * 100) + 1;
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.textContent = '10';
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        win.removeChild(lowOrHi)
        startOver.removeChild(btn);
        playGame = true;
    });
}
