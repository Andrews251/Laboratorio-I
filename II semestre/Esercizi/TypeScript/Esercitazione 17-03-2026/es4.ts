import * as assert from 'assert'

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