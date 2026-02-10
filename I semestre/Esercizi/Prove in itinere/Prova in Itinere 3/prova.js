function prodottoCoppie(A,k){
    let res = 0

    if(k < 0)
        return undefined
    for(let i=0;i<A.length;i++){
        for(let j=i+1;j<A.length;j++){
            if(Number.isInteger(A[i]) && Number.isInteger(A[j])){
                let tmp = A[i] * A[j]
                if(tmp%k === 0)
                    res += 1
            }

        }
    }

    return res
}

//console.log(prodottoCoppie([2, 3, 5, 6], 6))



function visitaFunzioni(tree,v = 0){

    if(!tree)
        return v
    let res = visitaFunzioni(tree.sx,v)
    res = tree.val(res)
    res = visitaFunzioni(tree.dx,res)

    return res

}


console.log(visitaFunzioni({
    val: x => x + 2,
    sx: {val: x => x * 3, sx: null, dx: null},
    dx: {val: x => x - 1, sx: null, dx: null}
}, 5))





function filtraLista(head, count = 0){
    if(!head)
        return {lista: null, rimossi: 0}
    let res = filtraLista(head.next)
    if(head.val % 2 === 0){
        res.rimossi += 1
        return res
    }
    else {
        head.next = res.lista
        res.lista = head
        return res
    }
}

//console.log(JSON.stringify(filtraLista({val: 2, next: {val: 5, next: {val: 8, next: {val: 3, next: {val: 6, next: null}}}}})))