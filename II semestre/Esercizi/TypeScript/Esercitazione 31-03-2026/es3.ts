class TrieNode{
    children: Map<string, TrieNode> = new Map<string, TrieNode>() //associo a ogni lettera un nodo
    isTerminal: boolean = false;
}

class Trie{
    private root: TrieNode
    private _size: number
    constructor() {
        this.root = new TrieNode();
        this._size = 0
    }
    get size(): number{
        return this._size
    }

    insert(key: string): void{
        let node: TrieNode = this.root;
        for(let c of key){ //scorro i caratteri della stringa
            if(!(node.children.has(c))){
                node.children.set(c, new TrieNode) //se il carattere non è nel trie lo inserisco
            }
            node = node.children.get(c)!
        }
        if(!(node.isTerminal)){ //sono arrivato al termine della parola, se il nodo non è terminale, lo rendo tale e aumento la size
            node.isTerminal = true;
            this._size++
        }
    }
    lookup(key: string): boolean{
        let node: TrieNode = this.root;
        for(let c of key){
            if(!(node.children.has(c)))
                return false
            node = node.children.get(c)!
        }

        return node.isTerminal
    }
    *prefixSearch(prefix:string): Generator <string>{
        let node: TrieNode = this.root;
        for(let c of prefix){
            if(!(node.children.has(c))){
                return
            }
            node = node.children.get(c)!
        }
        yield* this.strings(node, prefix)
    }
    *strings(node: TrieNode, prefix: string): Generator <string>{
        if(node.isTerminal)
            yield prefix
        for(let [char, child] of node.children){
            yield* this.strings(child, prefix + char)
        }
    }
}