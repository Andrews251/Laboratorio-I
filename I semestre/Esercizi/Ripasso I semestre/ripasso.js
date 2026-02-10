M = {1: 1, 2: 2, 3: 3, 4: 4}

function filteredSet(S,p){
    let A = {};

    for(let elemento in S){
        if(p(S[elemento])){
            A[elemento] = S[elemento]
        }
    }
    return A;
}
let res = filteredSet(M, a => a%2 === 0)
//console.log(res)

function ksumlimit(p,k,...n){
    let res = []
    let tmp = 0
    let i = 0
    while(tmp < k){
        if(n[i] > p){
            tmp += n[i];
        }
        res.push(n[i])
        i++
    }
    return res
}

let c = ksumlimit(3,20,5,10,4,6,1,3)

console.log(c)


function prodEstremi(A){
    let b = [...A]
    let res = []
    b.sort((a,b) => a-b)

    for(let i in b){
        res.push(b[i] * b[b.length-i-1])
    }
return res
}







