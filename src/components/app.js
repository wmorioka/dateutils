// Toggle Menu
document.addEventListener("DOMContentLoaded", () => {
    const toggleMenu = document.querySelector("#toggle-menu")
    const menu = document.querySelector("#menu")

    toggleMenu.onclick = () => {
        toggleMenu.classList.toggle("hamburger-toggle")
        menu.classList.toggle("hidden")
    }
});
console.log("app.js loaded")

