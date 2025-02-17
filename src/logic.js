function clearAll() {
    let inputsArray = document.getElementsByTagName("input");
    for (let i = 0; i < inputsArray.length; i++) {
        inputsArray[i].value = "";
    }
}