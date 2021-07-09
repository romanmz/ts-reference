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


// NULLABLE TYPES / strictNullChecks
// --------------------------------------------------

// by default, typescript allows you to use 'null' and 'undefined' interchangeably:
let nullValue: null = null;
// nullValue = undefined;              // 🚨 ERROR (in strict mode only)

// also, any other types can be 'nullable', so you can unset them even if the type
// definition explicitly says it must conform to a non-null or undefined type:
let strictString: string = "hello";
// strictString = null;                // 🚨 ERROR (in strict mode only)
// strictString = undefined;           // 🚨 ERROR (in strict mode only)

// however since in JS null and undefined serve different purposes, it is best
// practice to enable 'strictNullChecks' (or 'strict') mode in the config file to
// require you to be explicit about what variables can be null or undefined
let strictNullableString: string | null = "hello";
strictNullableString = null;
// strictNullableString = undefined;   // 🚨 ERROR (in strict mode only)

let strictNullableString2: string | null | undefined = "hello";
strictNullableString2 = null;
strictNullableString2 = undefined;


// ASSIGNABILITY
// --------------------------------------------------
/*
There is a top-down hierarchy of types where variables of a higher level type can
be assigned a value from a lower level type, but the opposite is not possible.

Example:
- any
- string
- "a", "b", "c"…
- never
*/

// : any; accepts any type
let anyValue: any;
anyValue = "hello";
anyValue = 100;
anyValue = true;
anyValue = null;
anyValue = undefined;

// : string; accepts any string, no other types
let anyString: string;
anyString = "foo";
anyString = "bar";
// anyString = 100;                 // 🚨 ERROR!

// : "hello"; accepts ONLY strings that match exactly the text "hello"
let literalString: "hello";
literalString = "hello";
// literalString = "world";         // 🚨 ERROR!

// literal types can help you define limited sets of valid values
let limitedSetOfStrings: "foo" | "bar" | "baz";
limitedSetOfStrings = "foo";
limitedSetOfStrings = "bar";
limitedSetOfStrings = "baz";
// limitedSetOfStrings = "hello";   // 🚨 ERROR!

// : never; doesn't match anything at all
let neverValue: never;
// neverValue = "foo";              // 🚨 ERROR!
// neverValue = 10;                 // 🚨 ERROR!
// neverValue = undefined;          // 🚨 ERROR!


// TYPE NARROWING
// --------------------------------------------------
// Given a union type where you need to execute different code depending on the
// actual type of the current value, you can simply add regular js type checks, and
// Typescript is smart enough to "narrow" down the used types

function getUnionType(): string | number | boolean {
    return 1;
}
let unionTypes = getUnionType();
if (typeof unionTypes === 'string') {
    unionTypes; // type is : string;
} else if (typeof unionTypes === 'number') {
    unionTypes; // type is : number;
} else if (typeof unionTypes === 'boolean') {
    unionTypes; // type is : boolean;
} else {
    unionTypes; // type is : never;
}


// ARRAYS AND TUPLES
// --------------------------------------------------
// To define an array type, define first the type for the internal items, and simply
// add brackets at the end, the array can have any number of elements, and the
// elements can be of any of the specified types regardless of their order
const arrayOfNumbers: number[] = [1, 2, 3];
const arrayOfNumbersOrStrings: (number | string)[] = [10, '10'];

// If you want to strictly define a limited amount of allowed items in an array, as
// well as the exact type for each of the elements, use the tuple syntax instead:
let tupleOf2Items: [string, number] = ['home', 4490001122];
// tupleOf2Items = ['home', 4490001122, 10];   // 🚨 ERROR! no more than 2 items are allowed
// tupleOf2Items = ['home', '4490001122'];     // 🚨 ERROR! 2nd item is not of the correct type

// ⚠️ WARNING: it's not possible for Typescript to prevent you from modifying the
// structure of a tuple by using array methods, so be aware of that:
tupleOf2Items.push(100);                        // no error but will break your tuple!
