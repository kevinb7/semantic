import fs from 'fs';

import esprima from 'esprima';
import { findGlobals } from './variables';
import { informalObjects } from './informal'

var filename = 'bug_game.js';
var code = fs.readFileSync('corpus/' + filename);
var ast = esprima.parse(code);

var globals = findGlobals(ast);
var objects = informalObjects(globals);

console.log(objects);
