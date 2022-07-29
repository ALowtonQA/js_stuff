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

    constructor (x, y, size) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.size = size;
        this.tail = [{x: this.x, y: this.y}];
        this.dir = "right";
    }

    move() {
        let newRect

        switch(this.dir) {
            case "up":
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y - this.size
                }
                break;
            case "down":
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y + this.size
                }
                break;
            case "left":
                newRect = {
                    x: this.tail[this.tail.length - 1].x - this.size,
                    y: this.tail[this.tail.length - 1].y
                }
                break;
            case "right":
                newRect = {
                    x: this.tail[this.tail.length - 1].x + this.size,
                    y: this.tail[this.tail.length - 1].y
                }
                break;
        }

        this.tail.shift()
        this.tail.push(newRect)
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
    20
);

let apple = new Apple();

let checkCollision = () => {
    let snakeHead = snake.tail[snake.tail.length - 1];
    let snakeRight = snakeHead.x + snake.size;
    let appleRight = apple.x + apple.size;
    let snakeBottom = snakeHead.y + snake.size;
    let appleBottom = apple.y + apple.size;

    // Checking Edge Collision
    if (snakeRight >= mainCanvas.width) {
        snakeHead.x = 0;
        snakeRight = snakeHead.x + snake.size;
    } else if (snakeHead.x <= 0) {
        snakeHead.x = mainCanvas.width - snake.size;
        snakeRight = snakeHead.x + snake.size;
    } else if (snakeBottom >= mainCanvas.height) {
        snakeHead.y = 0;
        snakeBottom = snakeHead.y + snake.size;
    } else if (snakeHead.y <= 0) {
        snakeHead.y = mainCanvas.height - snake.size;
        snakeBottom = snakeHead.y + snake.size;
    }

    // Checking collision with apple
    if (snakeRight >= apple.x && snakeHead.x <= appleRight && snakeBottom >= apple.y && snakeHead.y <= appleBottom) {
        // snake.tail[snake.tail.length] = {x: snake.tail[snake.tail.length - 1].x + snake.size, y: snake.tail[snake.tail.length - 1].y + snake.size};
        snake.tail[snake.tail.length] = {x: apple.x, y: apple.y};
        apple = new Apple();
        score++;
    }
}


let drawRect = (x, y, height, width, colour) => {
    context.fillStyle = colour;
    context.fillRect(x, y, width, height);
}

let draw = () => {

    for (let i = 0; i < snake.tail.length; i++) {
        drawRect(snake.tail[i].x, snake.tail[i].y,
            snake.size, snake.size, "white");
    }

    context.font = "15px monospace";
    context.fillStyle = "rgba(0, 255, 65)";
    context.fillText(`Score: ${score}`, mainCanvas.width - 120, 18);

    drawRect(apple.x, apple.y, apple.size, apple.size, "green");
}

let fpsInterval, startTime, then, now, elapsed;

let animate = (newTime) => {
    // request another frame
    requestAnimationFrame(animate);

    // calc elapsed time since last loop
    now = newTime;
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here
        context.clearRect(0, 0, innerWidth, innerHeight);
        snake.move();
        checkCollision();
        draw();

        if (score % 5 == 0 && fpsInterval < 60) {
            fpsInterval++;
        }
    }
}

let startAnimating = () => {
    fpsInterval = 1000 / 20;
    then = window.performance.now();
    startTime = then;
    console.log(startTime);
    animate();
}

let changeDir = (event) => {
    switch(event.key) {
        case "ArrowUp":
            snake.dir = "up";
            break;
            case "ArrowDown":
            snake.dir = "down";
            break;
        case "ArrowLeft":
            snake.dir = "left";
            break;
        case "ArrowRight":
            snake.dir = "right";
            break;
    }
}

window.onload = () => {
    // startAnimating();
}

// Event Listeners
document.addEventListener("keydown", changeDir);