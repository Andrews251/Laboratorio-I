function prodotto_scalare(x,y){
    if(x.length !== y.length)
        return undefined
    let res = 0
    for(let i=0;i<x.length;i++){
        res = res + x[i] * y[i]
    }

    return res
}

function ordnung(a){ //ordino tutti i sotto array e poi ordino l'array esterno secondo criteri
    for(let i=0;i<a.length;i++){
        a[i].sort((a,b)=>a-b) //ordinamento array interni
    }
    function compareFn(a,b){

        for(let i=0;i < Math.min(a.length, b.length);i++){
            if(a[i] !== b[i]) //se i valori sono diversi, allora ritorno la loro differenza, l'ordinamento avverrà in automatico
                return a[i] - b[i]
            //nel caso a[i] === b[i] confronta il prossimo elemento
        }

        return a.length - b.length //ordina prima l'array di lunghezza minore
    }
    a.sort(compareFn)

    return a
}

let arrT = [[5,1,3],[1,5,2,7],[3,4],[3]];
//console.log(ordnung(arrT))

/*
let Qa = {val: 2, sotto: 0, sx:
                                    {val: 4, sotto: 0, sx:
                                                        {val: 6, sotto: 0}, dx:
                                                                                {val: 6, sotto: 0, dx:
                                                                                                        {val: 8, sotto: 0}}},
                                dx: {val: 7, sotto: 0, sx:
                                                            {val: 8, sotto: 0}}};


*/

function contaSotto(Qa) {
    if (!Qa)
        return 0
    return Qa.sotto = 1 + contaSotto(Qa.sx) + contaSotto(Qa.dx) //qui aggiorno il valore di sotto, chiamando sia sx che dx poiché nel caso siano null ritorno zero e quindi non rovino la somma
}
//console.log(Qa, contaSotto(Qa))

let Q = {val: 2, sx: {val: 4, sx: {val: 6}, dx: {val: 6, dx:{val: 8}}}, dx: {val: 7, sx: {val: 8}}};

function minDepth(T){ //profondità minima
    if(!T)
        return 0 //se albero vuoto o nodo vuoto ritorno 0
    if(!T.sx && !T.dx)
        return 0 // se non ho destra e sinistra sono una foglia
    return 1 + Math.min((T.sx ? minDepth(T.sx): +Infinity), (T.dx ? minDepth(T.dx): +Infinity)) //ritorno il conteggio ma chiedendomi se ho il nodo dx o sx in modo tale da non confrontare min con 0
}

//console.log(minDepth(Q))

function tagliaRami(T,v){
    if(!T)
        return null
    if(T.figli){ //devo sempre chiedermi se ho i figli oppure no per evitare errori come "cannot read properties of ..."
        T.figli = T.figli.filter((a)=> a.val !== v) //uso il filter per tenere solo i nodi diversi da v, posso farlo perchè T.figli è un array
        for(let figlio of T.figli){
            tagliaRami(figlio,v) //questo mi permette di andare al prossimo nodo
        }
    }
    return T
}

function livelloDispari(T,livello = 0){
    if(!T)
        return true
    if(livello % 2 === 0 && T.val % 2 === 0)
        return false
    if(livello % 2 !== 0 && T.val % 2 !== 0)
        return false
    return livelloDispari(T.sx, livello + 1) && livelloDispari(T.dx,livello + 1)
}

/* Versione alternativa
function livelloDispari(T,livello = 0){
    if(!T)
        return true
    return (livello % 2 !== 0 && T.val % 2 !== 0) || (livello % 2 === 0 && T.val % 2 === 0)? false : livelloDispari(T.sx, livello + 1) && livelloDispari(T.dx,livello + 1)
}
 */

function lar(T){
    if(!T)
        return []
    let l = T.sx ? 1 + lar(T.sx)[0] : 1 //lar(T.sx)[0] mi permette di accedere SOLO al figlio sinistro e contare solo quello
    let r = T.dx ? 1 + lar(T.dx)[1] : 1

    return [l,r]
}

function evenout(n){
    if(n < 0)
        return undefined
    let m = 0
    let b = []
    let uni = 0
    while(n >= 1){ //altrimenti non pusha l'ultimo numero
        b.push(n%2)
        if(n%2 === 1)
            uni += 1 //conto il numero di uni
        n = Math.floor(n/2)
    }
    b.reverse()

    uni % 2 === 0 ? b.push(0) : b.push(1) //come da problema, se sono pari metto 0 altrimenti 1
    let j = b.length - 1
    for(let i = 0; i < b.length; i++){
        m += b[i] * (2 ** j)
        j = j - 1
    }
    return m
}

//console.log(evenout(11))

function innesta(T1,v1,T2,v2){
    if(!T1 && !T2)
        return null
    if(!T1)
        return T2
    if(!T2)
        return T1

    function find(T,v){
        let ref
        if(T.figli){
            for(let figlio in T.figli){
                if(T.figli[figlio].val === v){
                    return ref = {parent: T, ind: figlio}
                }
                else{
                    let res = find(T.figli[figlio],v)
                    if(res !== undefined)
                        return res
                }

            }
        }

    }

    let ref1 = find(T2, v2)
    let ref2 = find(T1, v1)
    let tmp = ref2.parent.figli[ref2.ind]
    ref2.parent.figli[ref2.ind] = ref1.parent.figli[ref1.ind]
    ref1.parent.figli[ref1.ind] = tmp

    return T1

}


function isBil(T){
    if(!T)
        return true

    function subBal(T){
        let tmp = undefined
        if(T.figli){
            let h
            for(let figlio of T.figli){
                h = 1 + subBal(figlio)
            }
            if(tmp === undefined)
                tmp = h
            else return h !== tmp
        }
    }

}


function minMax(a){
    let b = {}
    let min = +Infinity
    let max = -Infinity
    for(let i in a){
        for(let elemento in a[i]) {
            min = Math.min(min, Number(elemento))
            max = Math.max(max, Number(elemento))
        }
        b[String(min)] = 1
        b[String(max)] = 1
    }

    return b
}


function rpath(T,v){
    if(!T)
        return undefined
    let res = T.val === v? [T.val] : []
    if(T.figli){
        for(let figlio of T.figli){
            if(figlio.val === v){
                let next = rpath(figlio,v)
                if(next !== undefined){
                    res.push(figlio.val)
                    return res
                }

            }
            else
                rpath(figlio,v)
            }
        }

    return res
}


function rpath(T, v) { //se trova il nodo === v restituisce tutto il path fino alla radice
    if (T.val === v) {
        return [T.val]
    }

    if (T.figli) {
        for (let figlio of T.figli) {
            let res = rpath(figlio, v)
            if (res !== undefined) {
                res.push(T.val)
                return res
            }
        }
    }

    return undefined
}
