

//GET Request //fetches once per refresh or save of the file
document.addEventListener("DOMContentLoaded", fetchHighscoreUsers) 

const highscoreListButton = document.getElementById('showHighscoreList')
highscoreListButton.addEventListener("click", showHighscoreList)


function fetchHighscoreUsers() {
    return fetch("http://localhost:3000/users/")
    .then(resp => resp.json())
    .then(json => renderHighscoreUsers(json))
    .catch(function(error){
        alert("Could not connect to server!");
        console.log(error.message);
    }) 
}

const highscoreList = document.getElementById('highscoreList')
function renderHighscoreUsers(users) {
    users.forEach(user => {
        const listElement = document.createElement("li")
        listElement.innerHTML = `${user.userName}, ${user.highScore}`
        highscoreList.appendChild(listElement)
    })
}

//button
function showHighscoreList() {
    const x = document.getElementById("highscoreList");
    if (x.style.display === "none") { //only works on inline styles
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


//POST Request
// const highscoreValue = document.getElementById("score").textContent;
// console.log(highscoreValue)

// const userName = document.getElementById("userNameText").value;
// document.getElementById('userName').innerHTML = userName;

// console.log(userName)
// const sendButton = document.getElementById("sendButton");
// sendButton.addEventListener("click", sendUsernameAndScore);
// // let formData = {
// //     userName = "${userName}`,
// //     highScore = `${highscoreValue}`
// // };
// let formData = {
//     userName: "",
//     highScore: "",
//   };

// let configObj = {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(formData)
// }

// function changeFormData() {
//         formData.userName = userName;
//         formData.highScore = `"${highscoreValue}"`;
// }
// console.log(formData.userName)

// function sendUsernameAndScore() {

//     return fetch("http://localhost:3000/users", configObj)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(object) {
//       console.log(object);
//     })
//     .catch(function(error) {
//       alert("Could not save to server, try again.");
//       console.log(error.message);
//     });
// }