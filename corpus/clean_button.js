
function mouseInside(minX, maxX, minY, maxY) {
    return mouseX >= minX && mouseX <= maxX && minY >= minY && mouseY <= maxY;
}

/** button **/
var button = function(btnXPos, btnYPos) {
    var btnMinX = btnXPos - 41;
    var btnMaxX = btnXPos + 42;

    var btnMinY = btnYPos - 17;
    var btnMaxY = btnYPos + 15;

    rectMode(RADIUS);
    // button clicking properties *//
    
    // TODO: check for redefinition of (special) functions
    mouseClicked = function() { // turns the buton on and off when clicked
        if (mouseInside(btnMinX, btnMaxX, btnMinY, btnMaxY)) {
            randomValue = random(0, randomValueMax);

            if (btn === false) {    // START \\
                btn = true;
                eat += 0.1;
            } else {                // STOP & PAUSE \\
                btn = false;
                restart();
                eat -= 0.1;
            }
        }
    };

    strokeWeight(1);
    // TODO: check if the args match, e.g. btnMinX ~ minX
    if (mouseInside(btnMinX, btnMaxX, btnMinY, btnMaxY)) {
        if (mouseIsPressed) { // changes the button properties while holding mouse
            fill(55, 105, 40);
        } else {
            fill(83, 161, 59);
        }
        textSize(25);
    } else {
        fill(116, 143, 86);
        textSize(20);
    }

    rect(btnXPos, btnYPos, 44, 17);


    // button text **/
    textAlign(CENTER, CENTER);
    strokeWeight(1);
    var label;
    
    if (btn === false) {
        fill(148, 16, 16);
        label = "START";
    } else {
        fill(115, 11, 11);
        if (eat <= 1) {
            label = "STOP";
        } else {
            label = "PAUSE";
        }
    }
    // is this necessarily cleaner?
    // it's less typing
    text(label, btnXPos, btnYPos);
    stroke(0, 0, 0);
};