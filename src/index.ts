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


// ARRAYS, TUPLES and DICTIONARIES
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

// To define the structure of a dictionary, use square brackets to define the type
// of keys (only strings and numbers, and can't be mixed) and the type of values
const dictOfNumbers: { [key: string]: number } = {
    one: 1,
    two: 2,
    // three: '3',      // 🚨 ERROR!
}
const dictOfNumbersReverse: { [key: number]: string } = {
    1: 'one',
    2: 'two',
    // 3: 3,            // 🚨 ERROR!
}


// TYPE ALIASES AND INTERFACES
// --------------------------------------------------

// CREATING TYPE ALIASES
// types can alias any other type, including arrays and tuples
type ScalarType = number;
type ArrayType = string[];
type TupleType = [string, number];
type ObjectType = {};
// interfaces can do the same by using an empty definition, but it only works on
// object or function-like types, it's semantically not the same and it looks ugly
// anyway so just use the 'type' keyword.
interface ObjectInterface extends ObjectType { }

// CREATING UNION TYPES
type NumberOrString = number | string;
// interfaces can't do this!

// DEFINING OBJECT OR CLASS STRUCTURES
type ShapeType = {
    name: string;
    size: number;
    optional?: string;
    draw(size: number): string;
}
interface ShapeInterface {
    name: string;
    size: number;
    optional?: string;
    draw(size: number): string;
}
// objects:
const shapeObj: ShapeType = {
    name: 'foo',
    size: 10,
    draw(size) {
        return `drawn shape at ${size}px!`;
    },
};
// classes:
class ShapeClass implements ShapeInterface {
    name = "hi";
    size = 20;
    draw(size) {
        return `class drawn shape at ${size}px!`;
    }
}

// DEFINING FUNCTION SIGNATURES
type FunctionType1 = (x: number, y: number) => number;
type FunctionType2 = {
    (x: number, y: number): number;
    // you could include more definitions but only one will be used
}
interface FunctionInterface {
    (x: number, y: number): number;
}
const func1: FunctionType1 = (x, y) => {
    return x + y;
}
const func2: FunctionType2 = func1;
const func3: FunctionInterface = func2;

// by default, typescript doesn't do a strict check between a function type and its
// actual implementation, this may cause uncaught errors, like when we use an
// implementation that expects a strict type to conform to a more flexible type that
// could accidentally send the incorrect type, e.g: the following function is
// accepted by default, but rejected only if strictFunctionTypes is set to 'true'
// const flexParamsToStrictParams: (x: number | string, y: number) => number = func1;   // 🚨 ERROR! only in strict mode

// doing the opposite is always ok, since the final function will always send a more
// restrictive variable type that the more flexible implementation should be able to
// handle
function anotherFunc(x: number | string, y: number) {
    if (typeof x === 'number') return x + y;
    return y;
}
const strictParamsToFlexParams: FunctionType1 = anotherFunc;

// DEFINING CONSTRUCTOR SIGNATURES
// ⚠️ NOTE: this is NOT for defining the signature of the constructor method of a
// class, instead this is to define variables or function arguments that need to
// receive the name of a class that already conforms to that construct signature
type ConstructorType1 = new (name: string) => ShapeType;
type ConstructorType2 = {
    new(name: string): ShapeType;
}
interface ConstructorInterface {
    new(name: string): ShapeType;
}
class ClassWithConstructor implements ShapeType {
    name = "hi";
    size = 10;
    draw() {
        return "~draw~";
    }
    constructor(name: string) {
        this.name = name;
        return this;
    }
}
const classWithConstructor: ConstructorType1 = ClassWithConstructor;
const instanceWithConstructor = new classWithConstructor("hexagon");

// CREATING INTERSECTION TYPES / INTERFACE EXTENSIONS
type IntersectingType1 = {
    color: string;
}
type IntersectingType2 = {
    id: number;
}
type IntersectingType = IntersectingType1 & IntersectingType2;
interface IntersectingInterface extends IntersectingType1, IntersectingType2 { }
// both properties will be required in both cases
// extra properties not included in the types will cause errors
const objTest: IntersectingType = {
    color: 'red',
    id: 20,
}
const objType2: IntersectingInterface = {
    color: 'blue',
    id: 30,
}
