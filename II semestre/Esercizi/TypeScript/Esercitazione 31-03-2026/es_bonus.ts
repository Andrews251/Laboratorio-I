/*
* Estendere la classe Trie<T> aggiungendo un metodo reduce(f, initialValue)
* che restituisce il risultato dell’applicazione della funzione di riduzione f(accumulator,
* currentValue) a ciascun valore di tipo T memorizzato nel trie, usando initialValue
* come valore iniziale dell’accumulatore.
*/

type Riduzione <T> = (accumulator: T, currentValue: T) => T
class TrieNode <T>{
    children: Map<string, TrieNode<T>> = new Map<string, TrieNode<T>>() //associo a ogni lettera un nodo
    isTerminal: boolean = false;
}

class Trie<T> {
    private root: TrieNode<T>
    private _size: number
    constructor() {
        this.root = new TrieNode();
        this._size = 0
    }
    get size(): number{
        return this._size
    }

    insert(key: string, value: TrieNode<T>): void{
        let node: TrieNode<T> = this.root;
        for(let c of key){ //scorro i caratteri della stringa
            if(!(node.children.has(c))){
                node.children.set(c, new TrieNode<T>) //se il carattere non è nel trie lo inserisco
            }
            node = node.children.get(c)!
        }
        if(!(node.isTerminal)){ //sono arrivato al termine della parola, se il nodo non è terminale, lo rendo tale e aumento la size
            node.isTerminal = true;
            this._size++
        }
    }
    lookup(key: string): boolean{
        let node: TrieNode<T> = this.root;
        for(let c of key){
            if(!(node.children.has(c)))
                return false
            node = node.children.get(c)!
        }

        return node.isTerminal
    }
    *prefixSearch(prefix: string): Generator <string>{
        let node: TrieNode<T> = this.root;
        for(let c of prefix){
            if(!(node.children.has(c))){
                return
            }
            node = node.children.get(c)!
        }
        yield* this.strings(node, prefix)
    }
    *strings(node: TrieNode<T>, prefix: string): Generator <string>{
        if(node.isTerminal)
            yield prefix
        for(let [char, child] of node.children){
            yield* this.strings(child, prefix + char)
        }
    }
    reduce(f: Riduzione<T>, initialValue: T): T{

    }
}