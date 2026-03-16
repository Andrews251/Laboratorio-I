//12-03-2026 Laboratorio I - Corso B

function somma (a:number, b:number):number{
    return a + b;
}

class Greeter{
    greeting: string
    constructor(message:string) {
        this.greeting = message;
    }
    greet():string{
        return "Hello, " + this.greeting;
    }
}

 let greet:Greeter = new Greeter("world")

//tipi tupla

let x: [string,number] = [3,"tre"]

console.log(x)

//tipo enum

enum Color{
    Red,
    Green,
    Blue,
}

let c: Color = Color.Green;

enum Colori{
    Red = "Rosso", //in realtà le chiavi possono avere qualsiasi tipo di valore
    Green = "Verde",
    Blue = "Blu",
}

//esiste anche il tipo speciale any
let myVar: any = 123

//tipo unknown
let boh: unknown

//tipo void, utile se la mia funzione non deve restituire nulla

//tipi unione

let prezzo: string | number

//posso anche definire i miei tipi
type Price = string | number
let prezzo2: Price

let x = 3
//  let x: number