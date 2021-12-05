// Your code here
//npm install -g json-server DONE!
//to watch server json-server --watch db.json
const snakeBackground = document.getElementById("gameCanvas"); //create variable for the "gameCanvas" element
const snakeBackgroundCtx = gameCanvas.getContext("2d",{alpha:false}); //make the rendering context of "gameCanvas" in a 2D space
const saveNameInput = document.getElementById("enterName")

// document.addEventListener('keydown', (e) => {
//   console.log(e.key)
// })


//array with objects containing co-ordinates as elements
let snake = [  
    {x: 200, y: 200},  //head
    {x: 190, y: 200},  
    {x: 180, y: 200},  
    {x: 170, y: 200},  
    {x: 160, y: 200},
];

//set colors for background, border, snake, snake outline
const gameBorder = 'black';
const gameBackground = 'grey';
const snakeColor = 'lightblue';
const snakeBorder = 'darkblue';

//add eyes!
//this function adds color and strokes to the snake based on the snake array position
function drawSnakePart(snakeBody) 
{  

  snakeBackgroundCtx.fillStyle = 'lightblue';  //fill with color
  snakeBackgroundCtx.strokestyle = 'darkblue'; //stroke color
  snakeBackgroundCtx.fillRect(snakeBody.x, snakeBody.y, 10, 10); //fill left to right, top to bottom 10px at every array element position
//   snakeBackgroundCtx.strokeRect(snakeBody[0].x, snakeBody[0].y, 15, 15)
  snakeBackgroundCtx.strokeRect(snakeBody.x, snakeBody.y, 10, 10); //make border on the newly create squares
//   snakeBackgroundCtx.strokeRect(snakeBody[0].x, snakeBody[0].y, 2, 2);
}

//performs the drawSnakePart function on each element
function drawSnake() 
{  
  snake.forEach(drawSnakePart);

}

//update the background for each movement of the snake
//overrides styling from css
function clearBackground() {
  snakeBackgroundCtx.fillStyle = gameBackground; //grey canvas
  snakeBackgroundCtx.strokestyle = snakeBorder; //black border on canvas
  snakeBackgroundCtx.fillRect(0, 0, snakeBackground.width, snakeBackground.height)
  snakeBackgroundCtx.strokeRect(0, 0, snakeBackground.width, snakeBackground.height) //x, y start position, x length, y length
}

//reset position, clear game canvas, redraw snake
function newGame() {
  console.log("new game")
  saveNameInput.style.display = "none";
  score = 0;
  document.getElementById('score').innerHTML = `${score}`;
    snake = [  
      {x: 200, y: 200},  //original position
      {x: 190, y: 200},  
      {x: 180, y: 200},  
      {x: 170, y: 200},  
      {x: 160, y: 200},
  ];
      //make snake move the same way again
      dx = 10; 
      dy = 0;
      return gameUpdate();
}

document.addEventListener('keydown', (event) => {
  if (event.key === "Enter" && gameStatus === "ended") {
    gameStatus = "started"
    generateFood();
    return newGame();
  }
})  

//collide with border
//collide with snake own body
function gameEnd() {
  clearInterval(intervalStatus);
  intervalStatus = null;
  gameStatus = "ended";
  saveNameInput.style.display = "block";
  console.log('game end')
}

//pause feature
function pauseGame(){
  clearInterval(intervalStatus)
  intervalStatus = null;
  console.log("game is paused")
}
document.addEventListener('keydown', (event) => {
  //  

  if (event.key === " " && gamePaused === true && gameStatus === "started") {
    gameUpdate();
    gamePaused = false;
    
  }
  else if (event.key === " " && gamePaused === false && gameStatus === "started") {
    pauseGame();
    gamePaused = true;
    
  }
}) 


let foodX;
let foodY;
let intervalStatus;
let gameStatus = "ended";
let gamePaused = false;
let changingDirection;
let snakeCollideOnSelf = false;


//make the snake update to appear moving
function gameUpdate() {
  console.log("game is on")
  if (gameStatus === "started") {
    intervalStatus = setInterval( () => 
    {
      changingDirection = false; //every update allow us to turn
      clearBackground(); //clear tail trail thats left from moveSnake
      drawSnake(); //draw actual snake
      moveSnake(); //move snake along visually but adding and deleting parts of it
      drawFood();
      // gameUpdate(); //keep calling gameUpdate every 1000ms if you use setTimeout
      // console.log(`changingDirection is ${changingDirection}`)
    }, 75)
    
  }
  
}
 


//auto-move the snake 
//dx and dy are variables holding the snake velocity (just amount of pixels to move the head by)
//includes border collide scenario
let dx = 10 //initial horizontal speed
let dy = 0 //initial vertical speed
let score = 0
function moveSnake() {
    const snakeHead = {x: snake[0].x + dx, y: snake[0].y + dy} //snakeHead object to move snake
    snake.unshift(snakeHead); //add new head to snake to simulate movement
    
    //grow snake logic
    if (snake[0].x === foodX && snake[0].y === foodY) {
      console.log(`Eaten food at: ${snake[0].x}, ${snake[0].y}`) //last eaten food
      score += 1
      document.getElementById('score').innerHTML = `${score}`;
      generateFood();
    } else {
      snake.pop();//continue removing tail to simulate movement
    }

    // console.log(`x:${snakeHead.x}, y:${snakeHead.y}`)
    //self collide scenario

    const leftBorder = 0;
    const rightBorder = snakeBackground.width - 10; //500
    const topBorder = snakeBackground.height - 10; //500
    const bottomBorder = 0 
    //i = 4 because the snake will at minimum make a square of size 4 blocks before collding on itself
    for (let i = 4; i < snake.length; i++)
    {    
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        console.log("collided with body")
        return gameEnd();
    } else if (snakeHead.x < leftBorder || snakeHead.x > rightBorder || snakeHead.y < bottomBorder || snakeHead.y > topBorder) {
      console.log("collided with border")
      return gameEnd();
    }
    }
  


    //border collide scenario






}

//alter dx and dy based on keydown
//prevent reverse movement by more logic
function changeDirection(event) {
  
  //break from function if we are in the middle of "turning"
  //this is for a scenario where we might press two keys quickly in succession and the snake appears to reverse on itself
  if (changingDirection === true) return; //break out
  changingDirection = true;
  // console.log(`changingDirection is ${changingDirection}`)
  
  //during time of this function changingDirection is true, so we break out of function and not reverse on ourselves


  //set moving states to prevent reversing
  const movingUp = dy === -10;
  const movingDown = dy === 10;
  const movingLeft = dx === -10;
  const movingRight = dx === 10;

//logical not operator to stop reversal 
  if (event.key === "ArrowUp" && !movingDown) { //if ArrowUp is pressed and we are not moving down, then go upwards
    dx = 0;
    dy = -10;
  }
  else if (event.key === "ArrowDown" && !movingUp) {
    dx = 0;
    dy = 10;
  }
  else if (event.key === "ArrowLeft" && !movingRight) {
    dx = -10;
    dy = 0;
  }
  else if (event.key === "ArrowRight" && !movingLeft) {
    dx = 10;
    dy = 0;
  }

}
document.addEventListener('keydown', changeDirection); 
//keydown passes argument to changeDirection, to determine movement of the snake


//add fruit eating
//add highscore feature with database of high scorers
//FOOD
function randomNumber() {
  return Math.round(Math.random() * (snakeBackground.width - 10)/10) * 10; //avoid spawning below border so 490
}

// let partOfSnake = false
function generateFood() {
  foodX = randomNumber();
  foodY = randomNumber(); 
  console.log(`New location of food is: ${foodX}, ${foodY}`) //new location of food
  

  //logic for do not spawn food on snake
  //invoke function again if the generated food is on the snake body array
 snake.forEach(function spawnCheck(snakePart){ 
   if (snakePart.x === foodX && snakePart.y === foodY) {//if any body parts match our currently generated food
    // console.log(snake)
    console.log("Respawn food")
    generateFood(); //generate a new food

   } 
 })
}

// function generateSecondFood() {
//   foodX = randomNumber();
//   foodY = randomNumber(); 
//   console.log(`New location of SecondFood is: ${foodX}, ${foodY}`)
// }


  //draw food to game background
  function drawFood() {
    snakeBackgroundCtx.fillStyle = 'lightgreen';
    snakeBackgroundCtx.strokestyle = 'darkgreen';
    snakeBackgroundCtx.fillRect(foodX, foodY, 10, 10);
    snakeBackgroundCtx.strokeRect(foodX, foodY, 10, 10);
  }
  

//check //do not spawn food on snake logic in generateFood function