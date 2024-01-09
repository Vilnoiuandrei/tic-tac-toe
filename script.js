const x = document.querySelector(".x");
const circle = document.querySelector(".circle");
let squares = Array.from(document.getElementsByClassName("el"));
let restartBtn = document.getElementById("restartBtn");
let bord = document.querySelector(".main-component");

let gameMode = "Multiplayer";
let dificulty = document.querySelector("select");
dificulty.addEventListener("change", function () {
  restart();
  return (gameMode = dificulty.options[dificulty.selectedIndex].text);
});
//selecting game mode

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let ai = O_TEXT;
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
    } else if (playerHasWon() === false && !spaces.includes(null)) {
      playerText.innerHTML = "Tie";
    } else {
      if (gameMode === "Multiplayer") {
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
      }
      if (gameMode === "Eazy") {
        aiEazy();
      }
      if (gameMode === "Medium") {
        aiMedium();
      }
    }
  }
}
function aiEazy() {
  const emptySpaces = spaces.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptySpaces.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
    const aiMove = emptySpaces[randomIndex];

    spaces[aiMove] = ai;
    function displayTextAi() {
      squares[aiMove].innerText = ai;
    }
    setTimeout(displayTextAi, 600);

    if (playerHasWon() !== false) {
      bord.classList.add("stop-pres");
      playerText.innerHTML = `${ai} has won!`;
    } else if (playerHasWon() === false && !spaces.includes(null)) {
      playerText.innerHTML = "Tie";
    }
  }
}
function aiMedium() {
  function aiMove(n) {
    spaces[n] = ai;
    function displayTextAi() {
      squares[n].innerText = ai;
    }
    setTimeout(displayTextAi, 600);
  }
  if (spaces[4] === null) {
    aiMove(4);
  } else if (spaces[0] === null) {
    aiMove(0);
  } else if (spaces[2] === null) {
    aiMove(2);
  } else if (spaces[6] === null) {
    aiMove(6);
  } else if (spaces[8] === null) {
    aiMove(8);
  } else if (spaces[1] === null) {
    aiMove(1);
  } else if (spaces[3] === null) {
    aiMove(3);
  } else if (spaces[5] === null) {
    aiMove(5);
  } else if (spaces[7] === null) {
    aiMove(7);
  }

  if (playerHasWon() !== false) {
    bord.classList.add("stop-pres");
    playerText.innerHTML = `${ai} has won!`;
  } else if (playerHasWon() === false && !spaces.includes(null)) {
    playerText.innerHTML = "Tie";
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
