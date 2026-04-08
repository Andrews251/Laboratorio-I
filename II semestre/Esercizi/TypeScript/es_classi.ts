import assert from 'assert'

class CreditoEsauritoError extends Error {}

interface Viaggio{
    linea: string,
    costo: number,
    data: Date
}
class TesseraTrasporti{
    private _codice: string
    private _credito: number
    viaggi: Array<Viaggio> = []

    constructor(codice: string ,credito = 0){
        if(!(/[A-Za-z0-9]{5}/.test(codice)))
            throw new TypeError();
        if(credito < 0)
            throw new TypeError();
        this._codice = codice;
        this._credito = credito;
    }
    get creditoResiduo(): number {return this._credito;}

    ricarica(importo: number): number{
        if(importo <= 0)
            throw new TypeError();
        this._credito += importo;
        return this._credito;
    }
    timbra(costo: number,linea: string): number{
        if(costo <= 0 || linea.length === 0)
            throw new TypeError();
        if(costo > this._credito)
            throw new CreditoEsauritoError()
        this.viaggi.push({
            linea: linea,
            costo: costo,
            data: new Date
        })
        this._credito -= costo;
        return this._credito;
    }
    *storicoViaggi(): Generator<Viaggio> {
        let copia: Array<Viaggio> = [...this.viaggi].reverse()
        for(let i of copia){
            yield {
                linea: i.linea,
                costo: i.costo,
                data: i.data
            }
        }
    }
}

class TesseraStudenti extends TesseraTrasporti{
    private _istituto: string
    constructor(codice: string, credito: number, istituto: string) {
        super(codice,credito);
        if(istituto.length === 0)
            throw new TypeError();
        this._istituto = istituto;
    }
    get istituto():string{return this._istituto}
    timbra(costo: number,linea: string): number{
        return super.timbra(costo/2,linea);
    }
}

console.log("--- INIZIO TEST ESERCIZIO 1 ---");

// Test 1: Creazione Base
let t1 = new TesseraTrasporti("A1B2C");
assert.strictEqual(t1.creditoResiduo, 0, "Test 1 Fallito: credito non inizializzato a 0");

// Test 2: Validazione Codice
assert.throws(() => new TesseraTrasporti("AB12"), TypeError, "Test 2.1 Fallito: Codice troppo corto non lancia TypeError");
assert.throws(() => new TesseraTrasporti("AB-12"), TypeError, "Test 2.2 Fallito: Caratteri speciali non lanciano TypeError");

// Test 3: Validazione Credito
assert.throws(() => new TesseraTrasporti("A1B2C", -5), TypeError, "Test 3 Fallito: Credito negativo non lancia TypeError");

// Test 4 e 5: Ricarica
let t2 = new TesseraTrasporti("XY987", 5);
t2.ricarica(15.5);
assert.strictEqual(t2.creditoResiduo, 20.5, "Test 4 Fallito: ricarica valida errata");

assert.throws(() => t2.ricarica(-10), TypeError, "Test 5 Fallito: Ricarica invalida non lancia TypeError");

// Test 6 e 7: Timbratura
t2.timbra(2.5, "LAM Rossa");
assert.strictEqual(t2.creditoResiduo, 18, "Test 6 Fallito: timbratura valida errata");

assert.throws(() => t2.timbra(50, "LAM Blu"), CreditoEsauritoError, "Test 7 Fallito: Credito esaurito non lancia eccezione custom");

// Test 8: Isolamento dello Storico
let storico = t2.storicoViaggi();
let primoViaggio = storico.next().value;
primoViaggio.costo = 999; // Tento di manomettere il dato
let storicoDiNuovo = t2.storicoViaggi();
assert.strictEqual(storicoDiNuovo.next().value.costo, 2.5, "Test 8 Fallito: stato interno alterato dalla manomissione");

// Test 9 e 10: Sottoclasse TesseraStudenti
let ts = new TesseraStudenti("STU01", 10, "UniPi");
assert.throws(() => new TesseraStudenti("STU02", 5, ""), TypeError, "Test 9 Fallito: Istituto vuoto non lancia TypeError");

ts.timbra(4, "Linea 2"); // Sconto 50% applicato
assert.strictEqual(ts.creditoResiduo, 8, "Test 10 Fallito: overriding e sconto studente errato");

console.log("✅ Tutti i test dell'Esercizio 1 sono passati con successo!");


//ESERCIZIO 2

interface Lettura{
    valore: number,
    timestamp: Date
}
class AllarmeSogliaError extends Error {}
class Sensore{
    private _id: string
    private _modello: string
    private _arr: Array<Lettura> = []

    constructor(id: string,modello: string){
        if(!(/S-[0-9]{3}/.test(id)))
            throw new TypeError();
        if(modello.length === 0)
            throw new TypeError();
        this._id = id
        this._modello = modello;
    }
    get id(): string{
        return this._id;
    }
    get modello(): string {return this._modello}
    registra(valore: number): Array<Lettura>{
        this._arr.push({
            valore: valore,
            timestamp:new Date()}
        )
        return this._arr
    }
    *letture(): Generator<Lettura>{
        for(let i of this._arr){
            yield {
                valore: i.valore,
                timestamp: i.timestamp
            }
        }
    }

}

class SensoreSoglia extends Sensore{
    private _sogliaMax: number
    constructor(id: string, modello: string, sogliaMax: number) {
        super(id,modello);
        this._sogliaMax = sogliaMax;
    }
    get sogliaMax(): number{return this._sogliaMax}
    registra(valore: number): Array<Lettura>{
        let a: Array<Lettura> = super.registra(valore);
        if(valore > this._sogliaMax)
            throw new AllarmeSogliaError
        return a
    }
}

console.log("--- INIZIO TEST ESERCIZIO 2 ---");

// 1. Creazione base
let s1 = new Sensore("S-123", "TempV1");
assert.ok(s1 !== undefined, "Test 1 Fallito: Impossibile creare il sensore");

// 2. Validazione ID errata
assert.throws(() => new Sensore("X-123", "TempV1"), TypeError, "Test 2 Fallito: ID invalido non lancia TypeError");

// 3. Validazione Modello errata
assert.throws(() => new Sensore("S-999", ""), TypeError, "Test 3 Fallito: Modello vuoto non lancia TypeError");

// 4. Registrazione valida (se non lancia errori, l'esecuzione prosegue)
s1.registra(22.5);
s1.registra(23.0);

// 5. Registrazione invalida
//assert.throws(() => s1.registra("caldo"), TypeError, "Test 5 Fallito: Valore non numerico non lancia TypeError");

// 6. Generatore: ordine corretto
let gen = s1.letture();
assert.strictEqual(gen.next().value.valore, 22.5, "Test 6.1 Fallito: Primo valore errato");
assert.strictEqual(gen.next().value.valore, 23.0, "Test 6.2 Fallito: Secondo valore errato");

// 7. Isolamento del generatore
let gen2 = s1.letture();
let primaLettura = gen2.next().value;
primaLettura.valore = 99; // Manomissione
let gen3 = s1.letture();
assert.strictEqual(gen3.next().value.valore, 22.5, "Test 7 Fallito: Stato interno alterato");

// 8. Creazione Sottoclasse
let s2 = new SensoreSoglia("S-456", "PressV2", 50);
assert.ok(s2 instanceof Sensore, "Test 8 Fallito: Ereditarietà mancante");

// 9. Sottoclasse: registrazione sotto soglia
s2.registra(40); // Non deve lanciare errori

// 10. Sottoclasse: registrazione sopra soglia
assert.throws(() => s2.registra(55), AllarmeSogliaError, "Test 10 Fallito: Valore sopra soglia non lancia AllarmeSogliaError");

// Verifica che il dato sia stato comunque salvato prima di lanciare l'errore
let lettureS2 = [...s2.letture()];
assert.strictEqual(lettureS2.length, 2, "Test 10 Bis Fallito: Dato sopra soglia non salvato (lunghezza errata)");
assert.strictEqual(lettureS2[1].valore, 55, "Test 10 Bis Fallito: Dato sopra soglia non salvato (valore errato)");

console.log("✅ Tutti i test dell'Esercizio 2 sono passati con successo!");

//ESERCIZIO 3

class CodaPienaError extends Error {}
class CodaVuotaError extends Error {}

class Job{
    private _codice: string
    private _priorita: number
    constructor(codice: string,priorita: number){
        if(!(/[A-Z]{2}[0-9]{3}/.test(codice)))
            throw new TypeError()
        if(priorita < 1 || priorita > 10)
            throw new TypeError()
        this._codice = codice;
        this._priorita = priorita;

    }
    get codice(): string{return this._codice}
    get priorita(): number{return this._priorita}
}

class GestoreProcessi{
    private _maxSize: number
    private _coda: Array<Job> = []
    private _eseguiti: Array<Job> = []
    constructor(maxSize: number){
        if(maxSize < 0)
            throw new TypeError()
        this._maxSize = maxSize;
    }
    get maxSize(): number{return this._maxSize}
    accoda(job: Job): void{
        if(this._coda.length === this._maxSize)
            throw new CodaPienaError
        this._coda.push(job)
    }
    eseguiProssimo(): Job{
        if(this._coda.length === 0)
            throw new CodaVuotaError
        let max: number = -Infinity;
        let ind:number = 0
        let cod: string = ''
        for(let i = 0; i < this._coda.length; i++){
                if(this._coda[i].priorita > max){
                    max = this._coda[i].priorita
                    cod = this._coda[i].codice
                    ind = i
                }
        }
        this._coda.splice(ind,1)
        this._eseguiti.push(new Job(cod, max))
        return new Job(cod, max)
    }
    *storico(): Generator<Job>{
        let copia: Array<Job> = [...this._eseguiti].reverse()
        for(let i of copia){
            yield new Job(i.codice, i.priorita)
        }
    }
}

console.log("--- INIZIO TEST ESERCIZIO 3 ---");

// 1. Validazione Job Base
let j1 = new Job("XY987", 5);
assert.strictEqual(j1.priorita, 5, "Test 1 Fallito: Getter priorita non funzionante");

// 2. Errori Validazione Job
assert.throws(() => new Job("xY123", 5), TypeError, "Test 2.1 Fallito: Codice minuscolo non lancia TypeError");
assert.throws(() => new Job("AB123", 15), TypeError, "Test 2.2 Fallito: Priorità fuori range non lancia TypeError");

// 3. Creazione Gestore
let gestore = new GestoreProcessi(3);
assert.throws(() => new GestoreProcessi(-1), TypeError, "Test 3 Fallito: maxSize invalido non lancia TypeError");

// 4. Inserimento tipo errato
//assert.throws(() => gestore.accoda(new Job("AB123", 5)), TypeError, "Test 4 Fallito: Oggetto non istanza di Job non lancia TypeError");

// 5. Inserimento e Coda Piena
gestore.accoda(new Job("AA001", 5));
gestore.accoda(new Job("BB002", 2));
gestore.accoda(new Job("CC003", 8));
assert.throws(() => gestore.accoda(new Job("DD004", 1)), CodaPienaError, "Test 5 Fallito: Superamento maxSize non lancia CodaPienaError");

// 6. Esecuzione per Priorità (estrae CC003 che ha priorità 8)
let estratto1 = gestore.eseguiProssimo();
assert.strictEqual(estratto1.codice, "CC003", "Test 6 Fallito: Estrazione priorità massima errata");

// 7. Esecuzione a parità di priorità (FIFO)
gestore.accoda(new Job("EE005", 5)); // C'è già AA001 con priorità 5 inserito prima
let estratto2 = gestore.eseguiProssimo();
assert.strictEqual(estratto2.codice, "AA001", "Test 7 Fallito: Estrazione FIFO a parità di priorità errata");

// 8. Esecuzione fino a svuotamento
gestore.eseguiProssimo(); // Estrae EE005
gestore.eseguiProssimo(); // Estrae BB002
assert.throws(() => gestore.eseguiProssimo(), CodaVuotaError, "Test 8 Fallito: Estrazione da coda vuota non lancia CodaVuotaError");

// 9. Verifica dello storico (dal più recente eseguito: BB002, EE005, AA001, CC003)
let storico1 = [...gestore.storico()];
assert.strictEqual(storico1.length, 4, "Test 9 Fallito: Lunghezza storico errata");
assert.strictEqual(storico1[0].codice, "BB002", "Test 9 Fallito: Ordine storico errato");

// 10. Indipendenza dello storico
storico1[0] = null; // Modifica l'array generato
let storico2 = [...gestore.storico()];
assert.strictEqual(storico2[0].codice, "BB002", "Test 10 Fallito: Storico interno alterato dalla manomissione esterna");

console.log("✅ Tutti i test dell'Esercizio 3 sono passati con successo!");
