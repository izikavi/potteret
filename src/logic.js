// import { WORDS } from "./words.js";

function clearAll() {
    let inputsArray = document.getElementsByTagName("input");
    for (let i = 0; i < inputsArray.length; i++) {
        inputsArray[i].value = "";
    }
}

function goToNextInput(col, row, isNext) {
    if (isNext) {
        let nextCol = (col === 4) ? 0 : col + 1;
        let nextRow = (col === 4) ? row + 1 : row;
        if (nextRow < 5) {
            let nextInput = document.querySelector(`input[data-col="${nextCol}"][data-row="${nextRow}"]`);
            nextInput.focus();
        } else if (nextRow === 5) {
            document.getElementById("gray-input")?.focus();
        } else {
            document.getElementById("submit-btn")?.click();
        }
    } else {
        let nextCol = (col === 0) ? 4 : col - 1;
        let nextRow = (col === 0) ? row - 1 : row;
        if (nextRow >= 0) {
            let nextInput = document.querySelector(`input[data-col="${nextCol}"][data-row="${nextRow}"]`);
            nextInput.focus();
        }
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

const FINALE_LETTERS = {
    "כ": "ך",
    "מ": "ם",
    "נ": "ן",
    "פ": "ף",
    "צ": "ץ"
};

const REVERSE_FINALE_LETTERS = {
    "ך": "כ",
    "ם": "מ",
    "ן": "נ",
    "ף": "פ",
    "ץ": "צ"
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
            if (/[א-ת]/.test(char)) {
                letter = char;
            }
            let maxLength = +(this.getAttribute("maxlength") || 1);

            if (letter) {
                if (this.value.length < maxLength) {
                    this.value += letter;
                } else {
                    this.value = letter;
                }
            } else {
                if (char === "backspace") {
                    this.value = this.value.slice(0, -1);
                }
                if (char === "delete") {
                    this.value = "";
                }
                if (char === "arrowright") {
                    goToNextInput(+(this.getAttribute("data-col") || 5), +(this.getAttribute("data-row") || 5), true);
                }
                if (char === "arrowleft") {
                    goToNextInput(+(this.getAttribute("data-col") || 5), +(this.getAttribute("data-row") || 5), false);
                }
                // if (char === "arrowup") {
                //     let col = +(this.getAttribute("data-col") || 5);
                //     let nextRow = col - 1;
                //     if (nextRow >= 0) {
                //         let nextInput = document.querySelector(`input[data-col="${nextRow}"]`);
                //         nextInput.focus();
                //     }
                // }
                // if (char === "arrowdown") {
                //     let col = this.getAttribute("data-col");
                //     let nextRow = parseInt(col) + 1;
                //     if (nextRow < 5) {
                //         let nextInput = document.querySelector(`input[data-col="${nextRow}"]`);
                //         nextInput.focus();
                //     }
                // }
                if (char === "enter") {
                    document.getElementById("submit-btn").click();
                }
            }
            if (this.value.length >= maxLength) {
                goToNextInput(+(this.getAttribute("data-col") || 5), +(this.getAttribute("data-row") || 5), true);
            }
        });
    }

    Array.from(inputsElements).forEach(input => {
        input.addEventListener("input", function(event) {
            let maxLength = +(this.getAttribute("maxlength") || 1);
            if (this.value.length >= maxLength) {
                input.nextElementSibling.focus();
            }
        });
    });

    document.getElementById("submit-btn")?.addEventListener("click", function () {
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
            let col = parseInt(input.getAttribute("data-col")?.toString() || "0");
            if (letter !== "" && !greens.includes(letter)) {
                yellows.push({ letter, col: (col) });
            }
        });
    
        const grayInput = document.getElementById("gray-input").value.trim();
        let grays = [];
        for (const char of grayInput) {
            if (char.trim() !== "") {
                grays.push(char);
                let finaleLetter = FINALE_LETTERS[char];
                if (finaleLetter) {
                    grays.push(finaleLetter);
                }
                let reverseFinaleLetter = REVERSE_FINALE_LETTERS[char];
                if (reverseFinaleLetter) {
                    grays.push(reverseFinaleLetter);
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
                const finaleLetter = FINALE_LETTERS[letter] || REVERSE_FINALE_LETTERS[letter];
                if (!word.includes(letter) && !word.includes(finaleLetter)) {
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

        let resultWordsString = "";
        for (let index = 0; index < result.length; index++) {
            if (index % 4 === 0) {
                resultWordsString += "\n";
            }
            resultWordsString += result[index] + " ";
        }
    
        document.getElementById("result-words").innerText = resultWordsString.trim();
    });
});

