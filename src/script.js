function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function applyTheme() {
    var theme = getCookie("theme");
    if (theme === "dark") {
        console.log("Applying dark theme");
        document.body.classList.add("dark");
        // document.getElementById("theme-toggle").classList.toggle("fa-sun");
        document.getElementById("theme-icon").textContent = "brightness_7";
    } else {
        console.log("Applying light theme");
        document.body.classList.remove("dark");
        // document.getElementById("theme-toggle").classList.toggle("fa-moon");
    }
}

function toggleTheme() {
    var theme = getCookie("theme");
    if (theme === "dark") {
        console.log("Switching to light theme");
        setCookie("theme", "light");
    } else {
        console.log("Switching to dark theme");
        setCookie("theme", "dark");
    }
    applyTheme();
}