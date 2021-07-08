/*

Typescript is a superset of Javascript, so you can include .ts modules into JS and
vice versa. It establishes a "contract" between the members in your code to enforce
strict type checking and improve the safety and reliability of your code.

(optional) Installing typescript globally
$ npm i -g typescript

Two commands become available:
$ tsc           // convert .ts files into .js
$ tsserver      // ???

1. Initializing a typescript project
$ npm init [-y]
$ npm i --save-dev typescript

2. Create a config file with standard defaults:
$ tsc --init
- Reference: https://www.typescriptlang.org/tsconfig

3. Running typescript
Local version:
- Include a command including "tsc" in the "scripts" property in package.json, e.g:
- package.json "scripts": { "dev": "tsc", "watch": "tsc --watch" }
$ npm run dev
$ npm run watch

Global version:
- Just use 'tsc' directly:
$ tsc

*/


// IMPLICIT AND EXPLICIT TYPES
// --------------------------------------------------

// IMPLICIT TYPES
let implicitAny;                        // any
let implicitString = "hello";           // string
let implicitNumber = 10;                // number

// For constants, the inferred "type" is the literal value that is assigned
const implicitLiteralString = "world"; // "world"
const implicitLiteralNumber = 20;      // 20

// EXPLICIT TYPES
let explicitAny: any;
let explicitString: string = "hello";
let explicitNumber: number = 10;
// it's technically possible to define variables with a literal type,
// but semantically it's better to use constants
let explicitLiteralStringVar: "world" = "world";
let explicitLiteralNumberVar: 20 = 20;
// and for constants it's redundant to use the explicit syntax, it's ok to rely on
// implicit types
const explicitLiteralStringConst: "world" = "world";
const explicitLiteralNumberConst: 20 = 20;

*/

console.log('trololo 456!');