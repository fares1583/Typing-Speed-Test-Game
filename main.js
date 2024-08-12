let easy = [
  "Apple",
  "Ball",
  "Cat",
  "Dog",
  "Fish",
  "House",
  "Tree",
  "Sun",
  "Star",
  "Book",
  "Chair",
  "Door",
  "Car",
  "Hand",
  "Moon",
  "Shoe",
  "Water",
  "Pen",
  "Cup",
  "Bag",
];

const normal = [
  "Window",
  "Garden",
  "Forest",
  "Bicycle",
  "Mountain",
  "Thunder",
  "Ocean",
  "Castle",
  "Ladder",
  "Rainbow",
  "Thunder",
  "Planet",
  "Feather",
  "River",
  "Journal",
  "Puzzle",
  "Bridge",
  "Whisper",
  "Mirror",
  "Island",
];

// Hard Words
const hard = [
  "Ephemeral",
  "Paradox",
  "Obfuscate",
  "Axiom",
  "Dichotomy",
  "Quixotic",
  "Labyrinthine",
  "Serendipity",
  "Ineffable",
  "Lethargic",
  "Ubiquitous",
  "Cacophony",
  "Enigmatic",
  "Penultimate",
  "Conundrum",
  "Juxtapose",
  "Obsequious",
  "Sesquipedalian",
  "Idiosyncratic",
  "Synecdoche",
];

const game = document.querySelector(".game");
const nameDiv = document.querySelector(".name");
const container = document.querySelector(".container");
const message = document.querySelector(".message");
const lvl = document.querySelector(".lvl");
const seconds = document.querySelector(".seconds");
const start = document.querySelector(".start");
const theWord = document.querySelector(".the-word");
const input = document.querySelector(".input");
const comingWords = document.querySelector(".coming-words");
const details = document.querySelector(".details");
const time = document.querySelector(".time span");
const score = document.querySelector(".score");
const got = document.querySelector(".got");
const total = document.querySelector(".totla");
const finish = document.querySelector(".finish");
const threeSec = document.querySelector(".three-sec");
const showScores = document.querySelector(".show-scores");
let level = document.getElementById("options");

let lvls = {
  easy: 6,
  normal: 5,
  hard: 2,
};

let defLvl; //change level from here
let defLvlSec;
// chose the level
let scoreArr = [];

// if (window.localStorage.getItem("score")) {
//   scoreArr = JSON.stringify(localStorage.getItem("score"));
// }

function choseDefLl() {
  if (level.value == "easy") {
    defLvl = easy;
  } else if (level.value == "normal") {
    defLvl = normal;
  } else if (level.value == "hard") {
    defLvl = hard;
  }

  defLvlSec = lvls[level.value];

  lvl.innerHTML = level.value;
  seconds.innerHTML = defLvlSec;
  time.innerHTML = defLvlSec;
  total.innerHTML = defLvl.length;
}

input.onpaste = function () {
  return false;
};

start.onclick = function () {
  getDataFromLocalStor();
  showScoresFromLocalStor();
  input.value = "";
  choseDefLl();
  start.remove();
  level.remove();
  input.focus();
  threeSecToStart();
  setTimeout(genWord, 3000);
};

function genWord() {
  let wordRAnd = defLvl[Math.floor(Math.random() * defLvl.length)];
  theWord.innerHTML = wordRAnd;

  let indexWord = defLvl.indexOf(wordRAnd);
  defLvl.splice(indexWord, 1);
  comingWords.innerHTML = "";

  for (let i = 0; i < defLvl.length; i++) {
    let wordDiv = document.createElement("div");
    wordDiv.textContent = defLvl[i];
    comingWords.appendChild(wordDiv);
  }
  //  start play
  startPlay();
}

function startPlay() {
  time.innerHTML = defLvlSec;
  let start = setInterval(() => {
    time.innerHTML--;

    if (time.innerHTML == 0) {
      clearInterval(start);

      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        got.innerHTML++;

        if (defLvl.length > 0) {
          genWord();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.appendChild(document.createTextNode("Congratulation"));
          finish.appendChild(span);
          scoreToLocalStor(got.innerHTML);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";

        span.appendChild(document.createTextNode("Game Over,Tray Again :) "));
        finish.appendChild(span);
        container.style.opacity = "0.5";
        scoreToLocalStor(got.innerHTML);
      }
    }
  }, 1000);
}

// give the user three second to start

function threeSecToStart() {
  threeSec.innerHTML = 3;

  let count = setInterval(() => {
    threeSec.innerHTML--;
    if (threeSec.innerHTML == 0) {
      clearInterval(count);
      threeSec.remove();
    }
  }, 1000);
}

// add score to local storage

let scores = [];
if (window.localStorage.getItem("score")) {
  scores = JSON.parse(localStorage.getItem("score"));
}

function scoreToLocalStor(score) {
  if (theWord.innerHTML.toLowerCase() !== input.value.toLowerCase()) {
  }
  let date = new Date();
  let formattedDate =
    ("0" + date.getDate()).slice(-2) +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getFullYear();

  let scoreObj = {
    date: formattedDate,
    score: score,
    level: level.value,
  };
  scores.push(scoreObj);
  window.localStorage.setItem("score", JSON.stringify(scores));
}

function getDataFromLocalStor() {
  if (window.localStorage.getItem("score")) {
    scores = JSON.parse(window.localStorage.getItem("score"));
    console.log(scores);
  }
}

function showScoresFromLocalStor() {
  for (let i = 0; i < scores.length; i++) {
    let div = document.createElement("div");
    div.appendChild(
      document.createTextNode(
        `Score: ${scores[i].score} , Date:       ${scores[i].date} , You played on level: ${scores[i].level}  `
      )
    );
    showScores.appendChild(div);
  }
}
