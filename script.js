const yourScore = document.getElementById("yourScore");
const computerScore = document.getElementById("computerScore");
const answer = document.querySelector(".middleSection");
const answerSection = document.querySelector(".answerSection");
const playAgain = document.querySelector(".playAgain");
const playAgain2 = document.getElementById("playAgain2");
const resultText = document.querySelector(".resultText");
const rulesButton = document.querySelector(".rulesButton");
const closeButton = document.querySelector(".closeRulesBox");
const div2 = document.querySelector(".computerWOn");
const div = document.querySelector(".youWon");
// const nextButton = document.getElementById("nextButton");
const resultSub = document.getElementById("resultSub");
const rulesBox = document.querySelector(".rulesBox");
const userWonButton = document.getElementById("userWonIcon");
const computerWonIcon = document.getElementById("computerWonIcon");
const header = document.getElementById("header");
const finalPage = document.getElementById("finalPage");
const endButton = document.getElementById("end");

const options = ["rock", "paper", "scissors"];

const IconCenter = {
  rock: "./rockimg.png",
  paper: "./paperimg.png",
  scissors: "./scissorsimg.png",
};
const BorderColorClass = {
  rock: "rockBackground",
  paper: "paperBackground",
  scissors: "scissorsBackground",
};

const winningConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

let yourScoreh = 0; /*parseInt(localStorage.getItem("yourScoreh") || 0);*/
let computerScoreh = 0; /*parseInt(localStorage.getItem("computerScoreh") || 0);*/

yourScore.textContent = yourScoreh;
computerScore.textContent = computerScoreh;

let yourChoice = "";
let computerChoice = "";

answer.addEventListener("click", (e) => {
  const button = e.target.closest(".button");

  if (button) {
    const img = button.querySelector("img");
    if (img) {
      yourChoice = img.alt;
    }

    computerChoice = options[Math.floor(Math.random() * options.length)];

    answer.style.display = "none";

    updateScores(yourChoice, computerChoice);
    BorderColor();
  }
});

function updateScores(yourChoice, computerChoice) {
  answerSection.style.display = "flex";
  rulesButton.style.display = "none";

  document.getElementById("yourAnswerImage").src = IconCenter[yourChoice];

  document.getElementById("computerAnswerImage").src =
    IconCenter[computerChoice];

  if (yourChoice === computerChoice) {
    removePulse();
    displayResult("Tie up", "", "Replay");
  } else if (winningConditions[yourChoice] === computerChoice) {
    yourScoreh++;
    localStorage.setItem("yourScoreh", yourScoreh);
    addPulse(div, div2);
    displayResult("You Win", "Against PC", "Play Again");
    if (yourScoreh > computerScoreh) {
      // nextButton.style.display = "block";
      rulesButton.style.display = "none";
    }
  } else {
    computerScoreh++;
    localStorage.setItem("computerScoreh", computerScoreh);
    addPulse(div2, div);
    displayResult("You Lost", "Against PC", "Play Again");
  }

  yourScore.textContent = yourScoreh;
  computerScore.textContent = computerScoreh;

  if (yourScoreh != 0 || computerScoreh != 0) {
    endButton.style.display = "block";
  }
}

rulesButton.addEventListener("click", () => {
  rulesBox.classList.add("rulesBoxPopUp");
});

closeButton.addEventListener("click", () => {
  rulesBox.classList.remove("rulesBoxPopUp");
});

playAgain.addEventListener("click", () => {
  removeBorderColor();
  rulesButton.style.display = "block";

  displayNone("none");
  answer.style.display = "grid";
});

playAgain2.addEventListener("click", () => {
  finalPage.style.display = "none";
  removeBorderColor();
  header.style.display = "flex";
  answer.style.display = "grid";
  resetScore();
});

function resetScore() {
  yourScoreh = 0;
  computerScoreh = 0;

  localStorage.setItem("yourScoreh", yourScoreh);
  localStorage.setItem("computerScoreh", computerScoreh);
  yourScore.textContent = yourScoreh;
  computerScore.textContent = computerScoreh;
  rulesButton.style.display = "block";
}

endButton.addEventListener("click", () => {
  displayNone("none");
  // endButton.style.display = "none";
  header.style.display = "none";
  finalPage.style.display = "flex";
  const finalMessage = document.getElementById("finalMessage");
  const finalSubtext = document.getElementById("finalSubtext");
  const cup = document.getElementById("cup");
  const stars = document.getElementById("stars");

  if (yourScoreh > computerScoreh) {
    finalMessage.textContent = "Hurray!!";
    finalSubtext.textContent = "You won the game!";
    cup.src = "./cup-removebg-preview.png";
  } else {
    finalMessage.textContent = "Sorry!!";
    finalSubtext.textContent = "You lost the game!";
    cup.src = "brokenHeart.png";
    stars.style.display = "none";
  }
});

function displayNone(none) {
  answerSection.style.display = none;
  endButton.style.display = none;
}

function removePulse() {
  div2.classList.remove("pulse");
  div.classList.remove("pulse");
}

function addPulse(winner, loser) {
  loser.classList.remove("pulse");
  winner.classList.add("pulse");
}

function displayResult(mainText, subText, buttonText) {
  resultText.textContent = mainText;
  resultSub.textContent = subText;
  playAgain.textContent = buttonText;
}

function BorderColor() {
  userWonButton.classList.add(BorderColorClass[yourChoice]);
  computerWonIcon.classList.add(BorderColorClass[computerChoice]);
}
function removeBorderColor() {
  userWonButton.classList.remove(BorderColorClass[yourChoice]);
  computerWonIcon.classList.remove(BorderColorClass[computerChoice]);
}
