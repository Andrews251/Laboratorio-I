function comparatoreTask(criterio="dipendenze",ascendente = true){

    function compareFn(a,b){
        if(criterio === 'dipendenze'){
            if(ascendente)
                return a.dipendenze.length - b.dipendenze.length
            else 
                return b.dipendenze.length - a.dipendenze.length
        }

        if(criterio === 'priorita'){
            if(ascendente){
                return a.priorita - b.priorita
            }
            else 
                return b.priorita - a.priorita
        }

        if(criterio === 'id'){
            if(ascendente)
                return b.id.localeCompare(a.id)
            else 
                return a.id.localeCompare(b.id)
        }
        
    
        
    }
    return compareFn
}

//console.log([{titolo: "Setup", id: "T1", priorita: 3, dipendenze: []}, {titolo: "Design", id: "T2", priorita: 5, dipendenze: ["T1"]}, {titolo: "Code", id: "T3", priorita: 4, dipendenze: ["T1", "T2"]}, {titolo: "Test", id: "T4", priorita: 2, dipendenze: ["T3"]}, {titolo: "Deploy", id: "T5", priorita: 1, dipendenze: ["T3", "T4", "T2"]}].sort(comparatoreTask()).map(t => t.id))


function sommaRepdigit(A,b){
    let sum = 0
    let arr = []

    function divisione(a){
        let i = 0
        while(a > 0){
            arr.push(a%b)
            a = Math.floor(a/b)
        }
        
        // for(let i = 0; i < arr.length; i++){
        //     for(let j = 1; j < arr.length; j++){
        //         if(arr[i] != arr[j])
        //             return false
        //     }
        // }

        return new Set(arr).size > 1
    }
    for(let i = 0; i < A.length; i++){
        
        while(A[i] > 0){
            arr.push
        }
        if(divisione(A[i]))
            sum += A[i]
    }
    return sum
}

console.log(sommaRepdigit([26, 40, 15, 13], 3))