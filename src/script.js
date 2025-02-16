function getCookie(key) {
    let cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        console.log("cookie: " + cookie);
        const [name, value] = cookie.trim().split("=");
        if (name === key) {
            return value;
        }
    }
    return null;
}

function setCookie(key, value) {
    console.log("setCookie - key: " + key + ", value: " + value);
    document.cookie = key + "=" + value + "; path=/";
    let cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        console.log("cookie: " + cookie);
    }
}

function applyTheme() {
    const theme = getCookie("theme");
    console.log("applyTheme - theme: " + theme);
    if (theme === "dark") {
        document.body.classList.add("dark");
        document.getElementById("theme-toggle").textContent = "Light";
    } else {
        document.body.classList.remove("dark");
        document.getElementById("theme-toggle").textContent = "Dark";
    }
}

function toggleTheme() {
    const theme = getCookie("theme");
    console.log("toggleTheme - theme: " + theme);
    if (theme === "dark") {
        setCookie("theme", "light");
    } else {
        setCookie("theme", "dark");
    }
    applyTheme();
}


document.addEventListener("DOMContentLoaded", function() {
    applyTheme();
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
});
