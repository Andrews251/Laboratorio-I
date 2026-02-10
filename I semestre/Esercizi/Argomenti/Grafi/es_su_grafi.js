let gl = {
    0: [1,2],
    1: [],
    2: [1,3,4],
    3: [4],
    4: [1]
}

let gm = [
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1,  1],
    [0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0]
]

function bidirezionale(gl, i, j){

    return gl[i].includes(j) && gl[j].includes(i);
}

//Restituisce il grado del nodo
function grado(g,n){
    let entranti = 0
    let uscenti = 0

    if(n in gl){
        uscenti = gl[n].length
    }

    for(let nodo in gl){
        if(gl[nodo].includes(n))
            entranti += 1
    }

    return entranti + uscenti
}

console.log(grado(gl, 1))

function trasponi(g){
    let res = {}

    for(let nodo in g){
        res[nodo] = []
    }
    for(let i in g){
        let tmp = g[i]

        for(let j of tmp){
            res[j].push(i)
        }
    }

    return res
}

console.log(trasponi(gl))