var suffix = Symbol("suffix");
String.prototype[suffix] = function(start) {
    if (start < 0) {
        start = this.length + start;
    }
    return this.substring(start); 
};

var prefix = Symbol("prefix");
String.prototype[prefix] = function(end) {
    if (end < 0) {
        end = this.length + end;
    }
    return this.substring(0, end);
};


var suffixGroups = [
    [ "X", "Y" ],       // position
    [ "W", "H" ],       // size
    [ "Min", "Max" ]    // range
];

var prefixGroups = [
    [ "min", "max" ]    // range
];


var assert = console.assert;

var findCommonPrefix = (strs, suffixes) => {
    assert(strs.length === suffixes.length);
    
    // KISS start with pairs
    if (strs[0].endsWith(suffixes[0]) && strs[1].endsWith(suffixes[1])) {
        let prefixes = [0, 1].map(i => strs[i][prefix](-suffixes[i].length));
        if (prefixes[0] === prefixes[1]) {
            return prefixes[0];
        }
    } else if (strs[0].endsWith(suffixes[1]) && strs[1].endsWith(suffixes[0])) {
        let prefixes = [0, 1].map(i => strs[i][prefix](-suffixes[1 - i].length));
        if (prefixes[0] === prefixes[1]) {
            return prefixes[0];
        }
    } else {
        return null;
    }
};


var findCommonSuffix = (strs, prefixes) => {
    assert(strs.length === prefixes.length);

    // KISS start with pairs
    if (strs[0].startsWith(prefixes[0]) && strs[1].startsWith(prefixes[1])) {
        let suffixes = [0, 1].map(i => strs[i][suffix](prefixes[i].length));
        if (suffixes[0] === suffixes[1]) {
            return suffixes[0];
        }
    } else if (strs[0].startsWith(prefixes[1]) && strs[1].startsWith(prefixes[0])) {
        let suffixes = [0, 1].map(i => strs[i][suffix](prefixes[1 - i].length));
        if (suffixes[0] === suffixes[1]) {
            return suffixes[0];
        }
    } else {
        return null;
    }
};


var informalObjects = function(variables) {
    var prefixSet = new Set();
    var suffixSet = new Set();

    for (var i = 0; i < variables.length; i++) {
        for (var j = i + 1; j < variables.length; j++) {
            var first = variables[i];
            var second = variables[j];

            for (let s of suffixGroups) {
                var p = findCommonPrefix([first, second], s);
                if (p) {
                    prefixSet.add(p);
                }
            }

            for (let p of prefixGroups) {
                var s = findCommonSuffix([first, second], p);
                if (s) {
                    suffixSet.add(s);
                }
            }
        }
    }
    
    var prefixMap = {};
    for (let p of prefixSet) {
        let props = [];
        for (let name of variables) {
            if (name.startsWith(p)) {
                props.push(name);
            }
        }
        prefixMap[p] = props;
    }
    
    var suffixMap = {};
    for (let s of suffixSet) {
        let props = [];
        for (let name of variables) {
            if (name.endsWith(s)) {
                props.push(name);
            }
        }
        suffixMap[s] = props;
    }
    
    return {
        prefixDict: prefixMap,
        suffixDict: suffixMap
    };
};

export { informalObjects }
