/** button **/
var button = function(btnXPos, btnYPos) {
    var btnMinX = btnXPos - 41;
    var btnMaxX = btnXPos + 42;

    var btnMinY = btnYPos - 17;
    var btnMaxY = btnYPos + 15;

    rectMode(RADIUS);
    // button clicking properties *//
    mouseClicked = function() { // turns the buton on and off when clicked
        if (mouseX >= btnMinX && mouseX <= btnMaxX) {     // verifies min and max xPositions
            if (mouseY >= btnMinY && mouseY <= btnMaxY) { // verifies min and max yPositions
                if (btn === false) {    // START \\
                    randomValue = random(0, randomValueMax);
                    btn = true;
                    eat += 0.1;

                } else {             // STOP & PAUSE \\
                    randomValue = random(0, randomValueMax);
                    btn = false;
                    restart();
                    eat -= 0.1;
                }
            }
        }
    };
    if (mouseX >= btnMinX && mouseX <= btnMaxX) {     // verifies min and max xPositions
        if (mouseY >= btnMinY && mouseY <= btnMaxY) { // verifies min and max yPositions
            strokeWeight(1);
            fill(83, 161, 59);
            rect(btnXPos, btnYPos, 44, 17);
            textSize(25);
            if (mouseIsPressed) { // changes the button properties while holding mouse
                strokeWeight(1);
                fill(55, 105, 40);
                rect(btnXPos, btnYPos, 44, 17);
                textSize(25);
            }
        } else {
            strokeWeight(1);
            fill(116, 143, 86);
            rect(btnXPos, btnYPos, 44, 17);
            textSize(20);
        }
    } else {
        strokeWeight(1);
        fill(116, 143, 86);
        rect(btnXPos, btnYPos, 44, 17);
        textSize(20);
    }

    // button text **/
    textAlign(CENTER, CENTER);
    if (btn === false) {
        strokeWeight(1);
        fill(148, 16, 16);
        text("START", btnXPos, btnYPos);
    } else {
        strokeWeight(1);
        fill(115, 11, 11);
        if (eat <= 1) {
            strokeWeight(1);
            text("STOP", btnXPos, btnYPos);
        } else {
            strokeWeight(1);
            text("PAUSE", btnXPos, btnYPos);
        }
    }
    stroke(0, 0, 0);
    strokeWeight(1);
};

