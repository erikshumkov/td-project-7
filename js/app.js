document.addEventListener('DOMContentLoaded', () => {
  let i;
  let missed = 0; // Wrong guess count.
  const keyboard = document.querySelector("#qwerty");
  const phrase = document.querySelector("#phrase");
  const resetButton = document.querySelector(".btn__reset"); // Starts the game.
  const overlay = document.querySelector("#overlay");
  const btnRetry = document.createElement("button"); // Button added to the win or lose screen.
  const createSpan = document.createElement("span");
  const imgs = document.querySelectorAll("img"); // Selects the hearts.
  let hearts = imgs.length - 1; // Hearts counter.
  let letterFound;
  let correctLetter = []; // Correct guesses for each letter stored in this array.

  // Array for the phrases to guess.
  const phrases = [
    'Team Treehouse',
    'Cascading Style Sheets',
    'Front End Developer',
    'Tech Degree',
    'JavaScript and the DOM'
  ];

  // Add any array with phrases to this function.
  // After function is run, the chosen phrase from the array will be deleted.
  const getRandomPhraseAsArray = arr => {
      let randomNumber = Math.floor(Math.random() * arr.length);
      let newPhrase = arr[randomNumber];
      let index = arr.indexOf(newPhrase);
      arr.splice(index, 1);
      let characters = newPhrase.split('');
      return characters;
  }

  // Create a function that adds the letters to the screen.
  const addPhraseToDisplay = arr => {
      let ul = phrase.querySelector("ul");
      for(i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        li.textContent = arr[i];

        // Every character get in a LI.
        // Append list item to #phrase ul.
        ul.appendChild(li);

        // If array item is not an empty string, add class name letter.
        // Otherwise create space between the words in the phrase.
        if (arr[i] !== " ") {
          li.className = "letter";
        } else {
          li.className = "space";
        }
    }
  }

  // CheckLetter to validate if letter is in the phrase display.
  // If it is, letter in phrase will be displayed with "show"-className.
  const checkLetter = letter => {
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


  // Check each time player guesses a letter.

  // If number of letters with "show"-class is equal to letters with class "letters"
  // show win overlay.

  // If misses is greater than or equal to 5, show lose overlay.
  const checkWin = () => {
    const h2 = document.querySelectorAll("h2")[0];
    const link = overlay.querySelector("a");
    const letters = document.querySelectorAll(".letter");
    createSpan.className = "span__text";
    btnRetry.textContent = "Play Again";
    btnRetry.className = "btn__retry";

    // Loss.
    if ( missed === 5 ) {
      // Wait for last heart to disappear.
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
      }, 800);
    }

    // Win.
    if ( letters.length === correctLetter.length ) {
      // Wait for last letter to show.
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
      }, 800);
    }
  }

  // Start button for the game.
  resetButton.addEventListener("click", (event) => {
    overlay.style.display = "none";
  });

  // Get the random phrase from phrases-array, then passing it to addPhraseToDisplay.
  let phraseArray = getRandomPhraseAsArray(phrases);

  // Adding a Phrase to the game when overlay is gone.
  addPhraseToDisplay(phraseArray);

  // Add click event listener to #qwerty keyboard.
  keyboard.addEventListener("click", (event) => {
    if(event.target.tagName == "BUTTON") {
      let selectedButton = event.target;
      selectedButton.className = "chosen";
      selectedButton.setAttribute("disabled", "");
      letterFound = selectedButton.textContent;
      checkLetter(letterFound);

      // Write a statement to check the letterFound variable.
      // If value is equal to null, remove one of the tries from scoreboard.
      // If wrong letter, missed gets +1 and one heart disappear.
      if (letterFound === null) {
        selectedButton.className = "wrongchoice";
        missed++;
        imgs[hearts].setAttribute("src", "images/lostHeart.png");
        hearts--;
      }
      checkWin();
    }
  });

  // Button (btnRetry) to replay the game.
  btnRetry.addEventListener("click", () => {
    const ul = phrase.querySelector("ul");
    const phraseLi = ul.querySelectorAll('li');
    const clearKeyboard = keyboard.querySelectorAll("button");

      // Resets keyboard to make all buttons available.
      for(i = 0; i < clearKeyboard.length; i++) {
        clearKeyboard[i].removeAttribute("class");
        clearKeyboard[i].removeAttribute("disabled");
      }
      // Makes the grey hearts blue again.
      if (missed > 0) {
        for(i = 0; i < imgs.length; i++) {
          imgs[i].setAttribute("src", "images/liveHeart.png");
        }
      }
      // Removes all the correct letters from array.
      correctLetter = [];
      // Resets number of misses to 0.
      missed = 0;
      letterFound = "";
      // Resets hearts counter.
      hearts = imgs.length - 1;
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
});
