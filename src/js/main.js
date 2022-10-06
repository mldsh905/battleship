//generate grid
function generateGrid(side,length) {
    const player = document.querySelector(`.${side}`);
//generate ul-li
    for (let i = 0; i < length; i++) {
        const ul = document.createElement("ul");
        player.appendChild(ul);
        for (let j = 0; j < length; j++) {
            const li = document.createElement("li");
            ul.appendChild(li);
        }
    }
}

startGame();

//start game
function startGame() {
    const player = document.querySelector('.player');
    const computer = document.querySelector('.computer');
    player.textContent = '';
    computer.textContent = '';
    generateGrid('player',8);
    generateGrid('computer',8);
    generateBattleship('player');
    generateBattleship('player');
    generateBattleship('player');
    generateBattleship('player');
    generateBattleship('computer');
    generateBattleship('computer');
    generateBattleship('computer');
    generateBattleship('computer');
    clickAndFindWinner();
    setPlayBtn();
}

//generate battleship
function generateBattleship(side) {
    let randomCell;
    const cells = document.querySelectorAll(`.${side} li`);
    //find a direction
    let direction = Math.floor(Math.random() * 2);
//find a location
//horizon battleship
    if (direction === 0) {
        randomCell = cells[Math.floor(Math.random() * cells.length)];
        //avoid duplication cells
        while (Array.from(randomCell.parentNode.children).indexOf(randomCell) > 5 ||
        randomCell.classList.contains('battleship') ||
        randomCell.nextElementSibling.classList.contains('battleship') ||
        randomCell.nextElementSibling.nextElementSibling.classList.contains('battleship')) {
            randomCell = cells[Math.floor(Math.random() * cells.length)];
        }
        //point out battleship cells with specific class
        randomCell.classList.add('battleship');
        randomCell.nextElementSibling.classList.add('battleship');
        randomCell.nextElementSibling.nextElementSibling.classList.add('battleship');
        //point out battleship cells with specific color
        if (side !== 'player') {
            randomCell.style.backgroundColor = 'blue';
            randomCell.nextElementSibling.style.backgroundColor = 'blue';
            randomCell.nextElementSibling.nextElementSibling.style.backgroundColor = 'blue';
        }
        //vertical battleship
    } else if (direction === 1) {
        let randomCellUlIndex;
        randomCell = cells[Math.floor(Math.random() * cells.length)];
        let randomCellLiIndex = Array.from(randomCell.parentNode.parentNode.children).indexOf(randomCell.parentNode);
        randomCellUlIndex = Array.from(randomCell.parentNode.children).indexOf(randomCell);
        //avoid duplication cells
        while (randomCellLiIndex > 5 ||
        randomCell.classList.contains('battleship') ||
        randomCell.parentNode.nextElementSibling.children[randomCellUlIndex].classList.contains('battleship') ||
        randomCell.parentNode.nextElementSibling.nextElementSibling.children[randomCellUlIndex].classList.contains('battleship')) {
            randomCell = cells[Math.floor(Math.random() * cells.length)];
            randomCellLiIndex = Array.from(randomCell.parentNode.parentNode.children).indexOf(randomCell.parentNode);
            randomCellUlIndex = Array.from(randomCell.parentNode.children).indexOf(randomCell);
        }
        //point out battleship cells with specific class
        randomCellUlIndex = Array.from(randomCell.parentNode.children).indexOf(randomCell);
        randomCell.classList.add('battleship');
        randomCell.parentNode.nextElementSibling.children[randomCellUlIndex].classList.add('battleship');
        randomCell.parentNode.nextElementSibling.nextElementSibling.children[randomCellUlIndex].classList.add('battleship');
        //point out battleship cells with specific color
        if (side !== 'player') {
            randomCell.style.backgroundColor = 'blue';
            randomCell.parentNode.nextElementSibling.children[randomCellUlIndex].style.backgroundColor = 'blue';
            randomCell.parentNode.nextElementSibling.nextElementSibling.children[randomCellUlIndex].style.backgroundColor = 'blue';
        }
    }
}

//click change color and find winner
function clickAndFindWinner() {
    //change color of all cells without/with battleship
    const cells = document.querySelectorAll(`.player li`);
    cells.forEach(e => {
        e.addEventListener('click', () => {
            if (e.classList.contains('battleship')){
                e.style.backgroundColor = 'red';
                e.classList.add('attacked');
            }else {
                e.style.backgroundColor = 'grey';
            }

            const computerBattleshipCells = document.querySelectorAll('.computer li');
            let computerRandomCell = computerBattleshipCells[Math.floor(Math.random() * computerBattleshipCells.length)];
            //avoid duplicated
            while (computerRandomCell.classList.contains('clicked')) {
                computerRandomCell = computerBattleshipCells[Math.floor(Math.random() * computerBattleshipCells.length)];
            }
            //point out battleship cells with specific class and color
            if (computerRandomCell.classList.contains('battleship')){
                computerRandomCell.style.backgroundColor = 'red';
                computerRandomCell.classList.add('attacked');
                computerRandomCell.classList.add('clicked');
            }else{
                computerRandomCell.style.backgroundColor = 'grey';
                computerRandomCell.classList.add('clicked');
            }
            //find winner
            findWinner();
        },{once:true})
    })
}

//find winner
function findWinner() {
    let youWin = true;
    const playerBattleshipsToBeAttacked = document.querySelectorAll(`.player .battleship`);
    playerBattleshipsToBeAttacked.forEach(item => {
        if (!item.classList.contains('attacked')) {
            youWin = false;
        }
    })
    let computerWin = true;
    const computerBattleshipsToBeAttacked = document.querySelectorAll(`.computer .battleship`);
    computerBattleshipsToBeAttacked.forEach(item => {
        if (!item.classList.contains('attacked')) {
            computerWin = false;
        }
    })
    const winner = document.querySelector('.winner');
    if (youWin === true) {
        winner.textContent = 'You Win!';
        const tryAgain = document.querySelector('.tryAgain');
        tryAgain.style.display = 'grid';
    }else if (computerWin === true) {
        winner.textContent = 'Computer Win!';
        const tryAgain = document.querySelector('.tryAgain');
        tryAgain.style.display = 'grid';
    }
}

//play again
function setPlayBtn() {
    const btn = document.querySelector('.again');
    const tryAgain = document.querySelector('.tryAgain');
    btn.addEventListener('click',()=>{
        tryAgain.style.display = 'none';
        startGame();
    })
}
