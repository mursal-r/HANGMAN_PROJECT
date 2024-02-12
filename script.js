// Const for wordList array:
const wordList = [
 { word: "elephant", hint: "A large mammal with a trunk, curved tusks, and large ears." },
 { word: "lion", hint: "A large tawny-colored cat that lives in prides, found in Africa and northwestern India." },
 { word: "giraffe", hint: "A large mammal with a very long neck." },
 { word: "cheetah", hint: "The fastest animal on land." },
 { word: "fox", hint: "A carnivorous mammal of the dog family with a pointed muzzle and bushy tail, proverbial for its cunning."},
 { word: "dog", hint: "A domesticated descendant of the wolf."},
 { word: "turtle", hint: "A reptile which has a thick shell covering its body and lives in the sea most of the time."}
]

// Function: create keyboard buttons
function createKeyboardButtons() {
  const keyboard = document.querySelector(".keyboard");
  for (let i = 97; i <= 122; i++) {
    let button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = String.fromCharCode(i);
    keyboard.appendChild(button);
  }
}

// Function: handle Game Over condition
function handleGameOver(isWin) {
  const gameover = document.querySelector(".GameOver");
  const game = document.querySelector(".game");
  const answerDisplay = document.querySelector(".answer");
  const gameoverImg = document.querySelector(".gameoverImg");
  const h3 = document.querySelector("h3");
  const h4 = document.querySelector("h4");

  // When game is over: 
  gameover.classList.add("show");
  game.style.opacity = 0.8;

  // Did player win or lose:
  if (isWin) {
    h3.innerText = "Great Job🥳";
    h4.innerText = "You guessed the correct answer!";
  } else {
    h3.innerText = "Game Over🤕";
    h4.innerText = "You failed to guess the word. The correct word was: " + word;
  }
}

// Function: to handle game over (win)
function checkWinCondition() {
  const letterElems = document.querySelectorAll(".letter");
  let matchedWord = "";

  letterElems.forEach((element) => {
    matchedWord += element.innerText.toLowerCase();
  });

  // If all the letters match the word:
  if (matchedWord === word) {
    handleGameOver(true);
  }
}

// Function: match guessed letter - word
function matchWord(letter) {
  const letterElems = document.querySelectorAll(".letter");
  let matchFound = false;

  word.split("").forEach((char, index) => {
    if (char.toLowerCase() === letter) {
      letterElems[index].innerText = char;
      letterElems[index].classList.add("guess");
      matchFound = true;
    }
  });

  if (!matchFound) {
    count++;
    chance.innerText = `${count}/6`;
    updateHangmanImage();
  } else {
    checkWinCondition();
  }
}

// Function: load question
function loadQuestion() {
  const h2 = document.querySelector("h2");
  const wordDisplay = document.querySelector(".word-display");

  h2.innerText = `Hint: ${hint}`;

  for (let i = 0; i < word.length; i++) {
    let liTag = document.createElement("li");
    liTag.classList.add("letter");
    wordDisplay.appendChild(liTag);
  }

  const buttonTags = document.querySelectorAll(".btn");

  buttonTags.forEach((button) => {
    button.addEventListener("click", (event) => {
      matchWord(event.target.innerText.toLowerCase());
    });
  });
}

// Function: hangman image updates
function updateHangmanImage() {
  const img = document.querySelector(".img");
  if (count >= 1 && count < 2) {
    img.src = "images/HANGMAN_IMG01.png";
  } else if (count >= 2 && count < 3) {
    img.src = "images/HANGMAN_IMG02.png";
  } else if (count >= 3 && count < 4) {
    img.src = "images/HANGMAN_IMG03.png";
  } else if (count >= 4 && count < 5) {
    img.src = "images/HANGMAN_IMG04.png";
  } else if (count >= 6 && count < 7) {
    img.src = "images/HANGMAN_IMG05.png";
    setTimeout(() => {
      handleGameOver(false);
    }, 200);
  }
}

// MAIN GAME EXECUTION:
const chance = document.querySelector(".chance");
let count = 0;
const randomIndex = Math.floor(Math.random() * wordList.length);
const { word, hint } = wordList[randomIndex];

createKeyboardButtons();
loadQuestion();
