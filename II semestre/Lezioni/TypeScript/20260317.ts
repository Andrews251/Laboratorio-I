//Esercitaazione 17/03/2026 - Laboratorio I Corso B
import * as assert from 'assert';
/*
class Counter{
    value: number
    static default_value: number = 0
    constructor(value: number | undefined) {
        if(typeof value === 'number')
            this.value = value
        else
            this.value = Counter.default_value
    }
    increment(x:number):void{
        if(x <= 0)
            throw new RangeError()
        this.value += x
    }
    decrement(x:number):void{
        if(x <= 0)
            throw new RangeError()
        this.value -= x
    }
}

//TEST
let c: Counter = new Counter(undefined)
console.log(c.value)
c.increment(10)
console.log(c.value)
let c1: Counter = new Counter(1)
c1.decrement(10)
console.log(c1.value)

try{
    c1.increment(0)
}catch(e){
    if(e instanceof RangeError){
        console.log("Errore Range")
    }
}

enum Level{
    info = "INFO",
    warning = "WARNING",
    error = "ERROR"
}

class UnknownLevel extends Error{}
class Logger{
    static reg : string[] = []
    static log(level:Level,message:string):void{
        if(!(level in Level))
            throw new UnknownLevel()
        Logger.reg.push(level + " : " + message)
        console.log(level + " : " + message)
    }
    static history():void{
        for(let i of Logger.reg)
            console.log(i)
    }
}

Logger.log(Level.info,"errore")
Logger.log(Level.info,"errore")
Logger.log(Level.warning,"errore")
Logger.log(Level.error,"errore")
Logger.history()


class TreeNode{

}

enum Semi{
    CUORI,
    QUADRI,
    FIORI,
    PICCHE
}

enum Valori{
    DUE = 2,
    TRE,
    QUATTRO,
    CINQUE,
    SEI,
    SETTE,
    OTTO,
    NOVE,
    DIECI,
    J,
    Q,
    K,
    ASSO
}

type Carta = [Semi,Valori]
class Mano{
    carte: Carta[] = []
    constructor (c1:Carta,c2:Carta,c3:Carta,c4:Carta,c5:Carta){
        this.carte.push(c1,c2,c3,c4,c5)
    }
    ordina():void{
        this.carte.sort((a:Carta,b:Carta):number => {
            if(a[1] === b[1])
                return b[0] - a[0];
            else
                return a[1] - b[1];
        });
    }
    poker():boolean{
        let count: {[key:number]:number} = {}
        for(let c of this.carte){
            let valore: Valori = c[1]
            if(!count[valore])
                count[valore] = 0;
            else
                count[c[1]] += 1
        }
        for(let i in count){
            if(count[i] === 4)
                return true
        }
        return false
    }
    scala():boolean{
        this.ordina()
        //verifico scala 1-5
        if( this.carte[4][1] === Valori.ASSO &&
            this.carte[0][1] === Valori.DUE &&
            this.carte[1][1] === Valori.TRE  &&
            this.carte[2][1] === Valori.QUATTRO  &&
            this.carte[3][1] === Valori.CINQUE
        )
            return true
        for(let i = 1; i < this.carte.length; i++){
            let curVal = this.carte[i][1]
            let precVal = this.carte[i-1][1]
            if(curVal > precVal)
                return false
        }
        return true
    }
}
*/

class BTreeNode{
    value: number
    left: BTreeNode | null
    right: BTreeNode | null
    constructor(value:number){
        this.value = value
        this.left = null
        this.right = null
    }
    insert(value:number):BTreeNode{
        if(this === null) //albero vuoto
            this.value = value
        else{
            if(value <= this.value){
                if(this.left !== null)
                    this.left.insert(value)
                else
                    this.left = new BTreeNode(value)
            }

            if(value > this.value){
                if(this.right !== null)
                    this.right.insert(value)
                else
                    this.right = new BTreeNode(value)
            }

        }
        return this

    }
    isLeaf():boolean{
        return (this.left === null) && (this.right === null)
    }
    min():number{
        if(this.left === null)
            return this.value
        return this.left.min()
    }
    max():number{
        if(this.right === null)
            return this.value
        return this.right.max()
    }
    minmax():[number,number]{
        return [this.min(), this.max()]
    }
    count():number{
        if(this === null)
            return 0
        return 1 + (this.left !== null ? this.left.count(): 0) + (this.right !== null ? this.right.count(): 0)
    }
}




console.log("Avvio dei test per BTreeNode...");

const root = new BTreeNode(10);

// Test 1: Inizializzazione e isLeaf()
assert.strictEqual(root.value, 10, "Errore: Il valore del nodo radice dovrebbe essere 10");
assert.strictEqual(root.isLeaf(), true, "Errore: Un nodo appena creato e senza figli dovrebbe essere una foglia");

// Test 2: Metodo insert()
root.insert(5);
root.insert(15);
assert.strictEqual(root.isLeaf(), false, "Errore: Dopo aver inserito dei figli, il nodo non è più una foglia");

// Verifichiamo il posizionamento dei nodi figlio
assert.notStrictEqual(root.left, null, "Errore: Dovrebbe esistere un figlio sinistro per il valore 5");
if (root.left !== null) {
    assert.strictEqual(root.left.value, 5, "Errore: Il figlio sinistro dovrebbe avere valore 5");
}

assert.notStrictEqual(root.right, null, "Errore: Dovrebbe esistere un figlio destro per il valore 15");
if (root.right !== null) {
    assert.strictEqual(root.right.value, 15, "Errore: Il figlio destro dovrebbe avere valore 15");
}

// Test 3: Metodo count()
assert.strictEqual(root.count(), 3, "Errore: L'albero dovrebbe contenere 3 nodi in totale in questo momento");

// Test 4: Metodo minmax()
// Inseriamo ulteriori valori per testare la ricerca dei minimi e massimi
root.insert(3);
root.insert(20);

const [min, max] = root.minmax();
assert.strictEqual(min, 3, "Errore: Il valore minimo trovato nell'albero dovrebbe essere 3");
assert.strictEqual(max, 20, "Errore: Il valore massimo trovato nell'albero dovrebbe essere 20");

console.log("Tutti i test base sono stati eseguiti!");