// VARIABLES //

let colors = [
    "url(images/eagle.jpg)",
    "url(images/flamingo.jpg)",
    "url(images/goose.jpg)",
    "url(images/hawk.jpg)",
    "url(images/jaskolka.jpg)",
    "url(images/sowa.jpg)",
    "url(images/swan.jpg)",
    "url(images/chick.jpg)"
];
let boxes = document.getElementsByClassName("box");
let start = document.querySelector("#start");
let gameSize = 16;
let randomizedArray = [];
let revealedBoxes = [];
let clicks = 0;

// RESET GAME BOARD, RANDOMIZE POSITION OF COLORS, OPTIONALLY SET RANDOM COLORS

const randomizeColors = () => {
    /*colors = [];
    for (let i=0; i<gameSize/2; i++) {
        colors.push("rgb(" + (Math.floor(Math.random()*255)+1) + "," + (Math.floor(Math.random()*255)+1) + "," + (Math.floor(Math.random()*255)+1) + ")");
    }*/
    let usedOnce = [];
    let usedTwice = [];
    randomizedArray = [];
    for (let i=0; i<gameSize; i++) {
        while (true) {
            let color = colors[Math.floor(Math.random()*colors.length)];
            if (usedOnce.indexOf(color) == -1) {
                randomizedArray.push(color);
                usedOnce.push(color);
                break;
            }
            if (usedTwice.indexOf(color) == -1) {
                randomizedArray.push(color);
                usedTwice.push(color);
                break;
            }
        }
    }
}

const reset = () => {
    clicks = 0;
    for (let i=0; i<boxes.length; i++) {
        boxes[i].classList.remove("found");
        boxes[i].style.background = "var(--starting-background)";
        boxes[i].style.backgroundPosition = "center";
        boxes[i].style.backgroundSize = "cover";
    }
}

// CLICK EVENTS FOR BOXES - REVEAL HIDDEN COLOR

for (let k=0; k<boxes.length; k++) {
    boxes[k].addEventListener("click", function() {
        if (revealedBoxes[0] != this) {
        clicks++;
        let colorReset = 0;
        let myBox = this;
        let num = parseInt(this.id.match(/[0-9]+/g));
        const colorize = () => {
            for (let n=0; n<boxes.length; n++) {
                if (!boxes[n].classList.contains("found")) {
                boxes[n].style.background = "var(--starting-background)";
                boxes[n].style.backgroundPosition = "center";
                boxes[n].style.backgroundSize = "cover";
                }
            }
        }
        if (revealedBoxes.length < 2) {
            myBox.style.background = randomizedArray[num - 1];
            myBox.style.backgroundPosition = "center";
            myBox.style.backgroundSize = "cover";
            revealedBoxes.push(myBox);
        }
        if (revealedBoxes.length == 2) {
            if (revealedBoxes[0].style.background != revealedBoxes[1].style.background) {
                revealedBoxes = [];
                for (let a=0; a<boxes.length; a++) {
                    boxes[a].classList.add("pointer-none")
                }
                setTimeout(function() {
                    for (let b=0; b<boxes.length; b++) {
                        boxes[b].classList.remove("pointer-none");
                    }
                    colorize();
                }, 450);
            }
            else if (revealedBoxes[0].style.background == revealedBoxes[1].style.background) {
                revealedBoxes[0].classList.add("found");
                revealedBoxes[1].classList.add("found");
                revealedBoxes = [];
                colorize();
                
            }
        }
    victoryCheck();
}}
    )};


// CHECK FOR POINTS

const victoryCheck = () => {
    let victory = 0;
    for (let i=0; i<boxes.length; i++) {
        if (boxes[i].classList.contains("found")) {
            victory++;
        }
    if (victory == 16) {
        alert(`Congratulations! You won in ${clicks} clicks`);
    }
    }
}

// INITIALIZE GAME

start.addEventListener("click", randomizeColors);
start.addEventListener("click", reset);
randomizeColors();

