const boxes = document.querySelectorAll('.box');
const msgcontainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');

let playerMoves = [];
let matchPair = 0;
let totalPairs = 12;

const openCard = (box) => {
  if (playerMoves.length < 2 && !box.classList.contains('open')) {
    const randomNumber = box.dataset.value;
    box.innerText = randomNumber;
    box.classList.add('open');
    playerMoves.push(box);

    if (playerMoves.length === 2) {
      checkMatch();
    }
  }
};

const checkMatch = () => {
  const [firstCard, secondCard] = playerMoves;
  if (firstCard.dataset.value === secondCard.dataset.value) {
    msg.innerText = "It's a match!";
    matchPair++;
    playerMoves = [];
    if (matchPair === totalPairs) {
      msg.innerText = "You won the game!";
    }
  } else {
    setTimeout(() => {
      firstCard.innerText = '?';
      secondCard.innerText = '?';
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');
      playerMoves = [];
      msg.innerText = "Try again!";
    }, 1000);
  }
};

const initializeGame = () => {
  const numbers = [];
  for (let i = 0; i < totalPairs; i++) {
    numbers.push(i, i);
  }

  numbers.sort(() => Math.random() - 0.5);

  boxes.forEach((box, index) => {
    box.innerText = '?';
    box.dataset.value = numbers[index];
    box.classList.remove('open');
    box.addEventListener('click', () => openCard(box));
  });
};

initializeGame();
