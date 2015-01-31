/*

The aim of this module is transform JavaScript into a canonical form which
can be used to compare pieces of code against each other.

These are all equivalent:
  vx = -vx;
  vx = -1 * vx;
  vx *= -1;

Here's a more complicated example:
if (mouseX >= btnMinX && mouseX <= btnMaxX) {
    if (mouseY >= btnMinY && mouseY <= btnMaxY) {
        ...
    }
}

is equivalent to:
if ((mouseX >= btnMinX && mouseX <= btnMaxX) && 
    (mouseY >= btnMinY && mouseY <= btnMaxY)) {
    ...
}

as is:
if (mouseX >= btnMinX && mouseX <= btnMaxX && mouseY >= btnMinY && mouseY <= btnMaxY) {
    ...
}

 */