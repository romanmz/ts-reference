// Generics allow us to "parameterize" types


// BASICS
interface WrappedValue<T> {
    value: T;
}
const wrappedArray: WrappedValue<string[]> = {
    value: ['foo', 'bar'],
}
const wrappedBool: WrappedValue<boolean> = {
    value: true,
}

// DEFAULT TYPES
interface WrappedValueDefault<T = any> {
    value1: T;
    value2: T;
}
const wrappedDefaultArray: WrappedValueDefault<string[]> = {
    // both MUST be string arrays
    value1: ['foo', 'bar'],
    value2: ['lorem', 'ipsum'],
}
const wrappedDefaultAny: WrappedValueDefault = {
    // can be anything since they'll always match the default 'any' type
    value1: ['foo', 'bar'],
    value2: 100,
}

// IN FUNCTIONS
interface FilterFunction<T = any> {
    (val: T): boolean;
}
const stringFilter: FilterFunction<string> = val => val !== "";
// stringFilter(0);     // 🚨 ERROR!
stringFilter("abc");    // ✅ OK!

// can be used with any value
const truthyFilter: FilterFunction = val => val;
truthyFilter(0);        // false
truthyFilter(1);        // true
truthyFilter("");       // false
truthyFilter(["abc"]);  // true

// TYPE CONSTRAINTS
type HasId = {
    id: string;
}
function arrayToDict<T extends HasId>(array: T[]): { [k: string]: T } {
    // we could explicitly type it with the expected return signature,
    // but in this case it can be inferred
    const out = {};
    array.forEach(val => {
        out[val.id] = val;
    });
    return out;
}
const myDict = arrayToDict([
    { id: "a", value: "first", lisa: "Huang", lol: 'hi' },
    { id: "b", value: "second" },
]);
