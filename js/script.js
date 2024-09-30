let score = 0;
let photo = document.querySelector(".photo");
let currentQuistionIndex = 0;
let unserText = document.querySelectorAll(".unserText")[0];
let unserTextFalse = document.querySelectorAll(".unserText")[1];
let ansurButton = document.querySelectorAll(".ansur")[0];
let ansurButton1 = document.querySelectorAll(".ansur")[1];
let overLayTwo = document.querySelector("#overLayTwo");
let overLayOne = document.querySelector("#overLayOne");
let resolt = false;
const q = [
  "cheese",
  "meat",
  "meet",
  "read",
  "rice",
  "pie",
  "pine",
  "tie",
  "seal",
  "peach",
  "sleep",
  "train",
  "rain",
];

function playAudio(text) {
  const audio = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  audio.voice =
    voices.find((voice) => voice.name.includes("Google UK English Female")) ||
    voices.find((voice) => voice.gender === "female");
  window.speechSynthesis.speak(audio);
}

function askQuestion() {
  playAudio("Whats That ?");
}

function updatImg(src) {
  setTimeout(() => {
    photo.src = `./img/${src}.jfif`;
  }, 4000);
}

function udateScore() {
  score++;
}

function setScore() {
  let scor = document.querySelector(".scor-count");
  scor.innerHTML = score;
}

function updateUnser(ansur) {
  window.localStorage.setItem("score", score);
  if (currentQuistionIndex % 2 === 0) {
    ansurButton.setAttribute("unsur", ansur);
  } else {
    ansurButton1.setAttribute("unsur", ansur);
  }
  setTimeout(() => {
    if (currentQuistionIndex % 2 === 0) {
      unserText.innerHTML = `${ansur}`;
      unserTextFalse.innerHTML = `${q[currentQuistionIndex - 1]}`;
    } else {
      unserText.innerHTML = `${q[currentQuistionIndex - 1]}`;
      unserTextFalse.innerHTML = `${ansur}`;
    }
  }, 4000);
}
function handleRemoveClass() {
  setTimeout(async () => {
    overLayOne.classList.remove("overLayOne");
    overLayTwo.classList.remove("overLayTwo");
  }, 6000);
}

function handleAddClass() {
  setTimeout(() => {
    overLayOne.classList.add("overLayOne");
    overLayTwo.classList.add("overLayTwo");
  }, 3000);
}

function handleNextQuistion() {
  if (score + 1 !== q.length) {
    playAudio(`"its a "${q[currentQuistionIndex]}`);
    currentQuistionIndex += 1;
    console.log(currentQuistionIndex);
    updatImg(q[currentQuistionIndex]);
    udateScore();
    setScore();
    updateUnser(q[currentQuistionIndex]);
    handleAddClass();
    handleRemoveClass();
    createCelebrationAnimation();
    createCelebrationAnimationRed();
  } else {
    playAudio(`"its a "${q[currentQuistionIndex]}`);
    setTimeout(() => {
      window.location.href = "endPage.html";
    }, 4500);
  }
}

function handlUnser(event) {
  if (
    event.target.attributes.unsur &&
    event.target.attributes.unsur.value === q[currentQuistionIndex]
  ) {
    console.log("true");
    playCelebrationSound();
    handleNextQuistion();
    setTimeout(() => {
      askQuestion();
      askQuestion();
    }, 5000);
  } else if (
    event.target.attributes.unsur &&
    event.target.attributes.unsur.value !== q[currentQuistionIndex]
  ) {
    playAudio("wrong unser !");
    resolt = true;
  }
}
function createCelebrationAnimation() {
  const celebrationContainer = document.createElement("div");
  celebrationContainer.classList.add("celebration-container");

  for (let i = 0; i < 100; i++) {
    const cube = document.createElement("div");
    cube.classList.add("cube");
    celebrationContainer.appendChild(cube);

    cube.style.left = Math.random() * 70 + "vw";
    cube.style.top = Math.random() * 70 + "vh";

    setTimeout(() => {
      cube.remove();
    }, 7000);
  }

  document.body.appendChild(celebrationContainer);

  setTimeout(() => {
    celebrationContainer.remove();
  }, 3500);
}
function createCelebrationAnimationRed() {
  const celebrationContainer = document.createElement("div");
  celebrationContainer.classList.add("celebration-container");

  for (let i = 0; i < 100; i++) {
    const cube = document.createElement("div");
    cube.classList.add("cubeRed");
    celebrationContainer.appendChild(cube);

    cube.style.left = Math.random() * 100 + "vw";
    cube.style.top = Math.random() * 80 + "vh";

    setTimeout(() => {
      cube.remove();
    }, 7000);
  }

  document.body.appendChild(celebrationContainer);

  setTimeout(() => {
    celebrationContainer.remove();
  }, 3500);
}

function playCelebrationSound() {
  setTimeout(() => {
    const audio = document.getElementById("audio");
    audio.play();
  }, 1000);
}

setScore();

window.onload = setTimeout(() => {
  askQuestion();
  askQuestion();
}, 13000);
