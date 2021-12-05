
document.addEventListener("DOMContentLoaded", function fetchHighscoreUsers() {
    return fetch("http://localhost:3000/users/")
    .then(resp => resp.json())
    .then(json => renderHighscoreUsers(json))
})

const highscoreList = document.getElementById('highscoreList')
function renderHighscoreUsers(users) {

}

function showHighscoreList() {
    const x = document.getElementById("highscoreList");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}