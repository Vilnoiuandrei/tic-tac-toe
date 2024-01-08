const x = document.querySelector(".x");
const circle = document.querySelector(".circle");
let squares = Array.from(document.getElementsByClassName("el"));
let restartBtn = document.getElementById("restartBtn");
let bord = document.querySelector(".main-component");

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  squares.forEach((el) => el.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      bord.classList.add("stop-pres");
      playerText.innerHTML = `${currentPlayer} has won!`;
    }
    if (playerHasWon() === false && !spaces.includes(null)) {
      playerText.innerHTML = "Tie";
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}
playerHasWon();

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  bord.classList.remove("stop-pres");

  squares.forEach((el) => {
    el.innerText = "";
    el.style.backgroundColor = "";
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame();
