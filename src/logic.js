// import { WORDS } from "./words.js";

function clearAll() {
    let inputsArray = document.getElementsByTagName("input");
    for (let i = 0; i < inputsArray.length; i++) {
        inputsArray[i].value = "";
    }
}

const LETTERS = {
    "t" : "א",
    "c" : "ב",
    "d" : "ג",
    "s" : "ד",
    "v" : "ה",
    "u" : "ו",
    "z" : "ז",
    "j" : "ח",
    "y" : "ט",
    "h" : "י",
    "f" : "כ",
    "l" : "ך",
    "k" : "ל",
    "n" : "מ",
    "o" : "ם",
    "b" : "נ",
    "i" : "ן",
    "x" : "ס",
    "g" : "ע",
    "p" : "פ",
    ";" : "ף",
    "m" : "צ",
    "." : "ץ",
    "e" : "ק",
    "r" : "ר",
    "a" : "ש",
    "," : "ת"
};

document.addEventListener("DOMContentLoaded", function() {
    let inputsElements = document.getElementsByTagName("input");
    for (let i = 0; i < inputsElements.length; i++) {
        inputsElements[i].addEventListener("keydown", function(event) {
            event.preventDefault();
        });

        inputsElements[i].addEventListener("keyup", function(event) {
            let char = event.key.toLocaleLowerCase();
            let letter = LETTERS[char];
            let maxLength = this.getAttribute("maxlength");

            if (char === "backspace") {
                this.value = "";
                this.previousElementSibling.focus();
            }
            if (char === "delete") {
                this.value = "";
            }
            if (char === "arrowright") {
                this.nextElementSibling.focus();
            }
            if (char === "arrowleft") {
                this.previousElementSibling.focus();
            }
            

            if (letter) {
                if (this.value.length < maxLength) {
                    this.value += letter;
                } else {
                    this.value = letter;
                }
            }
            if (this.value.length >= maxLength) {
                this.nextElementSibling.focus();
            }
        });
    }

    Array.from(inputsElements).forEach(input => {
        input.addEventListener("input", function(event) {
            let maxLength = this.getAttribute("maxlength");
            if (this.value.length >= maxLength) {
                input.nextElementSibling.focus();
            }
        });
    });
});

const FINALE_LETTERS = {
    "כ" : "ך",
    "מ": "ם",
    "נ": "ן",
    "פ": "ף",
    "צ": "ץ"
};

document.getElementById("submit-btn").addEventListener("click", function () {
    const greenInputs = document.querySelectorAll(".green-letter");
    let greens = [];
    greenInputs.forEach((input, index) => {
        let val = input.value.trim();
        greens[index] = val;
    });

    const yellowInputs = document.querySelectorAll(".yellow-letter");
    let yellows = [];
    yellowInputs.forEach((input, index) => {
        let letter = input.value.trim();
        let col = input.getAttribute("data-col");
        if (letter !== "") {
            yellows.push({ letter, col: parseInt(col) });
        }
    });

    const grayInput = document.getElementById("gray-input").value.trim();
    console.log(grayInput);
    let grays = [];
    for (const char of grayInput) {
        if (char.trim() !== "") {
            grays.push(char);
            let finaleLetter = FINALE_LETTERS(char);
            if (finaleLetter) {
                grays.push(finaleLetter);
            }
        }
    }
    grays = [...new Set(grays)];

    const SIZE = 5;    
    let result = WORDS.filter(word => {
        for (let i = 0; i < SIZE; i++) {
            if (greens[i] && word[i] !== greens[i]) {
                return false;
            }
        }

        for (const { letter, col } of yellows) {
            if (word[col] === letter) {
                return false;
            }
            if (!word.includes(letter) && (FINALE_LETTERS[letter] && !word.includes(FINALE_LETTERS[letter]))) {
                return false;
            }
        }

        for (const letter of grays) {
            if (word.includes(letter)) {
                return false;
            }
        }

        return true;
    });

    document.getElementById("result-words").innerText = result.join("\n");
});