// VARIABLES //

let images = [];
let setOne = [
    "url(images/eagle.jpg)",
    "url(images/flamingo.jpg)",
    "url(images/goose.jpg)",
    "url(images/hawk.jpg)",
    "url(images/swallow.jpg)",
    "url(images/sowa.jpg)",
    "url(images/swan.jpg)",
    "url(images/chick.jpg)",
    "url(images/bigowl.jpg)",
    "url(images/bweagle.jpg)",
    "url(images/greenbird.jpg)",
    "url(images/hover.jpg)",
    "url(images/toucan.jpg)",
    "url(images/seagull.jpg)",
    "url(images/smallbird.jpg)",
    "url(images/redparrot.jpg)",
    "url(images/blueparrot.jpg)",
    "url(images/crow.jpg)"
]

let boxes = document.getElementsByClassName("box");
let start = document.querySelector("#start");
let gameSize = 16;
let randomizedArray = [];
let revealedBoxes = [];
let clicks = 0;
let time = document.getElementById("time");
let elapsed = 0;
let timing;
let chosenSet = setOne;

// CREATE A GAME SET 

const chooseImages = () => {
    let chosenImage;
    images = [];
    for (let z = 0; z < (gameSize / 2); z++) {
        while(true) {
            chosenImage = chosenSet[Math.floor(Math.random()*chosenSet.length)]
            if (images.indexOf(chosenImage) == -1) {
                images.push(chosenImage);
                break;
            }
        }
    }
}

// RESET GAME BOARD, RANDOMIZE POSITION OF COLORS, OPTIONALLY SET RANDOM COLORS

const randomizeColors = () => {
    let x = 0;
    let usedOnce = [];
    let usedTwice = [];
    randomizedArray = [];
    let image;
    chooseImages();
    for (let i=0; i<gameSize; i++) {
        while (true) {
            image = images[Math.floor(Math.random()*images.length)];
            if (usedOnce.indexOf(image) == -1) {
                randomizedArray.push(image);
                usedOnce.push(image);
                break;
            }
            if (usedTwice.indexOf(image) == -1) {
                randomizedArray.push(image);
                usedTwice.push(image);
                break;
            }
            
            console.log(usedOnce);
            console.log(usedTwice)
            x++;
        }
    }
}

const reset = () => {
    //timer disappears
    document.getElementById("timer").style.display = "none";
    //options appear
    document.querySelector("#tile-select").style.display = "flex";
    document.querySelector("#difficulty").style.display = "flex";
    document.querySelector("#music").style.display = "flex";
    //time and clicks reset
    clicks = 0;
    clearInterval(timing);
    elapsed = 0;
    time.innerText = "0";
    //main text resets and animates
    let h1 = document.querySelector("h1");
    h1.style.width = "50vw";
    h1.textContent = "";
    h1.style.animation = "scroll 1s linear infinite alternate";
    h1.classList.add("animated");
    //boxes are reset
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
        //makes options disappear
        document.querySelector("#tile-select").style.display = "none";
        document.querySelector("#difficulty").style.display = "none";
        document.querySelector("#music").style.display = "none";
        // disables text animation
        let h1 = document.querySelector("h1");
        h1.classList.remove("animated");
        h1.textContent = "Let's go!!!";
        h1.style.animation = "burn 1s linear alternate infinite";
        // starts timer
        document.getElementById("timer").style.display = "block";
        if (clicks == 0) {
            timing = setInterval(timer, 1000);
        }
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
    if (victory == gameSize) {
        clearInterval(timing);
        document.querySelector("h1").style.width = "80vw";
        document.querySelector("h1").textContent = `Victory! You won in ${elapsed} seconds! It took you ${clicks} clicks.`;
    }
    }
}

//
const timer = () => {
    elapsed++;
    time.textContent = elapsed.toString();
}

// INITIALIZE GAME

start.addEventListener("click", randomizeColors);
start.addEventListener("click", reset);
randomizeColors();



