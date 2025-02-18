// import { WORDS } from "./words.js";

function clearAll() {
    let inputsArray = document.getElementsByTagName("input");
    for (let i = 0; i < inputsArray.length; i++) {
        inputsArray[i].value = "";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let inputsElements = document.getElementsByTagName("input");
    for (let i = 0; i < inputsElements.length; i++) {
        inputsElements[i].addEventListener("keydown", function(event) {
            let char = event.key;
            let val = event.value;
            const regex = /[\u0590-\u05fe]/;
            // console.log(" * " + char + " test: " + regex.test(char));
            // console.log(this);
        
            if (regex.test(char)) {
                // console.log("hebrew");
            } else {
                // console.log("not hebrew: " + char);
                this.value = "";
            }
            // console.log("value: " + this.value);
        });
    }
});

function convertFinaleLetters(letter) {
    const finaleLetters = {
        "ך": "כ",
        "ם": "מ",
        "ן": "נ",
        "ף": "פ",
        "ץ": "צ"
    };
    return finaleLetters[letter] || null;
}

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
            let finaleLetter = convertFinaleLetters(letter);
            if (finaleLetter) {
                yellows.push({ letter: finaleLetter, col: parseInt(col) });
            }
        }
    });

    const grayInput = document.getElementById("gray-input").value.trim();
    console.log(grayInput);
    let grays = [];
    for (const char of grayInput) {
        if (char.trim() !== "") {
            grays.push(char);
            let finaleLetter = convertFinaleLetters(char);
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
            if (word[col] !== letter) {
                return false;
            }
            if (!word.includes(letter)) {
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