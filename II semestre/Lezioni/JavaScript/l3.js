//prototype vale solo per le funzioni
//__proto__ lo hanno tutti gli oggetti
function Persona_1(nome, eta){
    //this = {}
    this.nome = nome
    this.eta = eta
    this.compleanno = ()=>{
        this.eta++
    }
    //come se avessi return this
}

class Persona{
    constructor(nome,eta){
        this.nome = nome
        this.eta = eta
    }
    compleanno(){
        this.eta++
    }
}

class Studente extends Persona{
    compleanno(){
        return super.compleanno() + " auguri"
    }

}

var ciccio = new Persona("ciccio", 23)

ciccio.compleanno()

//console.log(ciccio.eta)


class Queue{
    #array = []
    put(x){
        //si fa col set
        this.#array[this.#array.length] = x
    }
    get(){
        let x = this.#array[0]
        this.#array = this.#array.slice(1)
        return x
    }
    size(){
        return this.#array.length
    }
    empty(){
        return this.size() === 0
    }
    toString(){

    }
}

function arrayDiff(a, b) {
    let res = []
    for(let i of a){
        if(!(b.includes(i)))
            res.push(i)
    }
    a = [...res]
    return a
}

let a = [1,2]
let b = [1]

//console.log(arrayDiffSimple(a, b))

function arrayDiffSimple(a, b) {
    return a.filter(x => !(b.includes(x))) //non modifica in-place
}

function highAndLow(numbers) {
    let a = numbers.split(" ")
    for(let i of a){
        parseInt(i,10)
    }
    let min = +Infinity
    let max = -Infinity
    for(let i of a){
        min = Math.min(min, i)
        max = Math.max(max, i)
    }

    return `${max} ${min}`
}

function highAndLowEfficient(numbers) {
    numbers = numbers.split(" ")
    return `${Math.max(...numbers)} ${Math.min(...numbers)}`
}

//console.log(highAndLow("1 2 3 4 5"))
//console.log(highAndLowEfficient("8 3 -5 42 -1 0 0 -9 4 7 4 -4"))


function friend(friends){
    return friends.filter(x => x.length === 4)
}

let input = ["Ryan", "Kieran", "Jason", "Yous"]

//console.log(friend(input))

function spinWords(string){
    string = string.split(" ")
    for(let i in string){
        if(string[i].length >= 5){
            string[i] = string[i].split("").reverse().join("")
        }
    }
    return string.join(" ")
}

console.log(spinWords("Hey fellow warriors"))