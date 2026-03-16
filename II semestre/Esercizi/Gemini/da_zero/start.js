import assert from 'assert'

class GestorePunteggi{
    #arr
    constructor(){
        this.#arr = []
    }
    aggiungi(punteggio){
        if(typeof punteggio !== "number" || punteggio < 0)
            throw new TypeError();
        this.#arr.push(punteggio);
    }
    media(){
        if(this.#arr.length === 0)
            return 0
        return this.#arr.reduce((a, b) => a + b)/this.#arr.length
    }
    rimuoviPeggiori(soglia){
        let c = this.#arr.length
        this.#arr = this.#arr.filter(x => x >= soglia)
        return c - this.#arr.length
    }
}

console.log("--- INIZIO TEST ESERCIZIO 0 ---");

// Test 1: Creazione base e array vuoto
let g = new GestorePunteggi();
assert.strictEqual(g.media(), 0, "Test 1 Fallito: La media di un gestore vuoto deve essere 0");

// Test 2: Inserimento corretto
g.aggiungi(10);
assert.strictEqual(g.media(), 10, "Test 2 Fallito: Inserimento singolo fallito o media errata");

// Test 3 e 4: Validazione input
assert.throws(() => g.aggiungi("dieci"), TypeError, "Test 3 Fallito: Input non numerico deve lanciare TypeError");
assert.throws(() => g.aggiungi(-5), TypeError, "Test 4 Fallito: Numero negativo deve lanciare TypeError");

// Test 5: Inserimento multiplo e calcolo media
g.aggiungi(20);
// Ora abbiamo [10, 20], la somma è 30, la media è 15
assert.strictEqual(g.media(), 15, "Test 5 Fallito: Calcolo della media su più elementi errato");

// Test 6: Rimozione a vuoto (nessun elemento sotto soglia)
let rimossi = g.rimuoviPeggiori(5);
assert.strictEqual(rimossi, 0, "Test 6 Fallito: Non doveva rimuovere alcun elemento (soglia 5)");

// Test 7: Rimozione effettiva
g.aggiungi(4); // L'array diventa [10, 20, 4]
rimossi = g.rimuoviPeggiori(10); // Deve rimuovere solo il 4 (strettamente minore di 10)
assert.strictEqual(rimossi, 1, "Test 7 Fallito: Doveva rimuovere esattamente 1 elemento");

// Test 8: Verifica stato dopo rimozione
assert.strictEqual(g.media(), 15, "Test 8 Fallito: L'array non è stato aggiornato correttamente dopo la rimozione");

// Test 9: Svuotamento array
rimossi = g.rimuoviPeggiori(50); // 50 è maggiore sia di 10 che di 20, li rimuove tutti e due
assert.strictEqual(rimossi, 2, "Test 9 Fallito: Doveva rimuovere tutti e 2 gli elementi rimasti");

// Test 10: Ritorno allo stato iniziale
assert.strictEqual(g.media(), 0, "Test 10 Fallito: L'array ora dovrebbe essere vuoto, la media deve tornare 0");

console.log("✅ Tutti i test sono passati con successo!");



