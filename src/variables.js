var estraverse = require('estraverse');

var last = Symbol("last");
Object.defineProperty(Array.prototype, last, {
    get() {
        return this[this.length - 1];
    }
});


var findGlobals = function(ast) {
    var globals = [];
    var scopes = [];
    
    estraverse.traverse(ast, {
        enter: (node, parent) => {
            if (node.type.indexOf("Function") === 0) {
                scopes.push(node);
            }
        },
        leave: (node, parent) => {
            var scope = scopes[last];
            
            if (!scope) {
                if (node.type === "VariableDeclarator") {
                    globals.push(node.id.name);
                }
            }
            
            if (node === scope) {
                scopes.pop();
            }
        }
    });
    
    return globals;
};

export { findGlobals }
