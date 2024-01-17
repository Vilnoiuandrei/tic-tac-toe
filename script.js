const x = document.querySelector(".x");
const circle = document.querySelector(".circle");
let squares = Array.from(document.getElementsByClassName("el"));
let restartBtn = document.getElementById("restartBtn");
let bord = document.querySelector(".main-component");
let score = document.getElementById("score");
let scorePLayer1 = 0;
let scorePlayer2 = 0;

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

    if (playerHasWon(spaces) !== false) {
      if (currentPlayer === X_TEXT) {
        scorePLayer1++;
      } else {
        scorePlayer2++;
      }
      score.textContent = `Score:${scorePLayer1}-${scorePlayer2}`;
      bord.classList.add("stop-pres");
      // playerText.innerHTML = `${currentPlayer} has won!`;
    } else if (playerHasWon(spaces) === false && !spaces.includes(null)) {
      // playerText.innerHTML = "Tie";
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
  const emptySpaces = spaces.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);
  //emty spaces

  if (emptySpaces.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
    const aiMove = emptySpaces[randomIndex];

    spaces[aiMove] = ai;
    function displayTextAi() {
      squares[aiMove].innerText = ai;
    }
    setTimeout(displayTextAi, 600);

    if (playerHasWon(spaces) !== false) {
      bord.classList.add("stop-pres");
      scorePlayer2++;
      score.textContent = `Score:${scorePLayer1}-${scorePlayer2}`;

      // playerText.innerHTML = `${ai} has won!`;
    } else if (playerHasWon(spaces) === false && !spaces.includes(null)) {
      // playerText.innerHTML = "Tie";
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

  if (playerHasWon(spaces) !== false) {
    bord.classList.add("stop-pres");
    scorePlayer2++;
    score.textContent = `Score:${scorePLayer1}-${scorePlayer2}`;
  } else if (playerHasWon(spaces) === false && !spaces.includes(null)) {
    // playerText.innerHTML = "Tie";
  }
}

function aiImpossible() {
  let winCheck = function (board, player) {
    for (const condition of winningCombos) {
      let [a, b, c] = condition;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c] &&
        board[a] === player
      ) {
        return true;
      }
    }
    return false;
  };
  const emptySpaces = spaces.reduce((acc, value, index) => {
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

    const winner = playerHasWon(spaces);

    if (winner !== false) {
      bord.classList.add("stop-pres");
      // playerText.innerHTML = `${ai} has won!`;
      scorePlayer2++;
      score.textContent = `Score:${scorePLayer1}-${scorePlayer2}`;
    } else if (winner === false && !spaces.includes(null)) {
      // playerText.innerHTML = "Tie";
    }
  }
  function minimax(board, depth, maximizingPlayer) {
    const emptySpaces = emptyIndexies(board);

    if (winCheck(board, X_TEXT)) {
      return { score: -1 };
    } else if (winCheck(board, O_TEXT)) {
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

function playerHasWon(board) {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (board[a] && board[a] == board[b] && board[a] == board[c]) {
      return [a, b, c];
    }
  }
  return false;
}
playerHasWon(spaces);

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  bord.classList.remove("stop-pres");

  squares.forEach((el) => {
    el.innerText = "";
    el.style.backgroundColor = "";
  });

  // playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}
function resestScore() {
  scorePLayer1 = 0;
  scorePlayer2 = 0;
  score.textContent = `Score:${scorePLayer1}-${scorePlayer2}`;
}
startGame();
