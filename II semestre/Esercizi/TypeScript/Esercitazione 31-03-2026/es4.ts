//Versione del Trie con i generics

class TrieNode <T>{
    children: Map<string, TrieNode<T>> = new Map<string, TrieNode<T>>() //associo a ogni lettera un nodo
    value: T | undefined
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

    insert(key: string, value: T): void{
        let node: TrieNode<T> = this.root;
        for(let c of key){ //scorro i caratteri della stringa
            if(!(node.children.has(c))){
                node.children.set(c, new TrieNode<T>) //se il carattere non è nel trie lo inserisco
            }
            node = node.children.get(c)!
        }
        if(node.value === undefined){ //sono arrivato al termine della parola, se il nodo non è terminale, lo rendo tale e aumento la size
            this._size++
        }
        node.value = value
    }
    lookup(key: string): T | undefined{
        let node: TrieNode<T> = this.root;
        for(let c of key){
            if(!(node.children.has(c)))
                return undefined;
            node = node.children.get(c)!
        }
        return node.value
    }
    *prefixSearch(prefix: string): Generator <[string, T]>{
        let node: TrieNode<T> = this.root;
        for(let c of prefix){
            if(!(node.children.has(c))){
                return
            }
            node = node.children.get(c)!
        }
        yield* this.strings(prefix, node)
    }
    *strings(prefix: string, node: TrieNode<T>): Generator <[string, T]>{
        if(node.value !== undefined)
            yield [prefix, node.value]
        for(let [char, child] of node.children){
            yield* this.strings(prefix + char, child)
        }
    }
}