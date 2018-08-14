let i;
let missed = 0; // Wrong guess count.
const keyboard = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const resetButton = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const btnRetry = document.createElement("button"); // Button added to the win or lose screen.
const createSpan = document.createElement("span");
const tries = document.querySelectorAll(".tries");
let letterFound;
let correctLetter = []; // Correct guesses for each letter stored in this array.

// Array for the phrases to guess
const phrases = [
  'Team Treehouse',
  'Cascading Style Sheets',
  'Front End Developer',
  'Tech Degree',
  'JavaScript and the DOM'
];

// function 1
// Add any array with phrases to this function
// after function is run, the chosen phrase from the array will be deleted
// and cannot be used again.
function getRandomPhraseAsArray(arr) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    let newPhrase = arr[randomNumber];
    let index = arr.indexOf(newPhrase);
    arr.splice(index, 1);
    let characters = newPhrase.split('');
    return characters;
}

// function 2
// Create a function that adds the letters to the screen.
function addPhraseToDisplay(arr) {
    let ul = phrase.querySelector("ul");
    for(i = 0; i < arr.length; i++) {
      let li = document.createElement("li");
      li.textContent = arr[i];

      // every character get in a LI
      // append list item to #phrase ul
      ul.appendChild(li);

      // if array item is not an empty string, add class name letter.
      // otherwise create space between the words in phrase.
      if (arr[i] !== " ") {
        li.className = "letter";
      } else {
        li.className = "space";
      }
  }
}

// function 3
// checkLetter to validate if letter is in the phrase display.
// if it is, letter in phrase will be displayed with "show"-className.
function checkLetter(letter) {
  const letters = document.querySelectorAll(".letter");
  let letterSaved = letter;
  for (i = 0; i < letters.length; i++) {

    // Check if list items contains the button player clicked.
    if (letters[i].textContent.toLowerCase().includes(letterSaved.toLowerCase())) {
      letters[i].className += " show animation";
      correctLetter.push(letters[i].textContent);
    }
  }
  // When loop is over, check if letter was correct or not.
  if (correctLetter.includes(letterSaved.toLowerCase()) || correctLetter.includes(letterSaved.toUpperCase())) {
    return letterSaved;
  } else {
    letterFound = null;
    return null;
  }
}

// function 4
// check each time player guesses a letter

// if number of letters with "show"-class = letters with class "letters"
// show overlay win

// if misses is greater than or equal to 5, show lose overlay
function checkWin() {
  const h2 = document.querySelectorAll("h2")[0];
  const link = overlay.querySelector("a");
  const letters = document.querySelectorAll(".letter");
  createSpan.className = "span__text";
  btnRetry.textContent = "Play Again";
  btnRetry.className = "btn__retry";

  // Loss
  if ( missed === 5 ) {
    // Wait for last heart to disappear
    setTimeout( () => {
    for (i = 0; i < letters.length; i++) {
      letters[i].className = "letter show";
    }
    overlay.className = "lose";
    h2.textContent = "You lose!";
    link.style.display = "none";
    overlay.appendChild(createSpan);
    createSpan.textContent = "You didn't make it this time, but you can try again!";
    overlay.appendChild(btnRetry);
    overlay.style.display = "flex";
    }, 1800);
  }

  // Win
  if ( letters.length === correctLetter.length ) {
    // Wait for last letter to show
    setTimeout( () => {
    for (i = 0; i < letters.length; i++) {
      letters[i].className = "letter show";
    }
    overlay.className = "win";
    h2.textContent = "Success!";
    link.style.display = "none";
    overlay.appendChild(createSpan);
    createSpan.textContent = "Play one more time?";
    overlay.appendChild(btnRetry);
    overlay.style.display = "flex";
    }, 1800);
  }
}

//function 5
// Create hint
function createHint() {}

// Start button for the game.
resetButton.addEventListener("click", (event) => {
  overlay.style.display = "none";
});

// Get the random phrase from phrases-array, then passing it to addPhraseToDisplay
let phraseArray = getRandomPhraseAsArray(phrases);

// Adding a Phrase to the game when overlay is gone.
addPhraseToDisplay(phraseArray);

// Add click event listener to #qwerty keyboard
keyboard.addEventListener("click", (event) => {
  if(event.target.tagName == "BUTTON") {
    let selectedButton = event.target;
    selectedButton.className = "chosen";
    selectedButton.setAttribute("disabled", "");
    letterFound = selectedButton.textContent;
    checkLetter(letterFound);

    // Write a statement to check the letterFound variable
    // If value is equal to null remove one of the tries from scoreboard
    // missed variable to store score
    // If wrong letter, missed gets +1
    if (letterFound === null) {
      selectedButton.className = "wrongchoice";
      missed++;
      if( missed === 1 ) {
        tries[4].firstChild.setAttribute("src", "images/lostHeart.png");
      }
      if( missed === 2 ) {
        tries[3].firstChild.setAttribute("src", "images/lostHeart.png");
      }
      if( missed === 3 ) {
        tries[2].firstChild.setAttribute("src", "images/lostHeart.png");
      }
      if( missed === 4 ) {
        tries[1].firstChild.setAttribute("src", "images/lostHeart.png");
      }
      if( missed === 5 ) {
        tries[0].firstChild.setAttribute("src", "images/lostHeart.png");
      }
    }
    checkWin();
  }
});

// Button (btnRetry) to replay the game.
btnRetry.addEventListener("click", () => {
  const ul = phrase.querySelector("ul");
  const createUl = document.createElement("ul");
  const phraseLi = ul.querySelectorAll('li');
  const clearKeyboard = keyboard.querySelectorAll("button");

    // Resets keyboard to make all buttons available.
    for(i = 0; i < clearKeyboard.length; i++) {
      clearKeyboard[i].removeAttribute("class");
      clearKeyboard[i].removeAttribute("disabled");
    }
    // Makes the grey hearts blue again.
    if (missed > 0) {
      for(i = 0; i < tries.length; i++) {
        tries[i].firstChild.setAttribute("src", "images/liveHeart.png");
      }
    }
    // Removes all the correct letters from correctLetter.
    correctLetter = [];
    // Resets number of misses to 0
    missed = 0;
    letterFound = "";
    // Removes old phrase from display, so a new one can be added.
    for(i = 0; i < phraseLi.length; i++) {
      ul.removeChild(phraseLi[i]);
    }
    for(i = 0; i < phraseArray.length; i++) {
      phraseArray.pop(phraseArray[i]);
    }
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    overlay.style.display = "none";
});
