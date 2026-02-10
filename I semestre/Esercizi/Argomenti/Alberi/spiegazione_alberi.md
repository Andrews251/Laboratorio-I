
*  RIASSUNTO UNICO — ARRAY, ABR (BST) e GRAFI

1) ARRAY – PROPRIETÀ length

let a = [10, 20, 30];

// .length legge la lunghezza dell’array
console.log(a.length); // 3

// Se la MODIFICHI, cambi davvero il contenuto dell’array:

a.length = 2;          // tronca l’array
console.log(a);        // [10, 20]

a.length = 4;          // allunga l’array, creando "buchi"
console.log(a);        // [10, 20, <empty>, <empty>]

/*
Questo è collegato al concetto di ARRAY SPARSI:
- un array può avere "buchi" (posizioni vuote/undefined)
  */

2) ARRAY – METODO includes()
*    (argomento: ARRAY, usato nei GRAFI)

let arr = [2, 5, 7];

// includes(valore) → true se valore è presente nell’array
console.log(arr.includes(5));  // true
console.log(arr.includes(10)); // false


NEL CONTESTO DEI GRAFI (liste di adiacenza):

gL[i] è un array che contiene i nodi adiacenti a i.

Per vedere se c’è un arco i → j:
gL[i].includes(j)
*/



3) ARRAY – METODO reduce()
    (argomento: ARRAY)


let nums = [1, 2, 3, 4];

// reduce(callback, valoreIniziale)
// callback(accumulatore, elementoCorrente)
let somma = nums.reduce((acc, x) => acc + x, 0);
console.log(somma); // 10


reduce "riduce" un array a UN SOLO valore:
- somma, prodotto, oggetto accumulato, ecc.



4) ARRAY – Operatore SPREAD (...)
(argomento: ARRAY, sintassi)


let base = [1, 2, 3];

// Copiare / estendere un array:
let esteso = [0, ...base, 4];
// esteso = [0, 1, 2, 3, 4]

// Usare un array come lista di argomenti di una funzione:
function somma3(x, y, z) {
return x + y + z;
}

console.log(somma3(...base)); // 6 (1+2+3)


SPREAD sugli array:
- "spacchetta" gli elementi dove servono (in un nuovo array, in una funzione, ecc.)
  */


5) ARRAY – DESTRUTTURAZIONE, (argomento: ARRAY)

let dati = [10, 20, 30];

Assegnamento normale via destrutturazione:
let [p, q] = dati;      // p = 10, q = 20
let [x, , z] = dati;    // x = 10, z = 30 (salta l’elemento in mezzo)

Valori di default:
let unSoloValore = [10];
let [u = 0, v = 5] = unSoloValore;
u = 10 preso dall’array, v = 5 (default, perché non c’è unSoloValore[1])

// Rest sulla destrutturazione di array:
let [first, ...rest] = [1, 2, 3, 4];
// first = 1
// rest = [2, 3, 4]

/*
DESTRUTTURAZIONE di array:
- assegna gli elementi dell’array a variabili singole
- puoi usare default
- puoi raccogliere il "resto" in un altro array con ...
  */


/****************************************************
* 6) FUNZIONI – Parametri REST (...args)
*    (argomento: FUNZIONI, ma collegato agli ARRAY)
     ****************************************************/

function f(p1, p2, ...args) {
console.log("p1:", p1);
console.log("p2:", p2);
console.log("args (array):", args);
}

f(1, 2, 3, 4, 5);
// p1 = 1
// p2 = 2
// args = [3, 4, 5]

/*
I parametri REST:
- ...args raccoglie TUTTI i parametri extra in un ARRAY.
- La funzione può ricevere un numero variabile di parametri.
  */


/****************************************************
* 7) ARRAY COME OGGETTI
*    (argomento: ARRAY + concetto di OGGETTO)
     ****************************************************/

let b = [1, 2, 3];

// Essendo un oggetto, posso aggiungere una proprietà "normale":
b.pippo = "ciao";

console.log(b);       // [1, 2, 3]
console.log(b.pippo); // "ciao"

/*
ATTENZIONE:
- Di solito NON si usano proprietà "strane" sugli array.
- Serve solo per capire che in JS gli array sono oggetti con:
    - chiavi numeriche speciali (0,1,2,...)
    - più eventuali proprietà aggiuntive
      */


/****************************************************
* 8) ABR / BST – CONCETTO BASE
*    (argomento: ABR — Alberi Binari di Ricerca)
     ****************************************************/

/*
DEFINIZIONE (stile Cormen, quella citata a lezione):

Un albero binario è un ALBERO BINARIO DI RICERCA (ABR / BST) se,
per OGNI nodo X:

- tutti i nodi nel sottoalbero SINISTRO di X hanno valore
  <= del valore di X
- tutti i nodi nel sottoalbero DESTRO di X hanno valore
  >= del valore di X

(L’esercizio/slide può specificare se gli uguali vanno sempre a sinistra o a destra.)

STRUTTURA TIPICA IN JS (come visto a lezione):
{
val: valoreDelNodo,
sx:  sottoalberoSinistro (o null),
dx:  sottoalberoDestro (o null)
}
*/

// Esempio di nodo ABR:
let nodo = {
val: 10,
sx: null,  // sottoalbero sinistro
dx: null   // sottoalbero destro
};

// Esempio (molto semplice) di funzione che controlla la proprietà ABR:
/*
Nota: è solo uno schema, NON è preso letteralmente a lezione,
ma rispecchia il concetto spiegato (bisogna "visitare tutto l’albero").
*/
function isBST(t, min = -Infinity, max = Infinity) {
if (!t) return true;
if (t.val < min || t.val > max) return false;
return isBST(t.sx, min, t.val) && isBST(t.dx, t.val, max);
}

/*
Idea che coincide con quello che dice il prof:
- Per verificare che un albero sia ABR, bisogna controllare tutti i nodi.
  */


/****************************************************
* 9) GRAFI – LISTE DI ADIACENZA (array + oggetti)
*    (argomento: GRAFI + ARRAY)
     ****************************************************/

/*
Rappresentazione con LISTE DI ADIACENZA:
- Uso un OGGETTO
- Ogni chiave è l’ID di un nodo
- Ogni valore è un ARRAY con gli ID dei nodi adiacenti
  */

let gL = {
0: [1, 2],    // dal nodo 0 esistono archi verso 1 e 2
1: [0],       // dal nodo 1 esiste arco verso 0
2: [0, 3],    // ecc.
3: [2]
};

// Funzione che controlla se fra i e j c’è un ARCO BIDIREZIONALE
// (esempio visto a lezione: usa includes sugli array)

function arcoBidirezionaleLista(gL, i, j) {
return gL[i].includes(j) && gL[j].includes(i);
}

/*
- gL[i].includes(j) → true se i → j
- gL[j].includes(i) → true se j → i
- Il && richiede che esistano ENTRAMBI (grafo "non orientato" visto come due archi opposti).
  */


/****************************************************
* 10) GRAFI – MATRICE DI ADIACENZA (array di array)
*     (argomento: GRAFI + ARRAY)
****************************************************/

/*
Rappresentazione con MATRICE DI ADIACENZA:
- Un array di array
- GM[riga][colonna] = 1 se esiste l’arco (riga → colonna), 0 altrimenti
  */

let GM = [
/*      0  1  2   (colonne)
* 0 */ [0, 1, 0],
* 1 */ [1, 0, 1],
* 2 */ [0, 1, 0]
  ];

console.log(GM[0][1]); // 1 → esiste arco 0 → 1
console.log(GM[1][2]); // 1 → esiste arco 1 → 2

// Controllo ARCO BIDIREZIONALE usando la matrice:
function arcoBidirezionaleMatrice(GM, i, j) {
return GM[i][j] && GM[j][i];
}

/*
Nei GRAFI NON ORIENTATI:
- la matrice di adiacenza è SIMMETRICA:
  GM[i][j] = GM[j][i]
- in teoria potresti memorizzare solo metà matrice
  (gli elementi sopra o sotto la diagonale).
  */


/****************************************************
* 11) NOTE FINALI SU GRAFI (riassunto veloce)
      ****************************************************/

/*
- LISTA DI ADIACENZA (oggetto + array):
  gL[idNodo] = [lista dei vicini]
  Vantaggi:
    * occupa poco spazio se il grafo è SPARSO
    * comoda per iterare su tutti i vicini di un nodo
      Svantaggi:
    * per cercare se esiste un arco i → j devo fare una ricerca
      (es. includes, o un ciclo)

- MATRICE DI ADIACENZA (array di array):
  GM[i][j] = 0 o 1
  Vantaggi:
    * accesso O(1) per sapere se i → j
      Svantaggi:
    * spreca spazio se il grafo è poco connesso
      */


/****************************************************
* FINE RIASSUNTO
  ****************************************************/
