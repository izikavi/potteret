function applyTheme() {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

function toggleTheme() {
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
    applyTheme();
}

document.addEventListener("DOMContentLoaded", function() {
    applyTheme();
});

function helpToggle() {
    let popup = document.getElementById("help-popup");
    popup.classList.toggle("hidden");
}
