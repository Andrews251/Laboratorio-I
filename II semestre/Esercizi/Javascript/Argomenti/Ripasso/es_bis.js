let treeVal = {
    val: 2,
    sx: {
        val: 4,
        sx: {
            val: 13,
            sx: null,
            dx: null,
        },
        dx: {
            val: 6,
            sx: {
                val: 8,
                sx: null,
                dx: null,
            },
            dx: null,
        }
    },
    dx:{
        val: 9,
        sx: {
            val: 2,
            sx: null,
            dx: {
                val: 8,
                sx: null,
                dx: {
                    val: 18,
                    sx: {
                        val: 16,
                        sx: null,
                        dx: null,
                    },
                    dx: {
                        val: 12,
                        sx: null,
                        dx: null,
                    }
                }
            }
        },
        dx: null,
    }
}

let tree = {
    val: "a",
    sx: {
        val: "b",
        sx: {
            val: "d",
            sx: null,
            dx: null,
        },
        dx: {
            val: "e",
            sx: {
                val: "h",
                sx: null,
                dx: null,
            },
            dx: null,
        }
    },
    dx:{
        val: "c",
        sx: {
            val: "f",
            sx: null,
            dx: {
                val: "i",
                sx: null,
                dx: {
                    val: "j",
                    sx: {
                        val: "k",
                        sx: null,
                        dx: null,
                    },
                    dx: {
                        val: "l",
                        sx: null,
                        dx: null,
                    }
                }
            }
        },
        dx: null,
    }
}



function indiceMultiplo(A,k){
    if(k < 0 )
        return []
    let res = []
    if(A[0]%k === 0)
        res.push(A[0])
    let i = 1
    while((i * k) <= A.length - 1){
        if(A[i*k] % k === 0){
            res.push(A[i*k])
        }
        i = i + 1
    }
    console.log(res.length)
    if(res.length > 1)
        return [res[0], res[res.length - 1]]
    else
        return [res[0], res[0]]
}

b = [3,4,5,4,12,7,5]

//console.log(indiceMultiplo(b,3))

function lrleaf1(t){
    let l,r
    if(t.sx === null && t.dx === null)
        return t.val
    if(t.sx)
        return t.val + lrleaf(t.sx)
    else
        return t.val + lrleaf(t.dx)
}

function lrleaf(t,l,r){


    if(t[l])
        return t.val + lrleaf(t[l],l,r)
    else
        if(t[r])
            return t.val + lrleaf(t[r],l,r)
    else
        return t.val

}
function lrleafret(t){
    return [lrleaf(t,"sx","dx"), lrleaf(t,"dx","sx")]
}

//console.log(lrleafret(tree))


function tagliaRami(T,v){
    if(Number.isInteger(v) === false || v === 0)
        return null
    if(T.sx == null && T.dx == null)
        return T
    if(T.val % v === 0 && (T.val * v) > 0){
        T.sx = null
        T.dx = null
    }
    else{
        let sinistra = tagliaRami(T.sx,v)
        let destra = tagliaRami(T.dx,v)
    }
}

console.log(tagliaRami(treeVal, 3))
