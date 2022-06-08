'use strict';

// Selectors
let mainCanvas = document.querySelector("#mainCanvas");

// Get 2D context
let context = mainCanvas.getContext("2d");

// get inner height/width as variables
let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;

// fit canvas to page
mainCanvas.width = innerWidth;
mainCanvas.height = innerHeight;

// Misc
let lvl = 1;

// Animation stuff
let fpsInterval, then, now, elapsed;

class Square {

    constructor (x, y, height, width, dx, dy) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        // context.fillStyle = "rgba(0, 255, 0, 0.2)";
        context.fillRect(this.x, this.y, this.height, this.width);
    }

    update() {
        // is object moving horizontally???????
        if (this.dx != 0) {
            // edge detection x
            if (this.x + (this.width/2) > innerWidth || this.x - (this.width/2) < 0) {
                this.dx = -this.dx; // Change this
            }
            
        } else {
            // edge detection y
            if (this.y + (this.height/2) > innerHeight || this.y - (this.height/2) < 0) {
                this.dy = -this.dy; // Change this
            }
        }

        // motion
        this.y += this.dy;
        this.x += this.dx;

        this.draw();
    }
}

window.onload = () => {
    // startAnimating();
    // mainLoop();
}

// let mainLoop = () => {
    
// }

let animate = (timestamp) => {
    requestAnimationFrame(animate);
    now = timestamp;
    elapsed = then - now;

    // Else 'skip' frames
    if (elapsed > fpsInterval) {
        context.clearRect(0, 0, innerWidth, innerHeight);
        square.update();
    }

    
}

let startAnimating = (fps) => {
    fpsInterval = 1000/fps;
    then = performance.now();
    animate();
}

let square = new Square(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    50, 50, 6, 0
);

let changeDir = (event) => {
    switch(event.key) {
        case "ArrowUp":
            square.dx = 0;
            square.dy = 5 + lvl;
            break;
        case "ArrowDown":
            square.dx = 0;
            square.dy = -5 + lvl;
            break;
        case "ArrowLeft":
            square.dx = -5 + lvl;
            square.dy = 0;
            break;
        case "ArrowRight":
            square.dx = 5 + lvl;
            square.dy = 0;
            break;
    }
}

// Event Listeners
mainCanvas.addEventListener("keydown", changeDir);

// Rects
// context.fillStyle = "rgba(255, 0, 0, 0.2)";
// context.fillRect(100, 100, 100, 100);
// context.fillStyle = "rgba(0, 0, 255, 0.2)";
// context.fillRect(400, 100, 100, 100);
// context.fillStyle = "rgba(0, 255, 0, 0.2)";
// context.fillRect(300, 300, 100, 100);

// Lines
// context.beginPath();
// context.moveTo(50, 300);
// context.lineTo(300, 100);
// context.lineTo(400, 300);
// context.lineTo(50, 300);
// context.strokeStyle = "lightblue";
// context.stroke();

// Arcs / Circles
// for (let i = 0; i < 3; i++) {
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;

//     context.beginPath();
//     context.arc(x, y, 30, 0, Math.PI * 2, false);
//     context.strokeStyle = "lightblue";
//     context.stroke();
// }