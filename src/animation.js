// Animation is the act of automatically updating the position of where 
// something is drawn.  This means identifying:
// - variables whose values are changing
// - 2D primitives that rely on those values

import { traverse } from 'estraverse'


// there's an additional distinction that we can make which is that
// some variables might be mutated automatically, e.g. inside "draw" (or
// something that "draw" calls) vs. as a result of user interaction...
// also user interaction can occur in a couple of ways:
// - active: a user must continue to hold a button or perform an action for a
//   a value to update
// - passive: a user takes a discrete action, e.g. click, and then another
//   value will continue to update until the user takes another action
// KISS: worry about active vs. passive until later

var findMutatedVariables = function(ast, variables) {
    var scopes = [];
    var mutatedVariables = new Set();
    
    traverse(ast, {
        enter(node, parent) {
            if (/Function/.test(node.type)) {
                scopes.push(node);
            }
        },
        leave(node, parent) {
            if (/Function/.test(node.type)) {
                scopes.pop();
            }

            // TODO: handle variable hiding
            // TODO: identify variable hiding and notify the user
            // TODO: handle objects
            
            // global scope is run only once so we don't care about assignments 
            // that happend in that scope, in fact those are probably just setting
            // the initial values
            if (scopes.length > 0 && node.type === "AssignmentExpression") {
                var left = node.left;
                if (left.type === "Identifier" && variables.includes(left.name)) {
                    mutatedVariables.add(left.name);
                }
            }
        }
    });
    
    return Array.from(mutatedVariables);
};

var findConstantVariables = function(ast, variables) {
    
};

// there might also be some variables where it's hard to say conclusively
// one way or the other

// if the user is using constructs like obj[name] += 10; and name is being
// mutated, it make things very difficult

// we should be able to do some stuff with loops, but we need to be able
// to identify which values a for loop (or nested for loops) will iterate through


// TODO: determine if an animation is conditional or unconditional

var drawingFunctions = {
    rect: { params: [ "x", "y", "width", "height" ] },
    ellipse: { params: [ "x", "y", "width", "height" ] }
};

var drawingFunctionNames = Object.keys(drawingFunctions);

var findUsesOfVariable = function(ast, variable) {
    // start simple, look at all drawing functions and see it the variable is
    // used as a parameter in any of them
    
    traverse(ast, {
        enter(node, parent) {
            
        },
        leave(node, parent) {
            if (node.type === "CallExpression") {
                if (node.callee.type === "Identifier" && drawingFunctionNames.includes(node.callee.name)) {
                    // TODO: verify that these calls are happening inside "draw"
                    node.arguments.forEach((arg, index) => {
                        if (arg.type === "Identifier" && arg.name === variable) {
                            var funcName = node.callee.name;
                            var func = drawingFunctions[funcName];
                            var param = func.params[index];
                            console.log(`${variable} is animating the ${param} parameter of ${funcName}`);
                        }
                        // TODO: determine what type of animation
                        // - linear (increase/decreasing)
                        // - periodic (sinusoid or otherwise)
                    });
                }
            }
        }
    });
};

// In order to determine if any of the calls to user defined functions from "draw"
// contain "draw" functions that use a particular variable or modify that particular
// variable we need a dictionary of custom functions that are defined within that
// particular scope... then we need to iterate through the functions that are actually
// called and look at all of the user defined functions they call that are within
// their scopes


export {
    findMutatedVariables,
    findConstantVariables,
    findUsesOfVariable
}
