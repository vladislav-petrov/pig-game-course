'use strict';

const currentBlock = document.querySelectorAll('.current');
const scoreElement0 = document.querySelector('#score--0');
const scoreElement1 = document.querySelector('#score--1');
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');
const buttonNewGameElement = document.querySelector('.btn--new');
const buttonRollElement = document.querySelector('.btn--roll');
const buttonHoldElement = document.querySelector('.btn--hold');
const diceElement = document.querySelector('.dice');

const scores = new Array();
let activePlayer = 0;
let currentScore = 0;

const init = function() {
    currentScore = 0;
    scores[0] = 0;
    scores[1] = 0;
    scoreElement0.textContent = 0;
    scoreElement1.textContent = 0;
    diceElement.classList.add('hidden');
    if (document.querySelector(`.player--${activePlayer}`).classList.contains('player--winner')) {
        buttonRollElement.classList.remove('hidden');
        buttonHoldElement.classList.remove('hidden');
        for (let i = 0; i < currentBlock.length; i++) {
            currentBlock[i].classList.remove('hidden');
        }
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
        document.querySelector(`#name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
    }
    if (activePlayer !== 0) changeActivePlayer();
}

const changeActivePlayer = function() {
    playerElement0.classList.toggle('player--active');
    playerElement1.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
}

const displayWinner = function() {
    buttonRollElement.classList.add('hidden');
    buttonHoldElement.classList.add('hidden');
    diceElement.classList.add('hidden');
    for (let i = 0; i < currentBlock.length; i++) {
        currentBlock[i].classList.add('hidden');
    }
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`#name--${activePlayer}`).textContent = '👑 Winner!'
}

const startNewGame = function() {
    init();
}

const rollDice = function() {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceElement.src = `dice-${diceRoll}.png`;
    if (diceElement.classList.contains('hidden')) diceElement.classList.remove('hidden');
    if (diceRoll !== 1) {
        currentScore += diceRoll;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        changeActivePlayer();
    }
}

const holdScore = function() {
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        displayWinner();
    } else {
        changeActivePlayer();
    }
}

init();

buttonNewGameElement.addEventListener('click', startNewGame);
buttonRollElement.addEventListener('click', rollDice);
buttonHoldElement.addEventListener('click', holdScore);