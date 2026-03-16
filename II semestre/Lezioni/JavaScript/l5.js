import assert from 'assert'

class CreditoInsufficiente extends Error{}

class Movimento{
    tipo
    euro
    motivo
    data
    constructor(tipo,euro,motivo,data) {
        this.tipo = tipo;
        this.euro = euro;
        this.motivo = motivo;
        this.data = data;
    }
}

class Parcometro{
    #targa
    #credito
    static #reg = new Set()
    #mov= []
    constructor(targa,credito = 0){
        if(credito < 0)
            throw new TypeError()
        if(typeof targa !== 'string' || targa.length === 0)
            throw new TypeError()
        this.#targa = targa;
        this.#credito = credito;
    }
    get credito(){
        return this.#credito;
    }
    ricarica(euro,motivo){
        if(typeof euro !== 'number' || euro <=0 || typeof(motivo) !== "string")
            throw new TypeError()
        this.#credito = this.credito + euro;
        let a = new Movimento("R",euro,motivo,new Date())
        this.#mov.push(a)
        Parcometro.#reg.add([this,a])
        return a
    }
    paga(euro,motivo){
        if(euro > this.#credito)
            throw new CreditoInsufficiente()
        if(typeof euro !== 'number' || euro <=0 || typeof(motivo) !== "string")
            throw new TypeError()
        this.#credito = this.credito - euro;
        let a = new Movimento("S",euro,motivo,new Date())
        this.#mov.push(a)
        Parcometro.#reg.add([this,a])
    }
    storico(k = 5){
        let arr = []
        let len = Math.max(0, this.#mov.length - k)
        for(let i=this.#mov.length - 1; i >= len;i--){
            let res = this.#mov[i]
            arr.push(new Movimento( //questo può essere sostituito da .map(x=>({...x})
                res.tipo,
                res.euro,
                res.motivo,
                new Date(res.data))
            )
        }
        return arr
        ///oppure puoi fare return [...this.#mov.slice(-k).map(x=>({...x}))].reverse()
    }
    static registro(){
        return new Set(this.#reg)
    }
}


class PrioritaNonValida extends Error{}
class ModificaTicketChiuso extends Error{
    constructor(codice) {
        super();
        this.codice = codice;
    }
}
class SLASuperato extends Error{
    constructor(codice) {
        super();
        this.codice = codice;
    }
}

class Ticket{
    #codice
    #chiuso
    #log
    #priorita
    constructor(codice,priorita){
        if(typeof codice !== 'string' || codice.length === 0)
            throw new TypeError()
        if(typeof priorita !== 'number' || priorita < 1 || priorita > 5)
            throw new TypeError()
        this.#codice = codice
        this.#priorita = priorita
        this.#chiuso = false
        this.#log = []
    }
    get codice(){
        return this.#codice
    }
    get chiuso(){
        return this.#chiuso
    }
    get priorita(){
        return this.#priorita
    }
    get log(){
        return [...this.#log]
    }
    set priorita(p){
        if(this.#chiuso)
            throw new ModificaTicketChiuso(this.#codice)
        if(!Number.isInteger(p) || p < 1 || p > 5)
            throw new PrioritaNonValida()
        this.#priorita = p
    }
    aggiungiNota(testo){
        if(this.#chiuso)
            throw new ModificaTicketChiuso(this.#codice)
        this.#log.push(testo)
    }
    chiudi(){
        if(!this.#chiuso){
            this.#chiuso = true
            this.#log.push("CHIUSURA")
        }
    }
}

class TicketConSLA extends Ticket{
    #tempoMassimo
    #tempoTrascorso
    constructor(codice, priorita, tempoMassimo,tempoTrascorso = 0) {
        super(codice, priorita);
        if(typeof tempoMassimo !== 'number' || tempoMassimo <= 0)
            throw new TypeError()
        this.#tempoMassimo = tempoMassimo
        this.#tempoTrascorso = tempoTrascorso
    }
    get tempoMassimo(){
        return this.#tempoMassimo
    }
    get tempoTrascorso(){
        return this.#tempoTrascorso
    }
    set tempoTrascorso(t){
        if(typeof t !== 'number' || t <= 0)
            throw new TypeError()
        this.#tempoTrascorso = t
        if(this.#tempoTrascorso > this.#tempoMassimo){
            super.chiudi()
            throw new SLASuperato(this.codice)
        }
    }
}

function incrementaTempo(tickets,delta){
    let sup = []
    for(let i of tickets) {
        if (i instanceof TicketConSLA) {
            try {
                i.tempoTrascorso += delta;
            } catch (e) {
                if(e instanceof SLASuperato)
                    sup.push(i)
            }
        }
    }
    return sup
}

class NodoBinario{
    #val
    #left
    #right
    constructor(val,left = null,right = null){
        this.#val = val
        this.#left = left
        this.#right = right
        if(typeof val !== 'number' || !(left instanceof NodoBinario) || !(right instanceof NodoBinario) || left === undefined || right === undefined)
            throw new TypeError()
    }
    get val(){
        return this.#val
    }
    get left(){
        return this.#left
    }
    get right(){
        return this.#right
    }
}

function* foglieConProfondita(radice = null,p = 0){
    if(radice === null)
        return
    if(radice.left === null && radice.right === null)
        yield [p,radice.val]
    yield* foglieConProfondita(radice.left, p+1)
    yield* foglieConProfondita(radice.right, p+1)
}
Map.prototype.incrementa = function (key, amount){
    if(!(this.has(key)))
        this.set(key, amount)
    else
        this.set(key, this.get(key) + amount);
    return this
}

Map.sommaFogliePerProfondita = function(radice){
    if(radice === null)
        return new Map()
    let res = new Map()
    for(let [p,v] of foglieConProfondita(radice)){
        res.incrementa(p,v)
    }
    return res
}

var t =
    new NodoBinario(5,
        new NodoBinario(3,
            new NodoBinario(1),
            new NodoBinario(4)
        ),
        new NodoBinario(2)
    );

var vals = [...foglieConProfondita(t)];
assert.deepStrictEqual(vals, [[2,1],[2,4],[1,2]]);

var m = Map.sommaFogliePerProfondita(t);
assert.strictEqual(m.get(2), 5);
assert.strictEqual(m.get(1), 2);
