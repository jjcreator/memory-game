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

const randomizeColors = () => {
    let usedOnce = [];
    let usedTwice = [];
    for (let i=0; i<boxes.length; i++) {
        boxes[i].backgroundColor = "white";
        while (true) {
            let color = colors[Math.floor(Math.random()*colors.length)];
            if (usedOnce.indexOf(color) == -1) {
                boxes[i].style.backgroundColor = color;
                usedOnce.push(color);
                break;
            }
            if (usedTwice.indexOf(color) == -1) {
                boxes[i].style.backgroundColor = color;
                usedTwice.push(color);
                break;
            }
        }
    }
}

function select() {


}

start.addEventListener("click", randomizeColors);
boxes.addEventListener("click", );