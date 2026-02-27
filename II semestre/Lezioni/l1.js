//PROPRIETA' THIS

let pippo = {eta: 20}

pippo.compleanno = function(){this.eta++} //metodo con side effects (cambia il campo eta)
pippo.compleanno()
//console.log(pippo)

//ESEMPIO DI COSTRUTTORE

function persona(n,e) {
    return {
        nome: n,
        eta: e,
        compleanno(){
            this.eta++
        }
    }
}
var a = [1,2,3]
//le funzioni costruttore hanno tipicamente nomi maiuscoli
function Persona_obj(nome, eta){
    questo = {}
    questo.nome = nome
    questo.eta = eta
    return questo
}

let gianni = Persona_obj("gianni", 35)

//funzionano allo stesso modo ma chiaramente la seconda versione è migliore e utilizza il metodo this

function Persona(nome, eta){
    //this = {}
    this.nome = nome
    this.eta = eta
    this.compleanno = ()=>{
        this.eta++
    }
    //come se avessi return this
}

andrea = new Persona("andrea", 24)
//Ogni oggetto ha un prototipo (esso stesso un oggetto), il prototipo può avere prototipi
