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
            console.log(" * " + char + " test: " + regex.test(char));
            console.log(this);
        
            if (regex.test(char)) {
                console.log("hebrew");
            } else {
                console.log("not hebrew: " + char);
                this.value = "";
            }
            console.log("value: " + this.value);
        });
    }
});