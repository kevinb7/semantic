/*

make variables for things:
- colors that you want to re-use
- textSizes


similar calls such as text("STOP", btnXPos, btnYPos) and text("PAUSE", btnXPos, btnYPos)
are repetitive as well, factor our the thing that's different, the label... create a variable for it


do we have draw commands that immediately cover up existing draw commands?
see button.js


if there's a common command within both the "if" and "else" block can we pull
it out either before or after or is there an order dependency that needs to be
maintained, e.g. strokeWeight(1); affects drawing commands... if it appears before
all drawing commands in each block, pull it out before everything... if it appears
after all drawing commands in each block pull it out after everything

what is the canvas state?  if we call strokeWeight(1); and call it again right 
away without changing it to something else first then it's redundant


avoid generic names like "obj" or "think" or "stuff"


if there's a chain of if/else if/else statements check for overlapping conditions


with transforms... mismatched pushMatrix()/popMatrix()


look for function names inside other functions
- warn users
- user function names to form a list of keywords, e.g. 
var spider = function() {
    // draw functions 
}
check to see if spider is called inside the draw function
if it's in a look inside the draw function and the draw commands depend on a 
parameter from the loop (or one that's mutating in the loop) then we can infer 
that there's multiple spiders
... also, check if we're clearing the canvas at the start of the draw function

calling background(255) or rect(0,0,width,height) after other draw commands at
inside of the "draw" function is probably a mistake


Goals:
We're trying to do the following things with this type of analysis:
- determine what the program does
- find mistakes
- provide suggestions for simplifying the code

 */

import { traverse } from 'estraverse'
import esutils from 'esutils'


esutils.ast.isFunction = function(node) {
    return node.type === "FunctionExpression" || node.type === "FunctionDeclaration";
};


var getFunctionName = function(node, parent) {
    if (node.type === "FunctionExpression") {
        if (parent.type === "VariableDeclarator") {
            return parent.id.name;
        } else if (parent.type === "AssignmentExpression") {
            return parent.left.name;
        }
    }
    return null;
};


var specialFunctions = [
    "draw", 
    "mousePressed", "mouseReleased", "mouseMoved", "mouseDragged", "mouseClicked",
    "keyPressed", "keyReleased"
];

var findFunctionDefinitions = ast => {
    
    // TODO: handle anonymous functions
    var scopes = [];

    traverse(ast, {
        enter: (node, parent) => {
            if (esutils.ast.isFunction(node)) {
                scopes.push(getFunctionName(node, parent));
            }
        },
        leave: (node, parent) => {

            if (esutils.ast.isFunction(node)) {
                scopes.pop();
            }
            
            if (node.type === "FunctionExpression") {
                var name = getFunctionName(node, parent);
                var scopeName = scopes[scopes.length - 1];
                var smell = !!scopeName ? " - smell" : "";
                console.log(`function, name = ${name} (${scopeName})${smell}`);
            }
        }
    });
};

export { findFunctionDefinitions }
