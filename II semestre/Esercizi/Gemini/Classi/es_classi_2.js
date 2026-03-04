import assert from "assert";

class AlberoSbilanciatoError extends Error {}

class NodoBinario{
    #valore
    #sinistro = null
    #destro = null
    constructor(valore){
        if(typeof valore !== "number" || Number.isNaN(valore))
            throw new TypeError();
        this.#valore= valore;
    }
    get valore(){
        return this.#valore;
    }
    get sinistro(){
        return this.#sinistro;
    }
    get destro(){
        return this.#destro;
    }
    set sinistro(nodo){
        if(!(nodo instanceof NodoBinario) && nodo !== null)
            throw new TypeError();

        this.#sinistro = nodo

    }
    set destro(nodo){
        if(!(nodo instanceof NodoBinario) && nodo !== null)
            throw new TypeError();
        this.#destro = nodo
    }
    produttoriaLivello(k){
        if(!(Number.isInteger(k)) || k < 0)
            throw new TypeError();
        let res = 1

        if(k === 0)
            return this.#valore
        if(this.#sinistro !== null)
            res *= this.#sinistro.produttoriaLivello(k-1)
        if(this.#destro !== null)
            res *= this.#destro.produttoriaLivello(k-1)

        return res
    }
    *sommatoriaPercorsi(){

        if(this.#sinistro === null && this.#destro === null)
            yield this.#valore
        if(this.#sinistro !== null){
            for(let i of this.#sinistro.sommatoriaPercorsi()){
                 yield this.#valore + i
            }
        }
        if(this.#destro !== null){
            for(let i of this.#destro.sommatoriaPercorsi()){
                yield this.#valore + i
            }
        }

    }
    #calcoloAltezza(nodo){

        if(nodo === null)
            return -1
        let hsx = this.#calcoloAltezza(nodo.sinistro)
        let hdx = this.#calcoloAltezza(nodo.destro)
        if(Math.abs(hdx - hsx) > 1)
            throw new AlberoSbilanciatoError()
        return 1 + Math.max(hsx,hdx)
    }
    verificaBilanciamento(){
        this.#calcoloAltezza(this)
        return true
    }
}


console.log("--- INIZIO TEST ESERCIZIO 4 (ALBERI) ---");

// 1. Creazione base e validazione valore
let radice = new NodoBinario(10);
assert.strictEqual(radice.valore, 10, "Test 1 Fallito: Valore radice errato");
assert.throws(() => new NodoBinario("dieci"), TypeError, "Test 1.1 Fallito: Valore non numerico non lancia TypeError");

// 2. Inserimento figli e validazione tipo
let sx = new NodoBinario(2);
let dx = new NodoBinario(5);
radice.sinistro = sx;
radice.destro = dx;
assert.strictEqual(radice.sinistro.valore, 2, "Test 2 Fallito: Assegnazione figlio sinistro fallita");
assert.throws(() => { radice.destro = { valore: 5 } }, TypeError, "Test 2.1 Fallito: Oggetto letterale non lancia TypeError");

// 3. Costruzione albero complesso per i calcoli
sx.sinistro = new NodoBinario(3);
sx.destro = new NodoBinario(4);
dx.destro = new NodoBinario(1);
// Livelli:
// 0: 10
// 1: 2, 5
// 2: 3, 4, 1

// 4. Produttoria di livello valida
assert.strictEqual(radice.produttoriaLivello(0), 10, "Test 4.1 Fallito: Produttoria livello 0 errata");
assert.strictEqual(radice.produttoriaLivello(1), 10, "Test 4.2 Fallito: Produttoria livello 1 errata (2 * 5)");
assert.strictEqual(radice.produttoriaLivello(2), 12, "Test 4.3 Fallito: Produttoria livello 2 errata (3 * 4 * 1)");

// 5. Produttoria su livello inesistente (elemento neutro)
assert.strictEqual(radice.produttoriaLivello(5), 1, "Test 5 Fallito: Produttoria su livello vuoto deve restituire 1");

// 6. Produttoria validazione input
assert.throws(() => radice.produttoriaLivello(-1), TypeError, "Test 6 Fallito: Livello negativo non lancia TypeError");

// 7. Sommatoria percorsi (Generatore)
// Percorsi: 10-2-3 (somma 15), 10-2-4 (somma 16), 10-5-1 (somma 16)
let somme = [...radice.sommatoriaPercorsi()];
assert.strictEqual(somme.length, 3, "Test 7.1 Fallito: Numero di percorsi errato");
assert.ok(somme.includes(15) && somme.includes(16), "Test 7.2 Fallito: Somme dei percorsi errate");

// 8. Verifica bilanciamento - Albero bilanciato
assert.strictEqual(radice.verificaBilanciamento(), true, "Test 8 Fallito: Falso positivo per albero sbilanciato");

// 9. Verifica bilanciamento - Albero sbilanciato
let sbilanciato = new NodoBinario(1);
sbilanciato.destro = new NodoBinario(2);
sbilanciato.destro.destro = new NodoBinario(3);
assert.throws(() => sbilanciato.verificaBilanciamento(), AlberoSbilanciatoError, "Test 9 Fallito: AlberoSbilanciatoError non lanciato");

// 10. Assegnazione di null
sbilanciato.destro.destro = null;
assert.strictEqual(sbilanciato.verificaBilanciamento(), true, "Test 10 Fallito: L'assegnazione a null non ricalcola correttamente la struttura");

console.log("✅ Tutti i test dell'Esercizio 4 sono passati con successo!");



//ESERCIZIO 5

class CicloRilevatoError extends Error {}

class GrafoPonderato{
    #nNodi
    #grafo = []
    constructor(nNodi) {
        if(!(Number.isInteger(nNodi)) || nNodi <= 0)
            throw new TypeError();
        this.#nNodi = nNodi;
    }
    aggiungiArco(da,a,peso){
        if(da < 0 || da > this.#nNodi - 1 || a < 0 || a > this.#nNodi - 1 || typeof peso !== "number")
            throw new TypeError();
        if(this.#grafo[da] === undefined)
            this.#grafo[da] = new Map()
        this.#grafo[da].set(a,peso)
    }
    sommatoriaPesiUscenti(nodo){
        let sum = 0
        if(nodo < 0 || nodo > this.#nNodi - 1 )
            throw new TypeError();
        if(this.#grafo[nodo] === undefined)
            return 0
        for(let i of this.#grafo[nodo].values()){
            sum += i
        }
        return sum
    }
    *#trovaPercorsi(corrente,destinazione,visitati){
        visitati.add(corrente)
        if(corrente === destinazione){
            yield 0
            visitati.delete(corrente)
            return
        }

        if(this.#grafo[corrente] !== undefined){
            for(let [key, peso] of this.#grafo[corrente].entries()){
                if(!(visitati.has(key))){
                    for(let costo of this.#trovaPercorsi(key,destinazione,visitati)){
                        yield peso + costo
                    }
                }
            }
        }
        visitati.delete(corrente)
    }
    *costoPercorsiSenzaCicli(partenza,destinazione){
        if(partenza < 0 || partenza > this.#nNodi - 1 || destinazione < 0 || destinazione > this.#nNodi - 1)
            throw new TypeError();
        let visitati = new Set()
        yield* this.#trovaPercorsi(partenza,destinazione,visitati);
    }
    #esploraCiclo(corrente, visitati){
        visitati.add(corrente)
        if(this.#grafo[corrente]){
            for(let vicino of this.#grafo[corrente].keys()){
                if(visitati.has(vicino))
                    throw new CicloRilevatoError()
                this.#esploraCiclo(vicino,visitati)
            }
        }
        visitati.delete(corrente)
    }
    verificaAciclicita(){
        for(let i = 0; i < this.#nNodi;i++){
            let visitati = new Set()
            this.#esploraCiclo(i,visitati)
        }
        return true
    }
}





console.log("--- INIZIO TEST ESERCIZIO 5 (GRAFI) ---");

// 1. Creazione e Validazione Nodi
let grafo = new GrafoPonderato(4); // Nodi da 0 a 3
assert.throws(() => new GrafoPonderato(0), TypeError, "Test 1 Fallito: nNodi <= 0 non lancia TypeError");

// 2. Inserimento Archi Validi
grafo.aggiungiArco(0, 1, 10);
grafo.aggiungiArco(0, 2, 5);
grafo.aggiungiArco(1, 3, 20);
grafo.aggiungiArco(2, 3, 15);
assert.ok(grafo !== undefined, "Test 2 Fallito: Errore durante inserimento archi validi");

// 3. Inserimento Archi Invalidi
assert.throws(() => grafo.aggiungiArco(0, 4, 10), TypeError, "Test 3.1 Fallito: Nodo inesistente non lancia TypeError");
assert.throws(() => grafo.aggiungiArco(1, 2, "dieci"), TypeError, "Test 3.2 Fallito: Peso non numerico non lancia TypeError");

// 4. Sovrascrittura Arco
grafo.aggiungiArco(0, 2, 8); // Aggiorno il peso
assert.ok(true, "Test 4 Fallito"); // Se non crasha, va bene (il check vero lo facciamo con la sommatoria)

// 5. Sommatoria Pesi Uscenti
assert.strictEqual(grafo.sommatoriaPesiUscenti(0), 18, "Test 5.1 Fallito: Sommatoria pesi uscenti errata (10 + 8)");
assert.strictEqual(grafo.sommatoriaPesiUscenti(3), 0, "Test 5.2 Fallito: Sommatoria per nodo pozzo deve essere 0");

// 6. Sommatoria Pesi Nodo Invalido
assert.throws(() => grafo.sommatoriaPesiUscenti(99), TypeError, "Test 6 Fallito: Sommatoria su nodo inesistente non lancia TypeError");

// 7. Generatore Percorsi Semplici (Costi)
// Percorso 1: 0 -> 1 -> 3 (peso 10 + 20 = 30)
// Percorso 2: 0 -> 2 -> 3 (peso 8 + 15 = 23)
let costi = [...grafo.costoPercorsiSenzaCicli(0, 3)];
assert.strictEqual(costi.length, 2, "Test 7.1 Fallito: Numero di percorsi trovati errato");
assert.ok(costi.includes(30) && costi.includes(23), "Test 7.2 Fallito: Costo dei percorsi calcolato male");

// 8. Generatore senza percorsi possibili
let costiImpossibili = [...grafo.costoPercorsiSenzaCicli(3, 0)];
assert.strictEqual(costiImpossibili.length, 0, "Test 8 Fallito: Trovati percorsi inesistenti");

// 9. Verifica Aciclicità (Grafo senza cicli)
assert.strictEqual(grafo.verificaAciclicita(), true, "Test 9 Fallito: Rilevato ciclo inesistente");

// 10. Verifica Aciclicità (Grafo con ciclo)
grafo.aggiungiArco(3, 0, 50); // Crea il ciclo 0 -> 1 -> 3 -> 0
assert.throws(() => grafo.verificaAciclicita(), CicloRilevatoError, "Test 10 Fallito: Ciclo non rilevato (CicloRilevatoError mancante)");

console.log("✅ Tutti i test dell'Esercizio 5 sono passati con successo!");