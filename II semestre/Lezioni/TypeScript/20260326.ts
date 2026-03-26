//generics
//utilizzando any stiamo perdendo informazione

function identity<T>(arg:T):T{//versione della funzione generica
    //console.log(arr.length), questo da errore perché non tutti i tipi hanno la proprietà length
    return arg;
}

let output1 = identity("string") //type argument inference
let output2 = identity<string>("number") //i due output sono equivalenti

let myIdentity: <U>(arg:U) => U = identity;

interface GenericIdentityFn{
    <T>(arg:T): T;
}

interface GenericIdentityFn2<T>{//in questo modo la rendiamo visibile ai membri dell'interfaccia
    (arg:T): T;
}

//Esempio su nodi di liste
interface Node {//interfaccia specifica con numeri
    value: number
    next: Node | null
    prev: Node | null
}

interface Nodo <T>{//interfaccia generica
    value: T
    next: Nodo<T> | null
    prev: Nodo<T> | null
}

//anche le classi possono essere generiche

class GenericValue<T>{
    value: T
    constructor(value: T) {
        this.value = value;
    }
    equals(y: T): boolean{
        return this.value === y;
    }
}

class Pair<T, U>{//gli identificatori T e U possono essere dello stesso tipo
    p: [T, U]
    constructor(first: T, second: U) {
        this.p = [first, second]
    }
    get first(): T{
        return this.p[0];
    }
    get second(): U{
        return this.p[1];
    }
}

//DIFFERENZE TRA INTERFACCE E CLASSI:
//Interfacce implementano solo la forma dei dati ma non la logica
//I costruttori e metodi delle classi vengono transpilati

//le classi possono implementare più interfacce

interface Lengthwise{
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg:T):T{//versione con constraints
    console.log(arg.length)
    return arg;
}

//TS introduce public, protected, private

class Greeter{
    private a: number = 0
    public greet(){
        console.log("Hello, " + this.getName())
    }
    protected getName(){ //protected è visibile sia a classi che sottoclassi
        return "hi"
    }
}

