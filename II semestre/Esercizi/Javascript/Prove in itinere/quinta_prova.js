import assert from 'assert'

class Elemento{
    #val
    #next
    constructor(val){
        this.#val = val
        this.#next = null
    }
    get val(){return this.#val}
    get next(){return this.#next}
    set next(nodo){
        this.#next = nodo
    }

}

function* calcola(testa,f){
    let somma = 0
    while(testa !== null) {
        somma+= f(testa.val)
        yield somma
        testa = testa.next
    }

    }


class FondiInsufficienti extends Error{}
class Caveau{
    #owner
    #saldoIniziale
    #mov = []
    static #reg = new Set()
    constructor(owner,saldoIniziale = 0){
        if(typeof(owner) !== "string" || owner.length === 0){
            throw new TypeError();
        }
        if(typeof(saldoIniziale) !== "number" || saldoIniziale < 0 || Number.isNaN(saldoIniziale))
            throw new TypeError();
        this.#owner = owner;
        this.#saldoIniziale = saldoIniziale;
    }
    get owner(){return this.#owner}
    get saldo(){return this.#saldoIniziale}
    versa(n,causale){
        if(typeof n !== "number" || n <= 0)
            throw new TypeError();
        if(typeof causale !== "string")
            throw new TypeError();
        this.#saldoIniziale += n;
        let m = {
            tipo: "V",
            importo: n,
            causale: causale,
        }
        this.#mov.push(m)
        Caveau.#reg.add([this,m])
        return a
    }
    preleva(n,causale){
        if(typeof n !== "number" || n <= 0)
            throw new TypeError();
        if(typeof causale !== "string")
            throw new TypeError();
        if(n > this.#saldoIniziale)
            throw new FondiInsufficienti();
        this.#saldoIniziale -= n;
        let m = {
            tipo: "P",
            importo: n,
            causale: causale,
        }
        this.#mov.push(m)
        Caveau.#reg.add([this,m])
        return a
    }
    estratto(k = 10){
        return [...this.#mov.slice(-k).map(x=>({...x}))].reverse()
    }
    static transazioni(){
        return new Set(this.#reg)
    }
}


class Pacco{
    #identificatore
    #peso
    #stato
    data
    constructor(identificatore,peso,stato){

    }
}