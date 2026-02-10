//ESERCIZIO 1

function sommaRepdigit(A,b){
    let sum = 0
    
    function divisione(a){
        let arr = []
    
        while(a >= b){
            arr.push(a%b)
            a = Math.floor(a/b)
        }
    
        for(let i = 0; i < arr.length; i++){
            for(let j = 1; j < arr.length; j++){
                if(arr[i] != arr[j])
                    return false
            }
        }

        return true
    }

    for(let i = 0; i < A.length; i++){
        if(divisione(A[i]))
            sum += A[i]
    }

    return sum
}


//ESERCIZIO 2

function comparatoreTask(criterio = 'dipendenze',ascendente = true){

    let a,b

    if(criterio === 'dipendenze')
        return ascendente? (a.dipendenze.length - b.dipendenze.length) : b.dipendenze.length - a.dipendenze.length   
    
    if(criterio === 'priorita')
        return ascendente? a.priorita - b.priorita : b.priorita - a.priorita
        
    if(criterio === 'id')
        return ascendente? b.id.localeCompare(a) : a.id.localeCompare(b)

}

//ESERCIZIO 3

function unioneParziale(A,n){

    let unito = {}
    let res = {}
    for(let i = 0; i < A.length; i++){
        for(let j in A[i]){
            if(j in unito)
                unito[j] += 1
            else
                unito[j] = 1
        }
    }
    for(let i in unito){
        if(unito[i] <= n)
            res[i] = unito[i]
    }
        
    return res
}

//ESERCIZIO 4

function contaFLista(head,f,n = 0){
    if(!head)
        return 0
    if(Number.isInteger(head) && f(head)){
        return 1 + contaFLista(head.next,f,n)
    }
    else
        return contaFLista(head.next,f,n)
}