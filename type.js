const words =
  "Hello, I'm Justin! I'm a Backend Software Engineer with a love for problem solving and project creation. I'm currently attending Cal State Long Beach pursuing a bachelor's in Computer Science.";
const additionalWords =
  "Outside of programming I enjoy learning languages and playing the piano. I've been studying Japanese for the past three years and can speak and read in the language. My goal is to become a digital nomad and travel! By the way, my WPM is 113.";
let additional = false;

const gameTime = 60;
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

const content = document.querySelector(".content");
const typeContainer = document.getElementsByClassName("type-box-container")[0];
typeContainer.focus();
const newGameButton = document.getElementsByClassName("new-game-button")[0];
const wordsContainer = document.getElementsByClassName("word-box")[0];
const additionalButton = document.querySelector(".additional-button");
const arrowButton = document.querySelector(".arrow");

function addClass(elemenet, name) {
  elemenet.className += " " + name;
}
function removeClass(element, name) {
  element.className = element.className.replace(name, "");
}

function getWpm(elapsedTime) {
  if (elapsedTime) {
    const words = [...document.querySelectorAll(".word")];
    const lastTypedWord = document.querySelector(".word.current");
    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex);
    let totalChar = 0;

    typedWords.forEach((word) => {
      const letters = [...word.children];
      let error = false;
      let charLength = 0;
      letters.forEach((letter) => {
        if (letter.classList.contains("wrong")) {
          error = true;
          return;
        } else {
          charLength += 1;
        }
      });
      if (!error) totalChar += charLength + 1;
    });
    totalChar -= 1;
    let totalWords = totalChar / 5;
    return Math.round(totalWords / (elapsedTime / 60));
  }
  return 0;
}

function offsetRight(element) {
  return element.offsetLeft + element.offsetWidth;
}
function moveCursor() {
  const nextLetter = document.querySelector(".letter.current");
  const nextWord = document.querySelector(".word.current");
  const cursor = document.getElementsByClassName("cursor")[0];
  cursor.style.top = (nextLetter || nextWord).offsetTop + 1 + "px";
  if (nextLetter || nextWord) {
    if (nextLetter) cursor.style.left = nextLetter.offsetLeft + "px";
    else cursor.style.left = offsetRight(nextWord) + "px";
  }
}

function formatWord(word) {
  return `<div class = "word"><span class = "letter">${word
    .split("")
    .join('</span><span class = "letter">')}</span></div>`;
}

function newGame() {
  if (window.innerWidth < 900)
    document.querySelector(".invisible-input").value = "";
  clearInterval(window.timer);
  document.querySelector(".info").innerHTML = "60";
  const wordArray = additional ? additionalWords.split(" ") : words.split(" ");
  const wordCount = wordArray.length;
  wordsContainer.innerHTML = "";
  for (let i = 0; i < wordCount; i++) {
    wordsContainer.innerHTML += formatWord(wordArray[i]);
  }
  window.timer = null;
  window.gameStart = null;
  window.pauseTime = 0;
  removeClass(wordsContainer, "over");
  addClass(document.querySelector(".word"), "current");
  addClass(document.querySelector(".letter"), "current");
  moveCursor();
}

arrowButton.addEventListener("click", () => {
  document.querySelector(".arrow-img").classList.toggle("flip");
  additional = !additional;
  newGame();
});

newGameButton.addEventListener("click", () => {
  typeContainer.focus();
  newGame();
});
newGameButton.addEventListener("keydown", (e) => {
  if (e.key === "Enter") typeContainer.focus();
});

function gameOver(elapsedTime = 30) {
  clearInterval(window.timer);
  addClass(document.querySelector(".word-box"), "over");
  const result = getWpm(elapsedTime);
  document.querySelector(".info").innerHTML = `WPM: ${result}`;
}
const invsibleInput = document.querySelector(".invisible-input");
invsibleInput.addEventListener("focus", () => {
  document.querySelector(".cursor").classList.add("show-cursor");
  invsibleInput.selectionStart = invsibleInput.value.length;
});
invsibleInput.addEventListener("focusout", () => {
  document.querySelector(".cursor").classList.remove("show-cursor");
});

typeContainer.addEventListener("focusout", () => {
  const mobile = window.innerWidth < 900;
  if (!mobile) newGame();
});

removed = false;
typeContainer.addEventListener("keydown", (e) => {
  if (!removed) {
    document.querySelector(".widget").remove();
    removed = true;
  }
  const key = e.key;
  const mobile = window.innerWidth < 900;

  const currentWord = document.querySelector(".word.current");
  const currentLetter = document.querySelector(".letter.current");
  const expected = currentLetter?.innerHTML || " ";
  const isLetter = key.length === 1 && key !== " ";
  const isSpace = key === " ";
  const isBackspace = key === "Backspace";
  const isFirstLetter = currentLetter === currentWord.firstChild;
  const isStart =
    currentWord === document.querySelector(".word") &&
    currentLetter === document.querySelector(".letter");
  const lastWord = currentWord === wordsContainer.lastChild;
  const lastLetter = currentLetter === currentWord.lastChild;
  const isUtility =
    key === "Backspace" || key === "Shift" || key === "CapsLock";
  const isGameOver = wordsContainer.classList.contains("over");
  if (isSpace && !mobile) e.preventDefault();
  if (!isGameOver) {
    if (!window.timer && isLetter) {
      window.timer = setInterval(() => {
        if (!window.gameStart) {
          window.gameStart = new Date().getTime();
        }
        const currentTime = new Date().getTime();
        const msPassed = currentTime - window.gameStart;
        const sPassed = Math.round(msPassed / 1000);
        const sLeft = Math.round(gameTime - sPassed);
        if (sLeft <= 0) {
          gameOver();
          return;
        }
        document.querySelector(".info").innerHTML = sLeft + "";
      }, 1000);
    }
    if (isLetter) {
      if (currentLetter) {
        addClass(currentLetter, key === expected ? "correct" : "wrong");
        removeClass(currentLetter, "current");
        if (currentLetter.nextSibling) {
          addClass(currentLetter.nextSibling, "current");
        }
      } else {
        const incorrectLetter = document.createElement("span");
        incorrectLetter.innerHTML = key;
        incorrectLetter.className = "letter wrong extra";
        currentWord.appendChild(incorrectLetter);
      }
    }

    if (isSpace && !lastWord) {
      if (expected !== " ") {
        const lettersToInvalidate = [
          ...document.querySelectorAll(".word.current .letter:not(.correct)"),
        ];
        lettersToInvalidate.forEach((letter) => {
          addClass(letter, "wrong");
        });
      }
      removeClass(currentWord, "current");
      addClass(currentWord.nextSibling, "current");
      if (currentLetter) {
        removeClass(currentLetter, "current");
      }

      addClass(currentWord.nextSibling.firstChild, "current");
    }
    if (isBackspace && !isStart) {
      if (currentLetter && isFirstLetter) {
        removeClass(currentWord, "current");
        addClass(currentWord.previousSibling, "current");
        removeClass(currentLetter, "current");
        const lastChild = currentWord.previousSibling.lastChild;
        if (lastChild.classList.contains("extra")) {
          lastChild.remove();
        } else {
          addClass(currentWord.previousSibling.lastChild, "current");
          removeClass(currentWord.previousSibling.lastChild, "wrong");
          removeClass(currentWord.previousSibling.lastChild, "correct");
        }
      }
      if (currentLetter && !isFirstLetter) {
        const lastChild = currentWord.lastChild;
        if (lastChild.classList.contains("extra")) {
          lastChild.remove();
        } else {
          removeClass(currentLetter, "current");
          addClass(currentLetter.previousSibling, "current");
          removeClass(currentLetter.previousSibling, "wrong");
          removeClass(currentLetter.previousSibling, "correct");
        }
      }

      if (!currentLetter) {
        const lastChild = currentWord.lastChild;
        if (lastChild.classList.contains("extra")) {
          lastChild.remove();
        } else {
          addClass(lastChild, "current");
          removeClass(lastChild, "wrong");
          removeClass(lastChild, "correct");
        }
      }
    }
    moveCursor();
    if (lastWord && lastLetter && !isUtility) {
      const currentTime = new Date().getTime();
      const msPassed = currentTime - window.gameStart;
      const sPassed = Math.round(msPassed / 1000);
      gameOver(sPassed);
    }
  }
});
window.addEventListener("resize", () => {
  const isGameOver = wordsContainer.classList.contains("over");
  if (isGameOver) moveCursor();
});
newGame();
