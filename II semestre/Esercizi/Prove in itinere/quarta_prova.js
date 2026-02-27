class MapStation{

    size = 0
    stazioni //proprietà per le stazioni, trattate come un grafo
    constructor(){
        this.stazioni = {}
    }
    binario(u,v){
        if(!(u in this.stazioni)){
            this.stazioni[u] = []
            this.size += 1
        }

        if(!(v in this.stazioni)){
            this.stazioni[v] = []
            this.size += 1
        }
        //una volta arrivato qui, sono sicuro del fatto che le stazioni esistono e posso collegarle
        this.stazioni[u].push(v)
        this.stazioni[v].push(u)

    }
    diretto(u,v){
        return this.stazioni[u].includes(v) //mi basta controllare un solo collegamento, data la bidirezionalità
    }
    raggiungibile(u,v,visitati = []){ //utilizzo un array per i visitati in modo tale da evitare
        //che si creino loop nella visita del grafo data la bidirezionalità
        for(let s of this.stazioni[u]){
            if(visitati.includes(s))
                continue
            if(s === v) //caso base, ho raggiunto il nodo
                return true
            else{
                visitati.push(s)
                let cerca = this.raggiungibile(s,v,visitati) //non ho trovato il nodo, quindi procedo ricorsivamente sui figli
                if(cerca)
                    return true
            }

        }
        return false //se arrivo qui ho visitato tutte le stazioni e non ho trovato un percorso
    }
    percorso(u,v,visitati = []){ //procedo allo stesso modo ma in questo caso salvo il percorso


        for(let s of this.stazioni[u]){
            if(visitati.includes(s))
                continue
            visitati.push(s)
            if(s === v){
                return [u,v]
            }
            else{

                let cerca = this.percorso(s,v,visitati)
                if(cerca)
                    return [u,...cerca] //ritorna il nodo di partenza e poi tutto il percorso ottenuto dalla ricorsione
            }

        }
        return null
    }
}

const assert = require('assert');


//controllo sui numeri interi e a <= b

class INode{
    a
    b
    left = null
    right = null

    constructor([a,b]){
        this.a = a
        this.b = b
    }
    add(n){//inserisce il nodo nel sottoalbero corretto implementando la logica abr del problema
        //quando il nodo destro o sinistro (in base ai controlli) è null, creo il nuovo nodo
        if(n[0] < this.a){
            if(this.left !== null)
                this.left = this.left.add(n)
            else
                this.left = new INode(n)
        }
        else if(n[0] > this.a)
            if(this.right !== null)
                this.right = this.right.add(n)
            else
                this.right = new INode(n)
        else{
            if(n[1] < this.b){
                if(this.left !== null)
                    this.left = this.left.add(n)
                else
                    this.left = new INode(n)
            }
            else if(this.right !== null){
                this.right = this.right.add(n)
            }
            else
                this.right = new INode(n)
        }
        return this //a questo punto ritorno semplicemente il nodo appena creato
    }
    findValue(x){//cerca x tale che x è compreso tra a e b inclusi

        if(this.a !== null && this.b !== null){

            if(x < this.a) //è minore di a, quindi (se esiste) cerco a sinistra
                return this.left !== null? this.left.findValue(x): null
            if(x >= this.a){
                if(x <= this.b){ //in questo caso x è compreso, quindi restituisco il nodo
                    return this
                }
                let res = null //utilizzo una variabile per salvare il risultato delle chiamate ricorsive
                if(this.right !== null){ //dato che sto ordinando prima per a e poi b, non so niente sul limite destro, quindi controllo sia a destra che a sinistra
                    res = this.right.findValue(x)
                }
                if(res !== null && this.left !== null){
                    res = this.left.findValue(x)
                }
            }
            return res
        }
    }
    get maxd(){

        if(this.left === null && this.right === null)
            return 1
        else
            return 1 + Math.max(this.left !== null? this.left.maxd: 0, this.right !== null? this.right.maxd: 0) //se uno dei due non esiste lo considero di profondità 0
    }
    get mind(){

        if(this.left === null && this.right === null) //se è una foglia ritorno 1
            return 1
        else if(this.left && this.right){ //controllo se ho entrambi i figli per evitare problemi
            return 1 + Math.min(this.left.mind, this.right.mind)
        }
        else //se arrivo qui ho solo uno dei due e calcolo di conseguenza
            return this.left !== null? 1 + this.left.mind : 1 + this.right.mind

    }
}

class YetAnotherAlbero extends INode {
    root
    size = 0

    constructor() {
        super([null, null]); //inizializzo a null per evitare problemi successivi
        this.root = null //stessa cosa per la radice
    }

    addInterval([a, b]) {

        if (this.size === 0) { //non ho nodi, quindi assegno a e b e aggiorno la radice e la size
            this.a = a
            this.b = b
            this.root = this
            this.size += 1
        } else{
            super.add([a, b]) //chiamo direttamente il metodo della superclasse e aggiorno la size
            this.size += 1
        }
        return this

    }
}
/*
var ex = new YetAnotherAlbero();
[[5,20], [4,8], [6,12], [4,15], [4,13],[1,3],[7,10]].forEach((I) => ex.addInterval(I));

assert.equal(ex.size, 7);
assert.equal(ex.root.maxd, 4);
assert.equal(ex.root.mind, 3);

assert.deepEqual(ex.root.findValue(2), ex.root.left.left)
let f = ex.root.findValue(5)
assert.ok(f.a <= 5)
assert.ok(f.b >=5)
 */



class MediaMobile{
    #k
    #i
    constructor(k,...i) {
        this.#k = k
        this.#i = i
    }
    *succ(){

        let media
        let coda = [] //sfrutto una cosa in modo tale da poter avere sempre length = k
        //in questo modo per il calcolo della media mobile sarà comodo poter usare Array.shift() per rimuovere il primo elemento e continuare con la media
        //prima riempio la coda fino a k
        for(let i of this.#i){
            yield i
            coda.push(i)
        }
        //quando arrivo qui sono nel caso j > i
        while(true){
            let somma = coda.reduce((acc, v) => acc + v, 0)
            media = media = Math.floor((1/this.#k)*somma)
            yield media
            if(coda.length < this.#k){
                coda.push(media)
                somma = somma + media

            }
            else{
                let prev = coda.shift()
                coda.push(media)
                somma = (somma - prev) + media
            }

        }
    }
}
//
// var mm = new MediaMobile(2, 10, 0);
// var x = mm.succ(),
//     r = [];
// for (var i = 0; i < 8; i++) r.push(x.next().value);
// assert.deepEqual(r, [10, 0, 5, 2, 3, 2, 2, 2]);

class FinestraLab extends Array{
    #pmaxc = 10 //lunghezza massima della finestra dei campioni mantenuti
    get maxc(){
        return this.#pmaxc
    }
    set maxc(m){
        this.#pmaxc = m
        while(this.length > this.#pmaxc){
            this.shift()
        }

    }
    push(e){
        //console.log(this.#pmaxc)
        if(this.length <= this.#pmaxc){
            super.push(e)
        }
        while(this.length > this.#pmaxc){
            this.shift()
        }
    return this.length
    }
}

var w = new FinestraLab();
for (var i = 0; i < 10; i++) w.push(i);
w.maxc = 4;
assert.deepEqual(w, [6, 7, 8, 9]);