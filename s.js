'use strict';

// Selectors
let mainCanvas = document.querySelector("#mainCanvas");

// Get 2D context
let context = mainCanvas.getContext("2d");

// get inner height/width as variables
let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;

// fit canvas to page
mainCanvas.width = innerWidth - (innerWidth/10);
mainCanvas.height = innerHeight - (innerWidth/20);
mainCanvas.style.marginTop = `${innerHeight/350}vw`;
mainCanvas.style.marginLeft = `${innerHeight/140}vw`;

// Misc
let score = 0;

// Animation stuff
// let fpsInterval, then, now, elapsed;

class Snake {

    constructor (x, y, size, dx, dy) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.size = size;
        this.dx = dx;
        this.dy = dy;
        this.tail = [{x: this.x, y: this.y}];

        if (this.dx < 0) { // left
            this.dir = "left";
        } else if (this.dx > 0) { // right
            this.dir = "right";
        } else if (this.dy < 0) { // up
            this.dir = "up";
        } else if (this.dy > 0) { // down
            this.dir = "down";
        }
    }

    move() {
        // motion
        for (let i = 0; i < this.tail.length; i++) {
            this.tail[i].y += this.dy;
            this.tail[i].x += this.dx;
        }
    }
}

class Apple {
    constructor() {
        let isTouching;
        while(true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * (mainCanvas.width - (snake.size * 1.5)));
            this.y = Math.floor(Math.random() * (mainCanvas.height - (snake.size * 1.5)));
            
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true;
                }
            }
            
            this.size = snake.size;
            
            if (!isTouching) {
                break;
            }
        }
    }
}

let snake = new Snake(
    Math.random() * (mainCanvas.width - 6),
    Math.random() * (mainCanvas.height - 6),
    30, 6, 0
);

let apple = new Apple();

let checkCollision = () => {
    let snakeRight = snake.tail[0].x + snake.size;
    let appleRight = apple.x + apple.size;
    let snakeBottom = snake.tail[0].y + snake.size;
    let appleBottom = apple.y + apple.size;

    for (let i = 0; i < snake.tail.length; i++) {
        // Checking Edge Collision
        if (snake.dx != 0) {  // is it moving horizontally?
            if (snake.tail[i].x + snake.size > mainCanvas.width || snake.tail[i].x < 0) {
                snake.dx = -snake.dx; // Change this
            }
            
        } else { // is it moving vertically?
            if (snake.tail[i].y + snake.size > mainCanvas.height || snake.tail[i].y < 0) {
                snake.dy = -snake.dy; // Change this
            }
        }

        // Checking collision with apple
        if (snakeRight >= apple.x && snake.tail[i].x <= appleRight && snakeBottom >= apple.y && snake.tail[i].y <= appleBottom) {
            apple = new Apple();
            // snake.tail[snake.tail.length] = {x: snake.tail[snake.tail.length - 1].x, y: snake.tail[snake.tail.length - 1].y}
            
            // check mvmnt dir to add new tile correctly
            switch(snake.dir) {
                case "up":
                    break;
                case "down":
                    break;
                case "left":
                    break;
                case "right":
                    snake.tail[snake.tail.length] = {x: snake.tail[snake.tail.length - 1].x - 40 , y: snake.tail[snake.tail.length - 1].y};
                    break;
            }
            score++;
        }
    }
}

let draw = () => {

    for (let i = 0; i < snake.tail.length; i++) {
        context.fillStyle = "rgba(0,0,0)";
        context.fillRect(snake.tail[i].x, snake.tail[i].y, snake.size, snake.size);
        context.fillStyle = "rgba(19, 188, 19, 1)";
    }

    context.fillRect(apple.x, apple.y, apple.size, apple.size);
    context.font = "15px monospace";
    context.fillStyle = "rgba(0, 255, 65)";
    context.fillText(`Score: ${score}`, mainCanvas.width - 120, 18);
}

let animate = () => {
    context.clearRect(0, 0, innerWidth, innerHeight);
    snake.move();
    checkCollision();
    draw();
    requestAnimationFrame(animate);
}

let changeDir = (event) => {
    switch(event.key) {
        case "ArrowUp":
            snake.dir = "up";
            snake.dx = 0;
            snake.dy = -6;
            break;
            case "ArrowDown":
            snake.dir = "down";
            snake.dx = 0;
            snake.dy = 6;
            break;
        case "ArrowLeft":
            snake.dir = "left";
            snake.dx = -6;
            snake.dy = 0;
            break;
        case "ArrowRight":
            snake.dir = "right";
            snake.dx = 6;
            snake.dy = 0;
            break;
    }
}

window.onload = () => {
    // startAnimating();
    // animate();
    // mainLoop();
}

// Event Listeners
document.addEventListener("keydown", changeDir);

// let mainLoop = () => {  }

// let animate = (timestamp) => {
//     requestAnimationFrame(animate);
//     now = timestamp;
//     elapsed = then - now;
//
//     // Else 'skip' frames
//     if (elapsed > fpsInterval) {
//         context.clearRect(0, 0, innerWidth, innerHeight);
//         square.update();
//
//         then = now - (elapsed % fpsInterval)
//     }
// }
//
// let startAnimating = (fps) => {
//     fpsInterval = 1000/fps;
//     then = performance.now();
//     animate();
// }

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