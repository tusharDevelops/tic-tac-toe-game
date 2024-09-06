
// Selecting all elements with the class "box" and the elements with the classes "game-info" and "btn"
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Variables to track the current player and the state of the game grid
let currentPlayer;
let gameGrid;

// Array containing all possible winning combinations
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // Resetting each box and enabling pointer events
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        
        // Removing the "win" class if present
        if (box.classList.contains("win")) {
            box.classList.remove("win");
        }
    });

    // Removing the "active" class from the New Game button
    newGameBtn.classList.remove("active");

    // Displaying the current player in the game info section
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Initializing the game
initGame();

// Function to swap turns between players
function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";

    // Updating the UI with the current player
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Function to handle the click on a box
function handleClick(i) {
    if (gameGrid[i] === "") {
        // Updating the box with the current player's symbol
        boxes[i].innerText = currentPlayer;
        gameGrid[i] = currentPlayer;

        // Disabling pointer events for the clicked box
        boxes[i].style.pointerEvents = "none";

        // Swapping turns between players
        swapTurn();

        // Checking if the game is over
        checkGameOver();
    }
}

// Adding click event listeners to all boxes
boxes.forEach((box, i) => {
    box.addEventListener("click", () => {
        handleClick(i);
    });
});

// Adding click event listener to the New Game button
newGameBtn.addEventListener("click", initGame);

// Function to check if the game is over
function checkGameOver() {
    let answer = "";

    // Iterating through all winning positions
    winningPositions.forEach((winner) => {
        if (
            (gameGrid[winner[0]] !== "" || gameGrid[winner[1]] !== "" || gameGrid[winner[2]] !== "") &&
            ((gameGrid[winner[0]] == gameGrid[winner[1]]) && (gameGrid[winner[1]] == gameGrid[winner[2]]))
        ) {
            // Updating the answer with the winner
            answer = gameGrid[winner[0]];

            // Disabling pointer events for all boxes
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Adding "win" class to the winning boxes
            boxes[winner[0]].classList.add("win");
            boxes[winner[1]].classList.add("win");
            boxes[winner[2]].classList.add("win");
        }
    });

    // If there is a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // If no winner found, check for a tie
    let fillCount = 0;

    // Counting the filled boxes on the game grid
    gameGrid.forEach((box) => {
        if (box !== "") fillCount++;
    });

    // If the board is filled and there is no winner, it's a tie
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}
