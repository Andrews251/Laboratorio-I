import assert from 'assert'

class ErroreVeicolo extends Error {}

class Veicolo {
    #modello
    #targa

    constructor(modello, targa) {
        this.#modello = modello;
        this.#targa = targa;
    }

    get modello() {
        return this.#modello
    }

    get targa() {
        return this.#targa;
    }

    toString() {
        return `${this.modello}, ${this.targa}`;
    }

    controllaVeicolo() {}
}

class Automobile extends Veicolo {
    #numero_massimo_passeggeri

    constructor(modello, targa, numero_massimo_passeggeri) {
        super(modello, targa);
        this.#numero_massimo_passeggeri = numero_massimo_passeggeri;
    }

    get numero_massimo_passeggeri() {
        return this.#numero_massimo_passeggeri
    }

    toString() {
        return super.toString().concat(`${this.numero_massimo_passeggeri}`)
    }

    controllaVeicolo() {
        if (this.targa.length !== 7)
            throw new ErroreVeicolo()
    }
}

class Motociclo extends Veicolo {
    #cilindrata

    constructor(modello, targa, cilindrata) {
        super(modello, targa);
        this.#cilindrata = cilindrata;
    }

    get cilindrata() {
        return this.#cilindrata
    }

    toString() {
        return super.toString().concat(`${this.cilindrata}`);
    }

    controllaVeicolo() {
        if (this.targa.length !== 4)
            throw new ErroreVeicolo()
    }
}

class Ciclomotore extends Motociclo {
    constructor(modello, targa, cilindrata) {
        super(modello, targa, cilindrata);
    }

    toString() {
        return super.toString()
    }

    controllaVeicolo() {
        super.controllaVeicol();
        if (this.cilindrata > 125)
            throw new ErroreVeicolo()
    }
}

function controllaVeicoli(veicoli) {
    try {
        for (let i of veicoli) {
            i.controllaVeicolo();
        }
    } catch (e) {
        return false;
    }
    return true;
}
/*
let tir = new Veicolo("mercedes", "0000000");
let ferrari = new Automobile("ferrari", "0000000", 2);
let ducati = new Motociclo("ducati", "0000", 250);
let lambo = new Automobile("lamborghini", "0000000", 2);
let ciao = new Ciclomotore("ciao", "0000", 50);

let v0 = [tir, ferrari, ducati, lambo, ciao];
assert.equal(controllaVeicoli(v0), true);
*/

class InvalidMoney extends Error{}
class ExcessiveMoney extends Error {}
class InsufficientMoney extends Error {}

class ContoBancario{
    #saldo
    #massimale
    constructor(saldoIniziale,massimale){
        this.#saldo = saldoIniziale;
        this.#massimale = massimale;
        if(saldoIniziale < 0)
            throw new InvalidMoney()
        if(massimale < 0)
            throw new InvalidMoney()
    }
    get saldo(){
        return this.#saldo;
    }
    get massimale(){
        return this.#massimale;
    }
    deposito(valore){
        if(valore < 0)
            throw new InvalidMoney()
        if(valore > this.massimale)
            throw new ExcessiveMoney()
        this.#saldo = this.saldo + valore
        return this.#saldo
    }
    prelievo(valore){
        if(valore < 0)
            throw new InvalidMoney()
        if(valore > this.saldo)
            throw new InsufficientMoney()
        this.#saldo = this.saldo - valore
        return this.#saldo
    }
}

function applica(conto,depositi,prelievi){
    //sfrutto un oggetto di test, in modo tale che se le operazioni restituisero errore/false, non ho necesssità di modificare il conto
    let test = new ContoBancario(conto.saldo,conto.massimale)
    try{
        for(let i = 0; i < depositi.length; i++){
            if(depositi[i] < 0 || prelievi[i] < 0)
                throw new InvalidMoney()
            test.deposito(depositi[i])
            test.prelievo(prelievi[i])
        }
    }catch(e){

        if(e instanceof InvalidMoney){
            throw e
        }else
            return false
    }
    for(let i = 0; i < depositi.length; i++){ //se arrivo qui posso modificare il mio conto
        conto.deposito(depositi[i])
        conto.prelievo(prelievi[i])
    }
    return true
}
var conto = new ContoBancario(5, 10)
assert.equal(applica(conto, [3, 1], [6, 4]), false)
var conto2 = new ContoBancario(5, 10)
assert.equal(applica(conto, [2, 2], [2, 2]), true)

