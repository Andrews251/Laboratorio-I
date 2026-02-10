// import * as funzioni from f_su_insiemi;


// //Insieme Potenza: Dato un insieme A, calcola P(A) = insieme di tutti i suoi sottoinsiemi. Esempio: P({1, 2}) = {{}, {1}, {2}, {1, 2}}

// function parti(A){
//     let p = {...A}

//     unione(p, {})

//     for(let elemento in A){
//         p[elemento] = 
//     }
// }

// console.log(parti({a:1, b:2}))

// function partizione(arr){

//     arrayToMultiinsieme(arr)
//     if(sottoinsieme())

// }

// let a = [{0:1, 1:2}, {x:x, y:y}]

function analisi(foo,d,c){
    function sottoinsieme(A,B){
    for(let elemento in A){
        if(!(elemento in B))
            return false
        return true
    }
        
    return true
}
    function iniettiva(foo,d,c){

        let counter = {}
        let key = 0;
        for(let elemento in d){
            key = foo(elemento)
            if(key in counter)
                counter.key += 1 
            else
                counter[key] = 1
        }

        for(let elemento in counter){
            if(counter[elemento] > 1)
                return false
            else 
                return true
        }
        
    }

    function suriettiva(foo,d,c){
        let imm = {}

        for(let elemento in d){
            imm[elemento] = foo(d[elemento])
        }
        return sottoinsieme(imm,c) && sottoinsieme(c,imm) ? true : false
        
    }

    let res = {suriettiva: suriettiva(foo,d,c), iniettiva: iniettiva(foo,d,c), invertibile: (suriettiva(foo,d,c) && iniettiva(foo,d,c))}
    return res
}

let M = {1: true, 2: true, 3: true}
let S = {2: true, 4: true, 6: true, 8: true}

console.log(analisi(x => x * 2, M,S))

