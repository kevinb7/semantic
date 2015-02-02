var sunX = 300;
var sunY = 100;

var ballX, ballY, ballRadius;

// users might re-defined these variables... as long as they don't get redefined inside
// an event handler or the draw loop we're okay
ballX = 50;
ballY = 300;
ballRadius = 100;

var skyBlue = color(64,128,255);
var grassGreen = color(0, 191, 0);
var ballColor = color(255, 0, 0);

var start = false;

noStroke();

draw = function() {
    background(skyBlue);

    fill(grassGreen);
    rect(0,350,400,50);

    fill(ballColor);
    ellipse(ballX, ballY, ballRadius, ballRadius);

    if (start) {
        // is "start" ever true?
        // Yes, it gets set to true on line 68 inside of the keyPressed
        // if you press a key ballX will animate
        ballX += 1.0;
    }

    if (keyIsPressed) {
        // active animation
        if (keyCode === LEFT) {
            ballX -= 1.0;
        }
        if (keyCode === RIGHT) {
            ballX += 1.0;
        }
    }

    // TODO: determine what's visible after each draw function
    // TODO: determine anything that's drawn off-screen
};

mouseClicked = function() {
    if (dist(mouseX, mouseY, ballX, ballY) < ballRadius) {
        // passive animation
        // toggle pattern
        if (start) {
            start = false;
        } else {
            start = true;
        }
        // equivalent
        // start = !start;  // toggle pattern
        // we might also have a half toggle pattern
        // a.k.a initiator pattern
        // if (!start) { start = true; } // or something like that
    }
};

// this is als an active animation
keyPressed = function() {
    start = true;
};

keyReleased = function() {
    start = false;
};