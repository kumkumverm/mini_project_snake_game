//Games constant and variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('resource/food.mp3');
const gameOverSound = new Audio('resource/gameover.mp3');
const moveSound = new Audio('resource/move.mp3');
const musicSound = new Audio('resource/music.mp3');
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 12, y: 14 }

let speed = 5;
let score = 0;
//main function
function main(cTime) {
    window.requestAnimationFrame(main);
    //console.log(cTime);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    gameEngine();
}
function isCollide(snake) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            score=0;
            scoreBox.innerHTML = "Score: " + score;
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        score=0;
        scoreBox.innerHTML = "Score: " + score;
        return true;
    }
}
function gameEngine() {
    // Part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over. Press any key to play again!");
        snakeArr = [
            { x: 13, y: 15 }
        ];
        food = { x: 12, y: 14 };
        // musicSound.play();
        score = 0;

    }
    //If you have eaten the food, increment the score and update the snake
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        //  if(score>hiscoreval){
        //     hiscoreval=score;
        //     highScoreBox.innerHTML="Highest Score: "+hiscore;
        //     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
        //}
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };//for creating a new object
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // part 2: Display the snake and food
    //   Display the snake  
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;//at 29min

        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);



    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);







}

//Main logic 
// musicSound.play();

//     let hiscore=localStorage.getItem("hiscore");
//     if(hiscore===null){
//          hiscoreval = 0; // or some other value

//    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));

//     }
//     else{
//         hiscoreval= JSON.parse(hiscore);
//         highScoreBox.innerHTML="Higest Score: " +hiscore;
//     }
window.requestAnimationFrame(main);//why to use can use at stack or chatgpt
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//Start the game 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});