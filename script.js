const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Load sound effects
const placeSound = new Audio('place-sound.mp3');
const winSound = new Audio('win-sound.mp3');

// Create the game board dynamically
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    }
}

// Handle a cell being clicked
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] !== '' || !gameActive) {
        return; // Ignore if the cell is already filled or the game is inactive
    }

    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer); // Add class for neon effect
    placeSound.play(); // Play sound when a mark is placed

    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} has won!`;
        winSound.play(); // Play sound when a player wins
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        gameStatus.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    // Clear the board cells
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove class for neon effect
    });
}

// Initialize the game
createBoard();
