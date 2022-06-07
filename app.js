'use strict';

// Selectors
let mainCanvas = document.querySelector("#mainCanvas");

// Get 2d canvas context
let context = mainCanvas.getContext('2d');

// shortening height/width prop
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

// Set FPS
let fps = 5;

// rgb
let r = 0;
let g = 226;
let b = 255;

// global circle props
// let radius = 30;

mainCanvas.width = innerWidth;
mainCanvas.height = innerHeight;

window.onload = () => {
    // mainLoop();
    animate();
}

// let mainLoop = () => {
//     setInterval(show, 1000/fps); //1000 = 1 second
// }

// let show = () => {
//     // draw();
// }

// let draw = () => {

//     context.beginPath();
//     context.arc(x, y, 30, 0, Math.PI * 2, false);
//     context.fillStyle = `rgba(${r},${g},${b}`;
//     context.fill();
//     // context.lineWidth = 2;
//     context.strokeStyle = "rgba(0, 0, 0, 0)";
//     context.stroke();

// }
                

class Circle {
    constructor(x, y, dx, dy) {
        // starting coords
        this.x = x;
        this.y = y;

        // starting velocity
        this.dx = dx;
        this.dy = dy;

        // radius
        this.radius = 25;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = `rgba(${r},${g},${b}`;
        context.fill();
        // context.strokeStyle = `rgba(${r},${g},${b}`;
        context.strokeStyle = "rgba(0,0,0,0)"
        context.stroke();
    }
    
    update() {
        // flips x velocity based on edge of screen detection
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        // flips x velocity based on edge of screen detection
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // creating motion
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

let circles = [];

let createCircle = (event) => {
    circles.push(new Circle(
        event.clientX,
        event.clientY,
        Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1),
        Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1)
    ));
}
    
let animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    circles.forEach((value, index, array) => {
        value.update();
    });
}

// Event Listeners
mainCanvas.addEventListener("click", createCircle);


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