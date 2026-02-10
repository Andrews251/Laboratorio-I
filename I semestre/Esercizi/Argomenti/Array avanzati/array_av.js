let arr = [1,2,3,4] //array di esempio

function len(a){ //restituisce la lunghezza dell'array in maniera ricorsiva come lista len[testa, ...resto]
    let [t, ...r] = a
    if(t === undefined)
        return 0
    return 1 + len(r)
}
//console.log(len(arr))
//p = (a) => a%2 === 0;

//console.log(arr.filter(p))

//console.log(arr.reduce((a,b)=>a-b, 0))
//console.log(arr.reduceRight((a,b)=>a-b, 0))

//Scrivere una funzione JavaScript math che prende come primo parametro un
// operatore (stringa) e poi un numero indefinito di operandi (numeri), e applica
// l’operazione agli operandi, in sequenza. L’operatore può essere uno tra: '+',
// '-', '*', '/'

function math(op, ...args){
    switch (op){
        case '+':
            return args.reduce((a,b)=>a + b, 0)
        case '-':
            return args.reduce((a,b)=>a - b, 0)
        case '*':
            return args.reduce((a,b)=>a * b, 0)
        case '/':
            return args.reduce((a,b)=>a / b, 0)
    }
}
//console.log(math('+',1,2,3,4,5))

//Scrivere una funzione fip(a,p) che, dato un array qualunque a, e un predicato p,
// modifichi a in modo che tutti gli elementi che non soddisfano il predicato p siano
// rimossi da a. Si curi di non lasciare “posti vuoti” in a.
let a = [3,5,10,1,4]
function fip(a,p){
    a = a.filter(p)
    return a
}
//console.log(fip(a,x=>x%2))

//Si scriva una funzione somma(n1, …, nk) che, ricevuti come argomento un
// numero qualunque di numeri, restituisca la loro somma.
function somma(...n){
    return n.reduce((a,b)=>a + b, 0)
}
//console.log(somma(10,5,-8,-7))


function isSorted(a){ //restituisce true se l'array è ordinato in maniera strettamente crescente
    function s(x,y,i,a){ //x = accumulatore, y = elemento corrente, i = indice, a = array
        if(i > 0){
            return y > a[i - 1] && x
        }
        return true
    }
    return a.reduce(s, true) // true passa il valore di default all'accumulatore per evitare undefined
}

//versione alternativa

function isSortedPro(a){
    // Se è l'indice 0 (true) OPPURE (accumulatore && condizione), perché in Js nell'OR se la prima condizione è vera non verifico la seconda
    return a.reduce((x, y, i, arr) => i === 0 || (x && y > arr[i-1]), true);
}

//console.log(isSorted([-21,-2,0,4,6,210]))
//console.log(isSorted([2,6,8,8,9,21]))

function deframmenta(a){
    return a.filter((x,i,arr)=> x === arr[i-1] || x === arr[i+1]) //uso filter perchè decido che elementi tenere e che elementi eliminare
}

// console.log(deframmenta([1,1,2,3,3,3,2,2,4]))
// console.log(deframmenta([0,0,0,0,0,1,0,1,1]))
// console.log(deframmenta([1,0]))

//Si scriva una funzione fabbrica() che abbia il seguente comportamento.
// Ogni volta che viene invocata, fabbrica(k) restituisce una funzione f tale che la
// chiamata f() restituisce (sempre) il valore k.


function fabbrica(k){
    return ()=>k
}
// var f=fabbrica(1)
// var g=fabbrica(2)
// var h=fabbrica(true)
//
// console.log(f(),g(),h())

//Si scriva una funzione partapply(bop,a) che, data una funzione bop con due
// argomenti, e un valore a, restituisca una funzione che, se invocata con un
// argomento b, ritorni il valore di bop(a,b). In altri termini:

function partapply(bop,a){
    return (b)=>bop(a,b)
}

var r = partapply((x,y)=>x + y,1)

//console.log(r(5))

//Si scriva una funzione reverse(a) che, dato un array a, restituisca un nuovo array
// contenente gli stessi elementi di a, ma in ordine inverso. La funzione reverse non deve
// modificare a.

function reverseItCicli(a){
    let arr = [...a]
    let j = 0
    for(let i=arr.length - 1; i > j; i--){
        [arr[i], arr[j]] = [arr[j], arr[i]]
        j++
    }

    return arr
}

function reverseItMetodi(a){
    let arr = [...a]
    return arr.reverse()
}

function reverseRec(a){
    let [t, ...r] = a
    if(a.length === 1 || a.length === 0)
        return a
    return reverseRec(r).concat(t)

}


let array = [1,2,3,4,34,65,1,3]

//console.log(reverseItCicli(array))
//console.log(reverseItMetodi(array))
//console.log(reverseRec(array))

// function funprop(f,p = true ){
//
//     let array = []
//     function s(a,b){
//         if(a > b)
//             return undefined
//         return array.filter((k,i,arr) => f(arr[i]) && p(arr[i]))
//     }
//     return s
// }
//
// //console.log(funprop(n=>2*n,n=>n%2===0)(4,6))
