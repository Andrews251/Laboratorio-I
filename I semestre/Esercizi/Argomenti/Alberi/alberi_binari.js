
//FUNZIONI BASE SU ALBERI BINARI
let tree = {
    val:1,
    sx: {
        val:2,
    dx: {
        val: 3,
        sx: {
            val: 4
        },
        dx:{
            val: 5
        }
    }
    }
}

function visit(t){ //visita in PREORDER
    if(!t)
        return
    console.log(t.val)
    visit(t.sx)
    visit(t.dx)
}

function visitToArray(t){ //inserisce gli elementi visitati in un array
    if(!t)
        return []
    return [t.val,
        ...visitToArray(t.sx),
        ...visitToArray(t.dx)
    ]
}

function visitToArrayBasso(t){ //inserisce gli elementi visitati in un array visitandolo dal basso
    if(!t)
        return []
    return [
        ...visitToArrayBasso(t.sx),
        ...visitToArrayBasso(t.dx),
        t.val
    ]
}

function simmetricaArr(t){
    if(!t)
        return []
    return [
        ...simmetricaArr(t.sx),
        t.val,
        ...simmetricaArr(t.dx)
        
    ]
}


//MASSIMO E MINIMO
function massimo(t){
    if (!t)
        return -Infinity
    return Math.max(t.val, massimo(t.sx), massimo(t.dx))
}


function minimo(t){
    if (!t)
        return +Infinity
    return Math.min(t.val, minimo(t.sx), minimo(t.dx))
}


function somma(t){
    if(!t)
        return 0
    return t.val + somma(t.sx) + somma(t.dx)
}

function contiene(t,v){
    if(!t)
        return false
    if(t.val === v)
        return true
    return contiene(t.sx, v) || contiene(t.dx, v)
}

//conta quanti nodi hanno il valore
function contaQuanti(t,v){
    if(!t)
        return 0
    if(t.val === v)
        return 1 + contaQuanti(t.sx,v) + contaQuanti(t.dx, vb)
    else    
        return contaQuanti(t.sx,v) + contaQuanti(t.dx, vb)
}


//SCAMBIO di ramo destro e sinistro della radice di un albero binario

function swapBranchesRadix(t){
    if(!t)
        return

    [t.sx,t.dx] = [t.dx, t.sx]

    // let tmp = t.sx
    // t.sx = t.dx
    // t.dx = tmp
}

function swapBranches(t){
    if(!t)
        return 
    swapBranchesRadix(t) //swap della radice
    if(t.sx)
        swapBranches(t.sx) //swap figlio sinistro
    if(t.dx)
        swapBranches(t.dx) //swap figlio destro
}

//COPIA DELL'ALBERO SPECCHIATO
function swapBranchesCopy(t){
    if(!t)
        return null
    return {
        val: t.val,
        sx: swapBranchesCopy(t.dx),
        dx: swapBranchesCopy(t.sx)
    }
}

//TAGLIA l'albero quando trova il valore v cercato
function trimTree(t,v){
    if(!t)
        return null
    t.sx = trimTree(t.sx, v) //scendo nell'albero a sinistra
    t.dx = trimTree(t.dx, v) //scendo nell'albero a destra

    return t.val === v? null : t //se trovo il valore taglio l'albero, altrimenti ritorno l'albero con i riferimenti modificati
}

console.log(simmetricaArr(tree))