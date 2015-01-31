import estraverse from 'estraverse'
import { generate } from 'escodegen'
import esutils from 'esutils'
import _ from 'lodash'


var cartesianIterable = function(array1, array2) {
    return {
        [Symbol.iterator]: function* () {
            if (array1 === array2) {
                for (let i = 0; i < array1.length; i++) {
                    for (let j = i + 1; j < array2.length; j++) {
                        yield [array1[i], array2[j]];
                    }
                }
            } else {
                for (let i = 0; i < array1.length; i++) {
                    for (let j = 0; j < array2.length; j++) {
                        yield [array1[i], array2[j]];
                    }
                }
            }
        }
    };
};


var findClones = ast => {
    var clones = [];    // each clone is an array of 2 or more nodes
    
    var ifNodes = [];
    var paramExprs = [];
    
    estraverse.traverse(ast, {
        enter: (node, parent) => {
            
        },
        leave: (node, parent) => {
            if (node.type === "IfStatement") {
                ifNodes.push(node);
            } else if (esutils.ast.isExpression(node) && parent.type === "CallExpression") {
                // TODO: create a function to measure the size of the expression
                if (node.type === "BinaryExpression") {
                    paramExprs.push(node);
                }
            }
        }
    });

    console.log("");

    console.log("redundant if statements");
    for (let [first, second] of cartesianIterable(ifNodes, ifNodes)) {
        // TODO replace _.isEqual with a custom compare function which ignores location data
        if (_.isEqual(first.test, second.test)) {
            console.log(`"${generate(first.test)}" = "${generate(second.test)}"`);
        }
    }

    // TODO: provide options to the comparison function that allow for close matches
    // e.g. mouseY >= btnMinY && mouseY <= btnMaxY ... is similar to
    //      mouseY > btnMinY && mouseY < btnMaxY


    console.log("");

    // TODO: count how many times they're repeated
    var count = 0;
    console.log("redundant binary expressions (used as arguments)");
    for (let [first, second] of cartesianIterable(paramExprs, paramExprs)) {
        if (_.isEqual(first, second)) {
            console.log(`"${generate(first)}" = "${generate(second)}"`);
            if (count++ > 5) {
                break;
            }
        }
    }
    
    // TODO: repeated calls to the same method with the same paramters
    // TODO: making the same call inside the "if" and "else" blocks -> pull it outside
    
    return clones;
};

export { findClones };
