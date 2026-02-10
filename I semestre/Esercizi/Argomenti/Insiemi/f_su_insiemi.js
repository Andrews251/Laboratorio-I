
//insiemi di riferimento
let A = {mela: 1, banana: 1, pera: 5}
let B = {pera: 3, anguria: 4, ciligie: 10, banana: 4, mela: 3}

let A1 = {mela: 1, banana: 1, pera: 5}
let B1 = {mela: 1, banana: 1, pera: 5}


//OPERAZIONI SU INSIEMI SEMPLICI
function inserisci(insieme,elemento = 'default'){
    insieme[elemento] = 1
}

function elimina(insieme, elemento){
    if(elemento in insieme)
        insieme[elemento] -= 1
}

function appartiene(insieme, elemento){
    return elemento in insieme
}

function unione(A ={},B = {}){
    
    let C = {}
    for(let elemento in A)
        C[elemento] = 1
    for(let elemento in B)
        C[elemento] = 1

    return C
}

function intersezione(A,B){

    let C = {}
    for(let elemento in A){
        if(elemento in B)
            C[elemento] = 1
    }
    
    return C
}

function differenza (A, B){
    let C = {}

    for(let elemento in A){
        if(!(elemento in B))
            C[elemento] = 1
    }

    return C
}

function sottoinsieme(A,B){
    for(let elemento in A){
        if(!(appartiene(B,elemento)))
            return false
    }
        
    return true
}

function uguali(A,B){
    return sottoinsieme(A,B) && sottoinsieme(B,A)

}




//OPERAZIONI SU MULTI INSIEMI
function inserisciMulti(M, elemento, quantita){

    if(elemento in M){
        if(quantita < 0)
            M.elemento = undefined
        else
            M.elemento += quantita
    }
    if(quantita < 0)
        M[elemento] = undefined
    else
        M[elemento] = quantita

    return M
}

function rimuoviMulti(M, elemento, quantita){
    if(elemento in M)
        M[elemento] -= quantita
    if(M[elemento] <= 0)
        delete M[elemento]
}

function unioneMulti(A,B){
    let C = {...A}
    for(let elemento in B){
        if(elemento in C)
            C[elemento] += B[elemento]
        else    
            C[elemento] = B[elemento]

    }
    return C
}

function intersezioneMulti(A,B){
    let C = {...A}

    for(let elemento in A){
        if(elemento in B)
            C[elemento] += B[elemento]
    }
    
    return C

}

function differenzaMulti(A,B){
    let C = {...A}

    for(let elemento in C){
        if(elemento in B)
            C[elemento] -= B[elemento]
        if(C[elemento] <= 0)
            delete C[elemento]
    }

    return C
}

function cardinalitaMulti(M){
    let card = 0

    for(let elemento in M)
        card += M[elemento]

    return card
}

function arrayToMultiinsieme(arr){
    let C = {...arr}
    return C
}

function multiinsiemeToArray(M){
    let arr = []

    for(let elemento in M)
        arr.push(M[elemento])

    return arr
}

