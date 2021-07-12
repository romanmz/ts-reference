type HasEmail = {
    name: string,
    email: string,
}
type HasPhoneNumber = {
    name: string,
    phone: number,
}


// FUNCTIONS
// --------------------------------------------------
// function arguments and return values can also have type annotations
function sendEmail(to: HasEmail): { recipient: string, body: string } {
    return {
        recipient: `${to.name} <${to.email}>`,
        body: "You're pre-qualified for a loan!",
    };
}
const sendTextMessage = (
    to: HasPhoneNumber
): { recipient: string; body: string } => {
    return {
        recipient: `${to.name} <${to.phone}>`,
        body: "You're pre-qualified for a loan!"
    };
};

// you can also use the arrow syntax
// rest params can also have an array-like type annotation
// return types can often be inferred
const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0);

// SIGNATURES

// you can define multiple signatures for a single function,
// as long as the implementation complies with all of them
type ContactMethod = 'email' | 'phone';
function makeContact(method: "email", ...data: string[]): string;
function makeContact(method: "phone", ...data: number[]): number;
function makeContact(method: ContactMethod, ...data: (string | number)[]) {
    if (method === 'email') {
        return (data as string[]).join(', ');
    } else {
        return sum(...(data as number[]));
    }
}

// 'this' and BIND, APPLY, CALL

// for functions where you need type annotation for the 'this' variable, add it as
// if it were the first argument of the function, and typescript will take care of
// validating the calls to 'bind', 'call' and 'apply' (only in strict mode)
interface Animal {
    name: string;
    speak(): void;
}
class Dog implements Animal {
    constructor(public name: string) { }
    speak() {
        console.log(`${this.name} barks!`);
    }
}
class Human implements Animal {
    constructor(public name: string) { }
    speak() {
        console.log(`${this.name} says hi!`);
    }
}
function maybeSpeak(this: Animal, probability: number) {
    if (Math.random() * 100 <= probability) {
        this.speak();
    } else {
        console.log('~silence~');
    }
}
const ruffus = new Dog('Ruffus');
const raphael = new Human('Raphael');

// maybeSpeak(100);                 // 🚨 ERROR!
const ruffusSpeaks = maybeSpeak.bind(ruffus);
const ruffusSpeaks50 = maybeSpeak.bind(ruffus, 50);
// ruffusSpeaks();                  // 🚨 ERROR! only in strict mode
ruffusSpeaks(50);
ruffusSpeaks50();
// maybeSpeak.call(raphael);        // 🚨 ERROR! only in strict mode
maybeSpeak.call(raphael, 50);
// maybeSpeak.apply(raphael, 50);   // 🚨 ERROR! only in strict mode
maybeSpeak.apply(raphael, [50]);
