let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};  // if score JSON string not found or is null
updateScoreElement();

function getComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1/3) {
        return 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        return 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        return 'scissors';
    }
}

function resetScore() {
    localStorage.removeItem('score');
    score.wins = 0; score.losses = 0; score.ties = 0;
    updateScoreElement();
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    autoPlayButtonElement = document.querySelector(".autoplay-button");
    if (!isAutoPlaying) {
        autoPlayButtonElement.innerText = 'Stop Auto Play';
        intervalId = setInterval(() => {
            const playerMove = getComputerMove();
            getResult(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        autoPlayButtonElement.innerText = 'Auto Play';
        isAutoPlaying = false;
    }
} 


function getResult(playerMove) {
    let result = '';
    const computerMove = getComputerMove();
    if ((playerMove == 'rock' && computerMove == 'scissors') || (playerMove == 'scissors' && computerMove == 'paper') || (playerMove == 'paper' && computerMove == 'rock')) {
        result = 'You win.'
        score.wins++;
    } else if ((playerMove == 'scissors' && computerMove == 'rock') || (playerMove == 'paper' && computerMove == 'scissors') || (playerMove == 'rock' && computerMove == 'paper')) {
        result = 'You lose.'
        score.losses++;
    } else if (playerMove === computerMove) {
        result = 'Tie.'
        score.ties++;
    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    updateMoveElement(playerMove, computerMove);
    updateResultElement(result);           
}

function updateScoreElement() {
    document.querySelector('.js-score').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function updateMoveElement(playerMove, computerMove) {
    document.querySelector('.js-moves').innerHTML = `You <img src="assets/${playerMove}.png" class="move-icon">   <img src="assets/${computerMove}.png" class="move-icon"> Computer`;
}
function updateResultElement(result) {
    document.querySelector('.js-result').innerText = `${result}`;
}
