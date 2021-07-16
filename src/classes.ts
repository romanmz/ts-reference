

// PARAMETER PROPERTIES
type HasNameAndEmail = {
    name: string;
    email: string;
}
// not using parameter props:
class Contact1 implements HasNameAndEmail {
    email: string;
    name: string;
    constructor(name: string, email: string) {
        this.email = email;
        this.name = name;
    }
}
// using parameter props:
// (valid keywords are: public, protected and private)
class Contact2 implements HasNameAndEmail {
    // private fax: number;     // 🚨 ERROR! Only in strict mode
    constructor(public name: string, public email: string) { }
}


// ABSTRACT CLASSES
abstract class AbstractContact implements HasEmail, HasPhoneNumber {
    constructor(public name: string, public email: string) { }
    // must be implemented by non-abstract subclasses:
    public abstract phone: number;
    abstract sendEmail(): void;
}
class ConcreteContact extends AbstractContact {
    constructor(
        public phone: number, // property-parameters must go first
        name: string,
        email: string
    ) {
        super(name, email);
    }
    sendEmail() {
        console.log("sending an email");
    }
}
