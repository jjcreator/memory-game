// VARIABLES //

let images = [];
let setOne = [
    "url(images/setOne/eagle.jpg)",
    "url(images/setOne/flamingo.jpg)",
    "url(images/setOne/goose.jpg)",
    "url(images/setOne/hawk.jpg)",
    "url(images/setOne/swallow.jpg)",
    "url(images/setOne/sowa.jpg)",
    "url(images/setOne/swan.jpg)",
    "url(images/setOne/chick.jpg)",
    "url(images/setOne/bigowl.jpg)",
    "url(images/setOne/bweagle.jpg)",
    "url(images/setOne/greenbird.jpg)",
    "url(images/setOne/hover.jpg)",
    "url(images/setOne/toucan.jpg)",
    "url(images/setOne/seagull.jpg)",
    "url(images/setOne/smallbird.jpg)",
    "url(images/setOne/redparrot.jpg)",
    "url(images/setOne/blueparrot.jpg)",
    "url(images/setOne/crow.jpg)"
]

let setTwo = [
    "url(images/setTwo/astronaut.jpg)",
    "url(images/setTwo/blue.jpg)",
    "url(images/setTwo/eyes.jpg)",
    "url(images/setTwo/hole.jpg)",
    "url(images/setTwo/horizon.jpg)",
    "url(images/setTwo/moon.jpg)",
    "url(images/setTwo/moon2.jpg)",
    "url(images/setTwo/nebula.jpg)",
    "url(images/setTwo/saturn.jpg)",
    "url(images/setTwo/scifi2.jpg)",
    "url(images/setTwo/shuttle.jpg)",
    "url(images/setTwo/spaceship.jpg)",
    "url(images/setTwo/spaceship2.jpg)",
    "url(images/setTwo/station.jpg)",
    "url(images/setTwo/train.jpg)"
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
let setOneButton = document.getElementById("first-tileset");
let setTwoButton = document.getElementById("second-tileset");
let setThreeButton = document.getElementById("third-tileset");
let chosenTiles = "var(--first-tiles)";

// CREATE A IMAGE SET 

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
    let usedOnce = [];
    let usedTwice = [];
    randomizedArray = [];
    let image;
    chooseImages();
    // loops infinitely until it fills the randomized array with gamesize/2 items
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
        boxes[i].style.backgroundImage = chosenTiles;
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
                boxes[n].style.backgroundImage = chosenTiles;
                }
            }
        }
        if (revealedBoxes.length < 2) {
            myBox.style.backgroundImage = randomizedArray[num - 1];
            revealedBoxes.push(myBox);
        }
        if (revealedBoxes.length == 2) {
            if (revealedBoxes[0].style.backgroundImage != revealedBoxes[1].style.backgroundImage) {
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
            else if (revealedBoxes[0].style.backgroundImage == revealedBoxes[1].style.backgroundImage) {
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
        document.querySelector("#title").style.width = "80vw";
        document.querySelector("#title").style.marginRight = "0";
        document.querySelector("#title").textContent = `Victory! You won in ${elapsed} seconds! It took you ${clicks} clicks.`;
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
setOneButton.addEventListener("click", () => {
    chosenSet = setOne;
    chosenTiles = "var(--first-tiles)";
    reset();
    randomizeColors();
    document.querySelector("body").style.backgroundImage = "var(--first-background)";
});
setTwoButton.addEventListener("click", () => {
    chosenSet = setTwo;
    chosenTiles = "var(--second-tiles)";
    reset();
    randomizeColors();
    document.querySelector("body").style.backgroundImage = "var(--second-background)";
});
setThreeButton.addEventListener("click", () => {
    chosenSet = setThree;
    randomizeColors();
});
randomizeColors();



