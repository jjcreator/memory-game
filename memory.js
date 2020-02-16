let colors = [
    "yellow",
    "green",
    "blue",
    "red",
    "purple",
    "gray",
    "black",
    "pink"
];
let boxes = document.getElementsByClassName("box");
let start = document.querySelector("#start");
let gameSize = 16;
let randomizedArray = [];
let revealedBoxes = [];
let clicks = 0;

const randomizeColors = () => {
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
        clicks++;
        let myBox = this;
        let num = parseInt(this.id.match(/[0-9]+/g));
        const colorize = () => {
            for (let n=0; n<boxes.length; n++) {
                if (!boxes[n].classList.contains("found")) {
                boxes[n].style.backgroundColor = "orange"
                }
            }
        }
        if (revealedBoxes.length < 2) {
            myBox.style.backgroundColor = randomizedArray[num - 1];
            revealedBoxes.push(myBox);
        }
        if (revealedBoxes.length == 2) {
            if (revealedBoxes[0].style.backgroundColor != revealedBoxes[1].style.backgroundColor) {
                revealedBoxes = [];
                setTimeout(colorize, 750);
            }
            if (revealedBoxes[0].style.backgroundColor == revealedBoxes[1].style.backgroundColor) {
                revealedBoxes[0].classList.add("found");
                revealedBoxes[1].classList.add("found");
                revealedBoxes = [];
                colorize();
            }
    }
}
}

randomizeColors();

let box1 = document.getElementById("box1");
start.addEventListener("click", randomizeColors);
