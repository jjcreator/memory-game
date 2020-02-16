let colors = [
    "yellow",
    "green",
    "turquoise",
    "red",
    "purple",
    "gray",
    "coral",
    "maroon"
];
let boxes = document.getElementsByClassName("box");
let start = document.querySelector("#start");
let gameSize = 16;
let randomizedArray = [];
let revealedBoxes = [];
let clicks = 0;

const randomizeColors = () => {
    colors = [];
    for (let i=0; i<gameSize/2; i++) {
        colors.push("rgb(" + (Math.floor(Math.random()*255)+1) + "," + (Math.floor(Math.random()*255)+1) + "," + (Math.floor(Math.random()*255)+1) + ")");
    }
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
                boxes[n].style.backgroundColor = "var(--secondary-color)";
                }
            }
        }
        for (let j=0; j<boxes.length; j++) {
            if (boxes[j].style.backgroundColor !="var(--secondary-color)" && !boxes[j].classList.contains("found")) {
                colorReset++
            }
            if (colorReset >2) {
                colorize();
                break;
            }

        }
        if (revealedBoxes.length < 2) {
            myBox.style.backgroundColor = randomizedArray[num - 1];
            revealedBoxes.push(myBox);
        }
        if (revealedBoxes.length == 2) {
            if (revealedBoxes[0].style.backgroundColor != revealedBoxes[1].style.backgroundColor) {
                revealedBoxes = [];
                setTimeout(colorize, 555);
            }
            else if (revealedBoxes[0].style.backgroundColor == revealedBoxes[1].style.backgroundColor) {
                revealedBoxes[0].classList.add("found");
                revealedBoxes[1].classList.add("found");
                revealedBoxes = [];
                colorize();
                
            }
        }
    victoryCheck();
}}
    )};

randomizeColors();
const reset = () => {
    clicks = 0;
    for (let i=0; i<boxes.length; i++) {
        boxes[i].classList.remove("found");
        boxes[i].style.backgroundColor = "var(--secondary-color)"
    }
}

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

start.addEventListener("click", randomizeColors);
start.addEventListener("click", reset)

