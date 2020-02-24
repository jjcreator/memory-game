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
    "url(images/setOne/crow.jpg)",
    "url(images/setOne/blackswan.jpg)",
    "url(images/setOne/tinybird.jpg)",
    "url(images/setOne/duck.jpg)"
];

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
    "url(images/setTwo/train.jpg)",
    "url(images/setTwo/moon3.jpg)",
    "url(images/setTwo/takeoff.jpg)",
    "url(images/setTwo/system.jpg)",
    "url(images/setTwo/iss.jpg)",
    "url(images/setTwo/desert.jpg)",
    "url(images/setTwo/ufo.jpg)",
    "url(images/setTwo/mysterious.jpg)"
];

let setThree = [
    "url(images/setThree/bear.jpg)",
    "url(images/setThree/beaver.jpg)",
    "url(images/setThree/boar.jpg)",
    "url(images/setThree/butterfly.jpg)",
    "url(images/setThree/chipmunk.jpg)",
    "url(images/setThree/deer.jpg)",
    "url(images/setThree/dragonfly.jpg)",
    "url(images/setThree/elk.jpg)",
    "url(images/setThree/fox.jpg)",
    "url(images/setThree/hedgehog.jpg)",
    "url(images/setThree/lynx.jpg)",
    "url(images/setThree/moose.jpg)",
    "url(images/setThree/rabbit.jpg)",
    "url(images/setThree/snake.jpg)",
    "url(images/setThree/spider.jpg)",
    "url(images/setThree/squirrel.jpg)",
    "url(images/setThree/wolf.jpg)",
    "url(images/setThree/frog.jpg)",
    "url(images/setThree/ladybug.jpg)",
    "url(images/setThree/furry.jpg)"
];

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
let easyModeButton = document.querySelector("#easy-mode");
let mediumModeButton = document.querySelector("#medium-mode");
let hardModeButton = document.querySelector("#hard-mode");
let musicButton = document.querySelector("#music-toggle");
let soundButton = document.querySelector("#sound-toggle")
let themeMusic = new Audio("./sounds/191725__mika55__synth-loop.wav");
let clickSound = new Audio("./sounds/321082__benjaminnelan__wooden-hover.wav");
let errorSound = new Audio("./sounds/371190__plutoniumisotop__lock.wav")
let foundSound = new Audio("./sounds/325805__wagna__collect.wav");
let victorySound = new Audio("./sounds/258142__tuudurt__level-win.wav");
let musicMuted = false;
let soundMuted = false;
let confirmButton = document.querySelector("#confirm-button");
let mainGrid = document.querySelector("#main-grid");


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

// RESET GAME BOARD, RANDOMIZE POSITION OF IMAGES

const randomizeImages = () => {
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

// RESET GAME STATE

const reset = () => {
    mainGrid.style.display = "grid";
    revealedBoxes = [];
    //time and clicks reset
    clicks = 0;
    clearInterval(timing);
    elapsed = 0;
    time.innerText = "0";
    //reset button disappears
    start.style.display = "none";
    //timer disappears
    document.getElementById("timer").style.display = "none";
    //options appear
    document.querySelector("#tile-select").style.display = "flex";
    document.querySelector("#difficulty").style.display = "flex";
    document.querySelector("#music").style.display = "flex";
    //main text resets and animates
    let h1 = document.querySelector("#title");
    h1.style.width = "50vw";
    h1.textContent = "";
    h1.classList.add("animated");
    //boxes are reset
    for (let i=0; i<boxes.length; i++) {
        boxes[i].classList.remove("found");
        boxes[i].style.backgroundImage = chosenTiles;
    }
}

// CLICK EVENTS FOR BOXES - REVEAL HIDDEN COLOR

const addEvents = () => {
    for (let k=0; k<boxes.length; k++) {
        boxes[k].addEventListener("click", function() {
            //variable declarations
            let myBox = this;
            let num = parseInt(this.id.match(/[0-9]+/g));
            let h1 = document.querySelector("#title");
            //reset button appears
            start.style.display = "flex";
            // makes options disappear
            document.querySelector("#tile-select").style.display = "none";
            document.querySelector("#difficulty").style.display = "none";
            document.querySelector("#music").style.display = "none";
            // disables text animation
            h1.classList.remove("animated");
            h1.textContent = "Let's go!!!";
            // starts timer
            document.getElementById("timer").style.display = "block";
            if (clicks == 0) {
                timing = setInterval(timer, 1000);
            }
            // sets backgrounds back to tile back
            const colorize = () => {
                for (let n=0; n<boxes.length; n++) {
                    if (!boxes[n].classList.contains("found")) {
                    boxes[n].style.backgroundImage = chosenTiles;
                    }
                }
            }
            if (revealedBoxes[0] != this) {
                click();
                clicks++;
                if (revealedBoxes.length < 2) {
                    myBox.style.backgroundImage = randomizedArray[num - 1];
                    revealedBoxes.push(myBox);
                }
                if (revealedBoxes.length == 2) {
                    if (revealedBoxes[0].style.backgroundImage != revealedBoxes[1].style.backgroundImage) {
                        revealedBoxes = [];
                        for (let a=0; a<boxes.length; a++) {
                            boxes[a].classList.add("pointer-none");
                        }
                        setTimeout(function() {
                            for (let b=0; b<boxes.length; b++) {
                                boxes[b].classList.remove("pointer-none");
                                if (soundMuted == false) {
                                    errorSound.play();
                                }
                            }
                            colorize();
                        }, 550);
                    }
                    else if (revealedBoxes[0].style.backgroundImage == revealedBoxes[1].style.backgroundImage) {
                        revealedBoxes[0].classList.add("found");
                        revealedBoxes[1].classList.add("found");
                        if (soundMuted == false) {
                            foundSound.pause();
                            foundSound.currentTime = 0;
                            foundSound.volume = 0.3;
                            foundSound.play();
                        }
                        revealedBoxes = [];
                        colorize();
                    }
                }
            }
        victoryCheck();
    }
        )};

};

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
        themeMusic.pause();
        if (soundMuted == false) {
            victorySound.volume = 0.3;
            victorySound.play();
        }
        victoryScreenOn();
        setTimeout(playMusic, 4000);
        document.querySelector("#title").textContent = `Victory! TOTAL SCORE: ${gameSize * 625 - (Math.round((elapsed + clicks * 2)/3)*100)} (${elapsed} seconds, ${clicks} clicks)`;
    }
    }
}
// VICTORY SCREEN

const victoryScreenOn = () => {
    mainGrid.style.display = "none";
    let victoryScreen = document.querySelector("#victory-screen");
    let score = (gameSize * 625 - (Math.round((elapsed + clicks * 2)/3)*100));
    score = 5;
    victoryScreen.style.display = "flex";
    victoryScreen.style.transform = "scale(1)";
    let scoreText = document.querySelector("#score");
    let bling;
    let ended = new Promise(function (resolve, reject) {
        let i = 0;
        bling = setInterval(()=> {
            i++;
            scoreText.innerText = `TOTAL SCORE: ${i}`
        }, 1000);
        if (i === score) {
            resolve();
        }
        else {
            reject();
        }
        });
    ended.then(clearInterval(bling)); 
}

// AUDIO EFFECT FUNCTIONS

const playMusic = () => {
    themeMusic.loop = true;
    themeMusic.volume = 0.06;
    if (!musicMuted) {
        themeMusic.currentTime = 0;
        themeMusic.play();
        
    }
    else {
        themeMusic.pause();
        themeMusic.currentTime = 0;
    }
}

errorSound.volume = 0.25;

const click = () => {
    clickSound.volume = 0.2;
    if (soundMuted == false) { 
    clickSound.play();
}
    
}

// TIMER
const timer = () => {
    elapsed++;
    time.textContent = elapsed.toString();
}

// CHANGE GAME SIZE 

const gameDifficulty = (boardSize) => {
    let game = document.querySelector("#main-grid");
    let newDiv;
    game.innerHTML = "";
    gameSize = boardSize;
    for (n=1; n<boardSize+1; n++) {
        newDiv = document.createElement("div");
        newDiv.classList.add("box");
        newDiv.id = "box" + n;
        game.appendChild(newDiv);
        }
    boxes = document.getElementsByClassName("box");
    if (gameSize == 16) {
        game.classList.remove("six-columns");
        game.classList.remove("nine-columns");
        game.classList.add("four-columns");
    }
    if (gameSize == 24) {
        game.classList.add("six-columns");
        game.classList.remove("nine-columns");
        game.classList.remove("four-columns");
    }
    if (gameSize == 36) {
        game.classList.remove("six-columns");
        game.classList.add("nine-columns");
        game.classList.remove("four-columns");
    }
    addEvents();
    randomizeImages();
    reset();
}

// INITIALIZE GAME

addEvents();
randomizeImages();
start.addEventListener("click", randomizeImages);
start.addEventListener("click", reset);
start.addEventListener("click", click);
setOneButton.addEventListener("click", () => {
    click();
    chosenSet = setOne;
    chosenTiles = "var(--first-tiles)";
    reset();
    randomizeImages();
    document.querySelector("body").style.backgroundImage = "var(--first-background)";
    setOneButton.style.backgroundColor = "rgba(97,76,131,0.6)";
    setTwoButton.style.backgroundColor = "transparent";
    setThreeButton.style.backgroundColor = "transparent";
});
setTwoButton.addEventListener("click", () => {
    click();
    chosenSet = setTwo;
    chosenTiles = "var(--second-tiles)";
    reset();
    randomizeImages();
    document.querySelector("body").style.backgroundImage = "var(--second-background)";
    setOneButton.style.backgroundColor = "transparent";
    setTwoButton.style.backgroundColor = "rgba(97,76,131,0.6)";
    setThreeButton.style.backgroundColor = "transparent"
});
setThreeButton.addEventListener("click", () => {
    click();
    chosenSet = setThree;
    chosenTiles = "var(--third-tiles)";
    reset();
    randomizeImages();
    document.querySelector("body").style.backgroundImage = "var(--third-background)";
    setThreeButton.style.backgroundColor = "rgba(97,76,131,0.8)";
    setOneButton.style.backgroundColor = "transparent";
    setTwoButton.style.backgroundColor = "transparent";
});
easyModeButton.addEventListener("click", () => {
    click();
    gameDifficulty(16);
    easyModeButton.style.backgroundColor = "rgba(97,76,131,0.8)";
    mediumModeButton.style.backgroundColor = "transparent";
    hardModeButton.style.backgroundColor = "transparent";
});
mediumModeButton.addEventListener("click", () => {
    click();
    gameDifficulty(24);
    easyModeButton.style.backgroundColor = "transparent";
    mediumModeButton.style.backgroundColor = "rgba(97,76,131,0.8)";
    hardModeButton.style.backgroundColor = "transparent";

});
hardModeButton.addEventListener("click", ()=> {
    click();
    gameDifficulty(36);
    easyModeButton.style.backgroundColor = "transparent";
    mediumModeButton.style.backgroundColor = "transparent";
    hardModeButton.style.backgroundColor = "rgba(97,76,131,0.7)";
});

musicButton.addEventListener("click", () => {
    click();
    if (musicMuted === true) {
        musicMuted = false;
        musicButton.style.backgroundColor = "rgba(97,76,131,0.7)";
        playMusic();
    }
    else {
        musicMuted = true;
        musicButton.style.backgroundColor = "transparent";
        playMusic();
    }
});

soundButton.addEventListener("click", () => {
    victoryScreenOn();
    if (soundMuted === true) {
        soundMuted = false;
        soundButton.style.backgroundColor = "rgba(97,76,131,0.7)";
    }
    else {
        soundMuted = true;
        soundButton.style.backgroundColor = "transparent";
    }
    click();

});

confirmButton.addEventListener("click", ()=> {
    document.querySelector("#start-overlay").style.backgroundColor = "transparent";
    document.querySelector("#start-overlay").style.transform = "scale(0)";
    setTimeout(playMusic, 1000);
});




