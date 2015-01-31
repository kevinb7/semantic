/**
 * Source: https://www.khanacademy.org/computer-programming/spin-off-of-project-animal-attack/6241717012135936
 * Author: https://www.khanacademy.org/profile/Abhishek0710
 */

/********|SPIDER|*|VARIABLES|********/
/**/ var eat = 0;                 /**/
/**/ var neck = -10;              /**/
/**/                              /**/
/**/ var bodyX = 200;             /**/
/**/ var bodyY = 310;             /**/
/**/ var bodyW = eat + 50;        /**/ // body wheight
/**/ var bodyHW = 40 + (bodyW/8); /**/ // head wheight
/**/ var bodyH = eat;             /**/ // height
/**/                              /**/
/**/ var rotation = 15;           /**/ // opened jaw size (15 = default opened)
/**/ var biting = false;          /**/ // toggle biting movement
/**/ var biteMax = 5;             /**/
/**/ var biteMin = -10;           /**/
/**/ var biteSpd = 15;            /**/
/**/                              /**/
/**/                              /**/
/**/ var xrAL = 60;               /**/ // xPositionA (leg 1 & 4) L
/**/ var xrBL = 70;               /**/ // xPositionB (leg 2 & 3) L
/**/                              /**/
/**/ var yrAL = 45;               /**/ // yPositionA (leg 1 & 4) L
/**/ var yrBL = 15;               /**/ // yPositionB (leg 2 & 3) L
/**/                              /**/
/**/ var xrAR = 60;               /**/ // xPositionA (leg 1 & 4) R
/**/ var xrBR = 70;               /**/ // xPositionB (leg 2 & 3) R
/**/                              /**/
/**/ var yrAR = 45;               /**/ // yPositionA (leg 1 & 4) R
/**/ var yrBR = 15;               /**/ // yPositionB (leg 2 & 3) R
/**/                              /**/
/**/                              /**/
/**/ var minXA = 40 + eat/10;     /**/
/**/ var maxXA = 45 + eat/10;     /**/
/**/                              /**/
/**/ var minXB = 55 + eat/10;     /**/
/**/ var maxXB = 60 + eat/10;     /**/
/**/                              /**/
/**/ var minYA = 30 + eat/10;     /**/
/**/ var maxYA = 50 + eat/10;     /**/
/**/                              /**/
/**/ var minYB = 5 + eat/10;      /**/
/**/ var maxYB = 25 + eat/10;     /**/
/**/                              /**/
/**/                              /**/
/**/ xrAL = random(minXA, maxXA); /**/
/**/ xrBL = random(minXB, maxXB); /**/
/**/                              /**/
/**/ yrAL = random(minYA, maxYA); /**/
/**/ yrBL = random(minYB, maxYB); /**/
/**/                              /**/
/**/ xrAR = random(minXA, maxXA); /**/
/**/ xrBR = random(minXB, maxXB); /**/
/**/                              /**/
/**/ yrAR = random(minYA, maxYA); /**/
/**/ yrBR = random(minYB, maxYB); /**/
/************************************/


/**********|OBJECT|*|AND|*|BUTTON|*|VARIABLES|*************/
/**/ var bug = getImage("creatures/OhNoes");            /**/
/**/ var xPos = -10;                                    /**/
/**/ var yPos = -10;                                    /**/
/**/ var endPos = 500;                                  /**/ // max yPos possible
/**/ var pass = true;                                   /**/ // verifies if yPos is lower than endPos
/**/ var fallSpd = 1;                                   /**/ // fall speed
/**/                                                    /**/
/**/ var working = false;                               /**/
/**/ var btn = false;                                   /**/
/**/                                                    /**/
/**/ var errors = ["Not defined", "Error", "Oh noes!"]; /**/
/**/ var randomValueMax = errors.length - 0.5;          /**/
/**/ var randomValue = random(0, randomValueMax);       /**/
/**/ var randomErrorValue = round(randomValue);         /**/
/**/ var randomError = randomErrorValue;                /**/
/**/ var error;                                         /**/
/**********************************************************/

draw = function() {
    background(52, 232, 235);

    /** floor **/

        // middle **/
    fill(41, 230, 70);
    rect(200, 371, 200, 128);

    // boards **/
    fill(128, 108, 53);
    rect(0, 242, 400, 3);
    rect(0, 395, 400, 3);
    rect(396, 372, 3, 133);
    rect(3, 372, 3, 133);

    /** score **/
    var score = function() {
        fill(156, 23, 23);
        textSize(29.5);
        if (eat === 0) {
            pushMatrix();
            translate(0, 2);
            textAlign(LEFT, TOP);
            text("UP, DOWN, LEFT and RIGHT", 0, 0);
            text("to move", 147, 30);
            text("Click", 122, 130);
            text("to eat BUGS", 122, 161);
            popMatrix();
        } else if (eat === 1 || eat === 1.1) {
            pushMatrix();
            translate(390, 379);
            textAlign(RIGHT, BASELINE);
            text("You ate a bug", 0, 0);
            popMatrix();
        } else if (eat > 0.1) {
            pushMatrix();
            translate(390, 379);
            textAlign(RIGHT, BASELINE);
            text("You ate " + round(eat) + " bugs", 0, 0);
            popMatrix();
        }
    };

    /** objects **/
    var obj = function(wrk) {
        fill(194, 164, 15);
        if (wrk === true) {
            working = true;
            imageMode(CENTER);
            var imgHW = 8;
            rectMode(CENTER);
            noStroke();

            // baloon **/
            for (var i = 0; i < 4; i++) {
                var WH = (i+1)*25;
                textAlign(CENTER, CENTER);
                rectMode(CENTER);
                noStroke();
                if (xPos < 200) {
                    // tiny baloons **/
                    fill(255, 255, 255, 60 - yPos + 10);
                    rect(xPos + i*22 + 22, yPos - i*8, WH, WH/2, 1000);

                    // bigger baloon **/
                    fill(255, 255, 255, 98 - yPos + 10);
                    rect(xPos + 4*27 + 22, yPos - 4*8, 4*40, (5*25)/2, 1000);

                    // baloon text **/
                    fill(179, 163, 117, 95 - yPos + 10);
                    text(error,xPos + 4*27 + 22, yPos - 4*8);

                } else {
                    // tiny baloons **/
                    fill(255, 255, 255, 60 - yPos + 10);
                    rect(xPos - i*22 - 22, yPos - i*8, WH, WH/2, 1000);

                    // bigger baloon **/
                    fill(255, 255, 255, 98 - yPos + 10);
                    rect(xPos - 4*27 - 22, yPos - 4*8, 4*40, (5*25)/2, 1000);

                    // bigger baloon **/
                    fill(179, 163, 117, 95 - yPos + 10);
                    text(error,xPos - 4*27 - 22, yPos - 4*8);
                }
            }

            // bug **/
            image(bug, xPos, yPos, width/imgHW, height/imgHW);

        } else if (wrk === "" || wrk === false) {
            working = false;
        }
    };

    /** restart object **/
    var restart = function() {
        randomErrorValue = round(randomValue);
        randomError = randomErrorValue;
        error = errors[randomError];
        yPos = -10;
        pass = false;
        var rand = random(5, 395);
        xPos = rand;
    };

    /** object properties **/
    if (working === true) { // when the object is still not past the bottom it will increase it's yPos and toggle "pass"
        if (pass === false) {
            if (yPos < endPos) {
                yPos += fallSpd;
            } else {
                pass = true;
            }
        } else { // when the object falls from the screen, it will appear again in a randon location at the top
            randomValue = random(0, randomValueMax);
            restart();
        }
    }

    /** focus point **/
    var focusPoint;
    if (working === false) {
        focusPoint = mouseX;
    } else {
        focusPoint = xPos;
    }

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

    /** spider **/
    var spider = function() {
        fill(105, 81, 57);

        // legs **/
        strokeWeight(3);

        // LI
        /**============================================================================================================================================**/
        /*** left legs inner part **/                                                                                                                 /**/
        /**/                                                                                                                                          /**/
        /**/ line(bodyX - (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrAL + eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY); /**/ // leg 1LI
        /**/                                                                                                                                          /**/
        /**/ line(bodyX - (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrBL + eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY); /**/ // leg 2LI
        /**/                                                                                                                                          /**/
        /**/ line(bodyX - (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrBL - eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY);/**/ // leg 3LI
        /**/                                                                                                                                          /**/
        /**/ line(bodyX - (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrAL - eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY);/**/ // leg 4LI
        /**============================================================================================================================================**/

        // LO
        /**=====================================================================================================================================================================**/
        /*** left legs outter part **/                                                                                                                                         /**/
        /**/                                                                                                                                                                   /**/
        /**/ line(bodyX - (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrAL + eat/10) + bodyH/10, bodyX - (xrAL + eat/10) + ((focusPoint - bodyX)/10), bodyY - 100);  /**/ // leg 1LO
        /**/                                                                                                                                                                   /**/
        /**/ line(bodyX - (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrBL + eat/10) + bodyH/10, bodyX - (xrBL + eat/10) + ((focusPoint - bodyX)/10), bodyY - 70);   /**/ // leg 2LO
        /**/                                                                                                                                                                   /**/
        /**/ line(bodyX - (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrBL - eat/10) + bodyH/10, bodyX - (xrBL + eat/10) + ((focusPoint - bodyX)/10) , bodyY + 70); /**/ // leg 3LO
        /**/                                                                                                                                                                   /**/
        /**/ line(bodyX - (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrAL - eat/10) + bodyH/10, bodyX - (xrAL + eat/10), bodyY + 100);                             /**/ // leg 4LO
        /**=====================================================================================================================================================================**/

        // RI
        /**============================================================================================================================================**/
        /*** right legs inner part **/                                                                                                                /**/
        /**/                                                                                                                                          /**/
        /**/ line(bodyX + (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrAL + eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY); /**/ // leg 1RI
        /**/                                                                                                                                          /**/
        /**/ line(bodyX + (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrBL + eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY); /**/ // leg 2RI
        /**/                                                                                                                                          /**/
        /**/ line(bodyX + (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrBL - eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY);/**/ // leg 3RI
        /**/                                                                                                                                          /**/
        /**/ line(bodyX + (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrAL - eat/10) + bodyH/10, bodyX + ((focusPoint - bodyX)/30), bodyY);/**/ // leg 4RI
        /**============================================================================================================================================**/

        // RO
        /**====================================================================================================================================================================**/
        /*** right legs outter part **/                                                                                                                                       /**/
        /**/                                                                                                                                                                  /**/
        /**/ line(bodyX + (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrAL + eat/10) + bodyH/10, bodyX + (xrAL + eat/10) + ((focusPoint - bodyX)/10), bodyY - 100); /**/ // leg 1RO
        /**/                                                                                                                                                                  /**/
        /**/ line(bodyX + (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (yrBL + eat/10) + bodyH/10, bodyX + (xrBL + eat/10) + ((focusPoint - bodyX)/10), bodyY - 70);  /**/ // leg 2RO
        /**/                                                                                                                                                                  /**/
        /**/ line(bodyX + (xrBL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrBL - eat/10) + bodyH/10, bodyX + (xrBL + eat/10) + ((focusPoint - bodyX)/10) , bodyY + 70);/**/ // leg 3RO
        /**/                                                                                                                                                                  /**/
        /**/ line(bodyX + (xrAL + eat/10) + ((focusPoint - bodyX)/20), bodyY - (-yrAL - eat/10) + bodyH/10, bodyX + (xrAL + eat/10), bodyY + 100);                            /**/ // leg 4RO
        /**====================================================================================================================================================================**/


            // teeth **/
        strokeWeight(1);
        pushMatrix();
        translate(bodyX + ((focusPoint - bodyX)/18), bodyY - 60);
        rotate(0 + ((focusPoint - bodyX)/10));

        rotate(rotation);
        quad(-20, -10, -25, -25, -10, -40, -22, -24); // left

        rotate(-rotation*2);
        quad(20, -10, 25, -25, 10, -40, 22, -24);     // right
        popMatrix();

        // body **/
        ellipse(bodyX + ((focusPoint - bodyX)/30), bodyY - bodyH/10 + neck, bodyW, bodyH + 80);

        // head **/
        ellipse(bodyX + ((focusPoint - bodyX)/20), bodyY - 60 , bodyHW, (bodyH + 80)/2.2);

        // shadow **/
        noStroke();
        ellipseMode(CENTER);
        fill(79, 79, 79, 79);
        ellipse(bodyX  + ((focusPoint - bodyX)/30), bodyY + 85, width/5, height/20);
        stroke(0, 0, 0);

    };

    /** key calls **/
    keyPressed = function() {

        // bite (space bar) **/
        if (keyCode === 32) {
            biting = true;

            // body movement (left, right, up, down) **/
        } else if (keyCode === LEFT) {
            if (bodyX > 10) {
                bodyX -= 10;
            }
        } else if (keyCode === RIGHT) {
            if (bodyX < 390) {
                bodyX += 10;
            }
        } else if (keyCode === UP) {
            if (bodyY > 170) {
                bodyY -= 10;
            }
        } else if (keyCode === DOWN) {
            if (bodyY < 310) {
                bodyY += 10;
            }
        }

        // legs movement (automatic) **/
        if (keyCode === LEFT || keyCode === RIGHT || keyCode === UP || keyCode === DOWN) {
            xrAL = random(minXA, maxXA);
            xrBL = random(minXB, maxXB);
            yrAL = random(minYA, maxYA);
            yrBL = random(minYB, maxYB);
            xrAR = random(minXA, maxXA);
            xrBR = random(minXB, maxXB);
            yrAR = random(minYA, maxYA);
            yrBR = random(minYB, maxYB);

        }
    };

    /** biting **/
    if (biting === true) {
        if (rotation < biteMax) { // max
            rotation += biteSpd; // closing speed
        } else {
            biting = false;
        }
    } else {
        if (rotation > biteMin) { // min
            rotation -= biteSpd/3; // opening speed
        }
    }

    /** confirm if the position of the head and the object are close and eat **/
    if (xPos > bodyX - 25 + ((focusPoint - bodyX)/10) && xPos < bodyX + 25 + ((focusPoint - bodyX)/10)) {
        if (yPos > bodyY - 80 && yPos < bodyY - 60) {
            if (btn === true) {
                pass = true;
                biting = true;
                eat += 1;
                if (bodyW < 120) { // makes the spider grow fatter
                    bodyW += eat/20;
                } else {
                    bodyW = 120;
                }
                if (bodyH < 50) { // makes the spider grow bigger
                    bodyH += eat/20;
                } else {
                    bodyH = 50;
                }
                if (neck < 10) { // arranges the body according to the size
                    neck += eat/25;
                }
            }
        }
    }

    /** button position modifier **/
    var eatX;
    var eatY;

    if (eat === 0) { // start position
        eatX = 235;
        eatY = 147;
    } else {         // normal position
        eatX = 57;
        eatY = 370;
    }

    /** calls **/
    obj(btn);
    score();
    button(eatX, eatY);
    spider();
};
