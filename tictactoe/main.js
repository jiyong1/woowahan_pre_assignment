const board = document.querySelector(".board");
const gameInfo = {
    'board': [],
    'boardInfo': Array.from({length: 9}, () => 0),
    'pickNum': 0,
    'xScore': 0,
    'oScore': 0,
};
const scoreElem = document.querySelector(".score");
const resetBtn = document.querySelector(".reset");
const newBtn = document.querySelector(".new");
let checking = false;
let xturn = true;

function init() {
    const boardBoxes = document.querySelectorAll('.box');
    boardBoxes.forEach(box => {
        gameInfo.board.push(box);
    })
    scoreUpdate();
}
function scoreUpdate() {
    scoreElem.innerHTML = `<span>${gameInfo.xScore}</span><span class="circle-score">${gameInfo.oScore}</span>`;
}
function resetGame(next) {
    gameInfo.board.forEach(box => {
        while (box.hasChildNodes()) {
            box.removeChild(box.lastChild);
        }
    })
    if (next == 2) xturn = false;
    else xturn = true;
    gameInfo.pickNum = 0;
    gameInfo.boardInfo.fill(0);
}
function newGame() {
    gameInfo.xScore = 0;
    gameInfo.oScore = 0;
    scoreUpdate();
    resetGame();
}
function gameCheck(pick) {
    // pick: 1 or 2 -> x, o
    // 1. 가로 검사
    for (let i=0; i<3; i++) {
        for (let j=i*3; j<i*3+3; j++) {
            if (gameInfo.boardInfo[j] !== pick) break;
            if (j === i*3+2) {
                return { 
                    indexArr: Array.from({length: 3}, (_, k) => i*3+k),
                    winner: pick
                }
            }
        }
    }
    // 2. 세로 검사
    for (let i=0; i<3; i++) {
        for (let j=i; j<=i+6; j+=3) {
            if (gameInfo.boardInfo[j] !== pick) break;
            if (j === i+6) {
                return {
                    indexArr: Array.from({length: 3}, (_, k) => i+k*3),
                    winner: pick
                }
            }
        }
    }
    // 3. 대각선 검사
    for (let i=0; i<9; i+=4) {
        if (gameInfo.boardInfo[i] !== pick) break;
        if (i === 8) {
            return { 
                indexArr: [0, 4, 8],
                winner: pick
            }
        }
    }
    for (let i=2; i<=6; i+=2) {
        if (gameInfo.boardInfo[i] !== pick) break;
        if (i === 6) {
            return {
                indexArr: [2, 4, 6],
                winner: pick
            }
        }
    }

    if (gameInfo.pickNum === 9) {
        return {
            winner: false
        }
    }
}
function makeX() {
    const lineOne = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const lineTwo = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineOne.setAttribute('x1', "15");
    lineOne.setAttribute('y1', "15");
    lineOne.setAttribute('x2', "85");
    lineOne.setAttribute('y2', "85");
    lineOne.setAttribute('stroke', "white");
    lineOne.setAttribute('stroke-width', "6%");
    lineTwo.setAttribute('x1', "85");
    lineTwo.setAttribute('y1', "15");
    lineTwo.setAttribute('x2', "15");
    lineTwo.setAttribute('y2', "85");
    lineTwo.setAttribute('stroke', "white");
    lineTwo.setAttribute('stroke-width', "6%");
    const rv = {
        lineOne,
        lineTwo
    };
    return rv;
}
function makeO() {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", "35");
    circle.setAttribute("stroke", "#0c332e");
    circle.setAttribute("stroke-width", "6%");
    circle.setAttribute("fill", "none");
    return circle;
}
function setLayout() {
    board.style.height = `${board.getBoundingClientRect().width - 1}px`;
}
function boardClickHandler(e) {
    if (checking) return;
    let current = e.target;
    checking = true;
    while (current != board) {
        if (current.nodeName === "svg" && !current.hasChildNodes()) {
            const idx = current.dataset.idx;
            let pick;
            if (xturn) {
                pick = 1;
                const x = makeX();
                current.appendChild(x.lineOne);
                setTimeout(() => {
                    current.appendChild(x.lineTwo);
                }, 300);
            } else {
                pick = 2;
                const circle = makeO();
                current.appendChild(circle);
            }
            gameInfo.boardInfo[idx] = pick;
            gameInfo.pickNum += 1;
            xturn = !xturn;
            setTimeout(() => {
                const result = gameCheck(pick);
                if (result) {
                    let next;
                    if (result.winner === 1) {
                        gameInfo.xScore += 1;
                        xturn = false;
                        next = 2;
                    } else if (result.winner === 2) {
                        gameInfo.oScore += 1;
                        xturn = true;
                        next = 1;
                    } else {
                        next = xturn? 1:2;
                    }
                    if (result.winner) {
                        scoreUpdate();
                        result.indexArr.forEach(idx => {
                            gameInfo.board[idx].childNodes.forEach(child => {
                                child.style.transform = "scale(1.2)";
                            })
                        })
                        setTimeout(() => {
                            resetGame(next);
                            checking = false;
                        }, 600);
                    } else {
                        resetGame(next);
                        checking = false;
                    }
                } else {
                    checking = false;
                }
            }, 700)
            return;
        }
        current = current.parentNode;
    }
}

window.addEventListener('resize', setLayout);
board.addEventListener('click', boardClickHandler);
resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', newGame);
setLayout();
init();