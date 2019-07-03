import Lexer from "./lexer";
import Cthulhu from "./plugins/cthulhu";
import Random from "./random";

const input = process.argv[2];
let lexer = new Lexer(input);
let coc = Cthulhu;
let random = new Random();

const tokens = lexer.lex();

console.log(tokens);
console.log(coc.roll(random, input, tokens));
