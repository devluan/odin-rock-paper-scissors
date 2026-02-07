const roundEl = document.getElementById("round");
const humanScoreEl = document.getElementById("human-score");
const computerScoreEl = document.getElementById("computer-score");

const btnRockEl = document.getElementById("btn-rock");
const btnPaperEl = document.getElementById("btn-paper");
const btnScissorsEl = document.getElementById("btn-scissors");

const humanChoiceEl = document.getElementById("human-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const resultEl = document.getElementById("result");

const btnResetEl = document.getElementById("btn-reset");

let round;
let humanScore;
let computerScore;

function playGame() {
    humanScore = 0;
    computerScore = 0;
    round = 0;
}

function getComputerChoice() {
    const choice = ["rock", "paper", "scissors"];
    return choice[Math.floor(Math.random() * 3)];
}

function calculateWinner(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) return "It's a tie!";
    else if (
        humanChoice == "rock" && computerChoice == "scissors" ||
        humanChoice == "paper" && computerChoice == "rock" ||
        humanChoice == "scissors" && computerChoice == "paper"
    ) {
        humanScore++;
        return "You win!";
    } else {
        computerScore++;
        return "Computer wins!";
    }

}

function renderScoreboard() {
    roundEl.innerHTML = `Round: <b>${round}/5</b>`;
    humanScoreEl.innerHTML = `You: <b>${humanScore}</b>`;
    computerScoreEl.innerHTML = `Computer: <b>${computerScore}</b>`;
}

function renderGameStatus(humanChoice, computerChoice, roundResult) {
    humanChoiceEl.innerHTML = `You chose: <b>${humanChoice}</b>`;
    computerChoiceEl.innerHTML = `Computer chose: <b>${computerChoice}</b>`;
    resultEl.style.color = "black";
    resultEl.innerHTML = roundResult;
}

function gameOver() {
    toggleChoiceButtons(false);
    if (humanScore > computerScore) {
        confetti();
        resultEl.style.color = "green";
        resultEl.innerHTML = `<b>You won the game!</b>`;
    } else if (humanScore < computerScore) {
        resultEl.style.color = "red";
        resultEl.innerHTML = `<b>You lost the game!</b>`;
    } else {
        resultEl.style.color = "gray";
        resultEl.innerHTML = `<b>You tied the game!</b>`;
    }

}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const roundResult = calculateWinner(humanChoice, computerChoice);

    renderGameStatus(humanChoice, computerChoice, roundResult);
    
    round++;
    renderScoreboard();

    if (round >= 5) gameOver();
}

function resetGame() {
    toggleChoiceButtons(true);
    playGame();
    renderScoreboard();
    renderGameStatus("-", "-", "Make your move!");
}

function toggleChoiceButtons(enable) {
    btnRockEl.disabled = !enable;
    btnPaperEl.disabled = !enable;
    btnScissorsEl.disabled = !enable;
}

btnRockEl.addEventListener("click", () => playRound("rock"));
btnPaperEl.addEventListener("click", () => playRound("paper"));
btnScissorsEl.addEventListener("click", () => playRound("scissors"));
btnResetEl.addEventListener("click", resetGame);

playGame();