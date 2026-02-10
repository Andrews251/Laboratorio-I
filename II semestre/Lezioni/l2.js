//Esempio di PROTOTIPO

function Persona1(nome, anni){
    this.name = nome
    this.age = anni
}

Persona1.prototype.age = function(){this.age++}


class Persona{
    constructor(nome, eta){
        this.nome = nome
        this.eta = eta
    }

    compleanno(){
        this.eta++
    }
}

var pippo = new Persona("Pippo", 35)