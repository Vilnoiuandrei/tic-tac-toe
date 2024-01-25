const x = document.querySelector(".x");
const circle = document.querySelector(".circle");
let squares = Array.from(document.getElementsByClassName("el"));
let restartBtn = document.getElementById("restartBtn");
let bord = document.querySelector(".main-component");
let score = document.getElementById("score");
let scorePLayer1 = document.getElementById("player1");
let scorePlayer2 = document.getElementById("player2");
let score1 = 0;
let score2 = 0;
const winningMessage = document.querySelector(".winning-message");

let gameMode = "Multiplayer";
let dificulty = document.querySelector("select");
dificulty.addEventListener("change", function () {
  resestScore();
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

    if (playerHasWon(spaces, currentPlayer) !== false) {
      if (currentPlayer === X_TEXT) {
        score1++;
        scorePLayer1.textContent = score1;
        scorePLayer1.classList.add("score-animation");
        setTimeout(() => {
          scorePLayer1.classList.remove("score-animation");
          winningMessage.classList.remove("hide");
        }, 1000);
      } else {
        score2++;
        scorePlayer2.textContent = score2;
        scorePlayer2.classList.add("score-animation");
        setTimeout(() => {
          scorePlayer2.classList.remove("score-animation");
          winningMessage.classList.remove("hide");
        }, 1000);
      }

      bord.classList.add("stop-pres");

      winningMessage.innerHTML = `${currentPlayer} has won`;
    } else if (
      playerHasWon(spaces, currentPlayer) === false &&
      !spaces.includes(null)
    ) {
      winningMessage.classList.remove("hide");
      winningMessage.innerHTML = "Tie";
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
      if (gameMode === "Impossible") {
        aiImpossible();
      }
    }
  }
}
function aiEazy() {
  let emptySpaces = spaces.reduce((acc, value, index) => {
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

    checkWinAi();
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

  checkWinAi();
}

function aiImpossible() {
  let emptySpaces = spaces.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);
  if (emptySpaces.length > 0) {
    const bestMove = minimax(spaces.slice(), 0, true).index; // Call minimax
    spaces[bestMove] = ai;

    function displayTextAi() {
      squares[bestMove].innerText = ai;
    }

    setTimeout(displayTextAi, 600);
  }
  function minimax(board, depth, maximizingPlayer) {
    const emptySpaces = emptyIndexies(board);

    if (playerHasWon(board, X_TEXT)) {
      return { score: -1 };
    } else if (playerHasWon(board, O_TEXT)) {
      return { score: 1 };
    } else if (emptySpaces.length === 0) {
      return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < emptySpaces.length; i++) {
      const move = {};
      move.index = emptySpaces[i];
      board[emptySpaces[i]] = maximizingPlayer ? O_TEXT : X_TEXT;

      const result = minimax(board, depth + 1, !maximizingPlayer);
      move.score = result.score;

      board[emptySpaces[i]] = null;
      moves.push(move);
    }

    let bestMove;
    if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }
  checkWinAi();

  function emptyIndexies(board) {
    return board.reduce((acc, value, index) => {
      if (!value) {
        acc.push(index);
      }
      return acc;
    }, []);
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
function checkWinAi() {
  if (playerHasWon(spaces, ai) !== false) {
    bord.classList.add("stop-pres");
    score2++;
    scorePlayer2.textContent = score2;
    scorePlayer2.classList.add("score-animation");
    setTimeout(() => {
      scorePlayer2.classList.remove("score-animation");
      winningMessage.classList.remove("hide");
    }, 2000);
    winningMessage.innerHTML = `${ai} has won`;
  }

  if (playerHasWon(spaces, ai) === false && !spaces.includes(null)) {
    setTimeout(displayWinMes, 2400);
    winningMessage.innerHTML = "Tie";
  }
}

let playerHasWon = function (board, player) {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c] &&
      board[a] === player
    ) {
      return [a, b, c];
    }
  }
  return false;
};
playerHasWon(spaces, currentPlayer);

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  bord.classList.remove("stop-pres");
  winningMessage.classList.add("hide");

  squares.forEach((el) => {
    el.innerText = "";
    el.style.backgroundColor = "";
  });

  currentPlayer = X_TEXT;
}
function resestScore() {
  score1 = 0;
  score2 = 0;
  scorePLayer1.textContent = score1;
  scorePlayer2.textContent = score2;
}
startGame();
