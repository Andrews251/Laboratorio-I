/*
Si scriva una funzione sommaRepdigit(A, b) che, ricevuto un array di numeri naturali A e una base

, restituisca la somma di tutti i numeri in A la cui rappresentazione in base b è un repdigit, cioè è composta da una sola cifra ripetuta (ad esempio 222 in base 3, o 1111 in base 2).


Esempi:

sommaRepdigit([26, 40, 15, 13], 3) → 79

26 in base 3 è 222 (repdigit), 40 in base 3 è 1111 (repdigit), 15 in base 3 è 120 (non repdigit), 13 in base 3 è 111 (repdigit).

sommaRepdigit([7, 10, 15], 2) → 22
sommaRepdigit([5, 12, 18], 5) → 30


Nota:

- Ogni numero di una singola cifra (0-9) è per definizione un repdigit.

- Non è consentito l'uso di metodi predefiniti per la conversione di base (come toString(b) o parseInt). La conversione deve essere implementata tramite l'algoritmo delle divisioni successive visto a lezione.


Come prassi, commentate opportunamente la funzione.
*/

//codice

function sommaRepdigit(A,b){
    let sum = 0
    
    function divisione(a){
        let arr = []
        //let i = 0
        while(a >= b){
            //a = Math.floor(a/b) qui sto semplicemente modificando il valore effettuando una divisone intera, ma senza ottenere alcun resto
            arr.push(a%b) //inserisco nell'array di verifica, il resto della divisione
            a = Math.floor(a/b) //ora posso modificare il valore per la divisone successiva
            //i++, ho inserito i ma non lo sto usando, quindi è una variabile inutile
        }
        //console.log(arr)
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
        // else
        //     continue -> inserire questo else {continue} è inutile, se il controllo non viene superato, si andrà comunque all'elemento successivo
    }
    return sum
}

//test case
// var assert = require('assert');
// assert.strictEqual(sommaRepdigit([26, 40, 15, 13], 3), 79);

//console.log(sommaRepdigit([26, 40, 15, 13], 3))

/*
Un oggetto "task" è descritto dai seguenti campi: , , (un numero intero da 1 a 5, dove 5 è la massima priorità),

(un array di stringhe che rappresentano gli id di altri task).


Si scriva una funzione comparatoreTask(criterio, ascendente) che, dato un criterio di ordinamento (stringa) e una direzione (booleano), restituisca una funzione di comparazione utilizzabile con sort().


Il parametro criterio può assumere i seguenti valori:

- "dipendenze": ordina per numero di dipendenze

- "priorita": ordina per priorità

- "id": ordina alfabeticamente per id


Il parametro ascendente (booleano) determina la direzione dell'ordinamento:

- true: ordine ascendente/crescente (default)

- false: ordine discendente/decrescente


Se il criterio non è specificato, si applica il criterio "dipendenze" come default.

Se ascendente non è specificato, si assume true.


Come prassi, commentate opportunamente la funzione.
*/

function comparatoreTask(criterio = 'dipendenze',ascendente = true){ //modificato criterio, poiché il problema specifica che se non abbiamo criterio allora 'dipendenze' è il caso di default

    function compareFn(a,b){ //qui non è necessario dover creare una funzione dentro una funzione, basta creare due variabili (le variabili della comparefn) e poi fare semplicemenete return
        if(criterio === 'dipendenze'){
            if(ascendente)
                return a.dipendenze.length - b.dipendenze.length //uso .length poiché devo ordinare per #dipendenze ovvero dipendenze.length
            else
                return b.dipendenze.length - a.dipendenze.length //b[0] - a[0], questa cosa non fa assolutamente niente, è il tentativo di accesso al primo indice ma senza nessuna utilità

            //posso scrivere tutto questo come return ascendente? (a.dipendenze.length - b.dipendenze.length) : b.dipendenze.length - a.dipendenze.length
        }

        if(criterio === 'priorita'){
            if(ascendente){
                return a.priorita - b.priorita //qui mancava la specifica della proprietà ovvero a.priorita
            }
            else 
                return b.priorita - a.priorita

            //posso scrivere tutto questo come return ascendente? a.priorita - b.priorita : b.priorita - a.priorita
        }

        if(criterio === 'id'){
            if(ascendente)
                return b.id.localeCompare(a) //la logica è corretta ma anche qui manca la proprietà
            else 
                return a.id.localeCompare(b)

            //posso scrivere tutto questo come return ascendente? b.id.localeCompare(a) : a.id.localeCompare(b)
        }
        
    
        
    }
    return compareFn //basterebbe solo return senza creare un'altra funzione al suo interno
}

//test case

// var assert = require('assert')
// assert.deepStrictEqual(
//     [{titolo: "Setup", id: "T1", priorita: 3, dipendenze: []}, {titolo: "Design", id: "T2", priorita: 5, dipendenze: ["T1"]}, {titolo: "Code", id: "T3", priorita: 4, dipendenze: ["T1", "T2"]}, {titolo: "Test", id: "T4", priorita: 2, dipendenze: ["T3"]}, {titolo: "Deploy", id: "T5", priorita: 1, dipendenze: ["T3", "T4", "T2"]}].sort(comparatoreTask()).map(t => t.id),
//     ["T1", "T2", "T4", "T3", "T5"]
// );


/*
Sia A un array di insiemi, ciascuno dei quali realizzato come visto a lezione.


Si scriva una funzione unioneParziale(A, n) che restituisca l'insieme di tutti gli elementi che compaiono in al più
insiemi diversi presenti in A, con

.


Esempio:


Si abbia cura di trattare anche il caso limite.


Come prassi, commentate opportunamente la funzione.

*/


//scrivi il codice

function unioneParziale(A,n){

    let unito = {} //contiene gli elementi di tutti gli insiemi di A
    let res = {} //contiene il risultato
    for(let i = 0; i < A.length; i++){
        for(let j in A[i]){
            if(j in unito)
                unito[j] += 1
            else
                unito[j] = 1
        }
    }
    //console.log(unito)
    for(let i in unito){
        if(unito[i] <= n)
            res[i] = unito[i]
    }
        
    return res
}

let A = [{a:true,b:true},{b:true,c:true},{a:true,c:true,d:true}]
console.log(unioneParziale(A,3))
/*
Si scriva una funzione ricorsiva contaFLista(head, f) che, ricevuta una lista concatenata (implementata come visto a lezione) e un predicato sui nodi della lista, restituisca il numero dei valori dei nodi per i quali il predicato vale . La funzione deve restituire se nessuno dei valori dei nodi soddisfa il predicato

.


Il predicato

è una funzione che prende in input un nodo della lista e restituisce un valore booleano.


Esempi:

head = [ 5 → 4 → 12 → null ]
contaFLista(head, (node) => (node.val % 2 == 0)) → 2

, quindi il totale è 2.

head = [ 3 → 7 → 9 → null ]
contaFLista(head, (node) => (node.val > 5)) → 2


Nota: Se la lista contiene un nodo il cui campo

non è un numero intero, la funzione deve interrompersi e restituire il risultato calcolato fino a quel punto (escluso).


Come prassi, commentate opportunamente la funzione.


*/

function contaFLista(head,f,n = 0){
    if(head == null)
        return 0
    if(Number.isInteger(head.val) && f(head)){ //controlli f(head) e non f(head.val) poiché alla funzione viene passato esplicitamente node.val
        return 1 + contaFLista(head.next,f,n) //basta semplicemente sommare 1 alla chiamata ricorsiva e risolvi il problema
    }
    else
        return contaFLista(head.next,f,n)
}

// var assert = require('assert')
// assert.strictEqual(
//     contaFLista({val: 5, next: {val: 4, next: {val: 12, next: null}}}, (node) => (node.val % 2 == 0)),
//     2
// );

// assert.strictEqual(
//     contaFLista({val: 3, next: {val: 7, next: {val: 9, next: null}}}, (node) => (node.val > 5)),
//     2
// );