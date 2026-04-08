class PrenotazioneChiusaError extends Error {}
class PrenotazionePienaError extends Error {}
class PasseggeroDuplicatorError extends Error {}

type CategoriaPasseggero = "adulto" | "minore"
type StatoPrenotazione = "aperta" | "chiusa"

class Passeggero{
    #nome: string
    #categoria: CategoriaPasseggero
    constructor(nome: string, categoria: CategoriaPasseggero){
        if(!(typeof nome !== "string" || nome.length === 0))
            throw new TypeError()
        if(categoria !== "adulto" && categoria !== "minore")
            throw new TypeError()
        this.#nome = nome
        this.#categoria = categoria
    }
    get nome(): string{return this.#nome}
    get categoria(): CategoriaPasseggero{return this.#categoria}
}


class Prenotazione{
    #codice: string
    #posti: number
    #stato: StatoPrenotazione = "aperta"
    #passeggeri: Set<Passeggero> = new Set()
    constructor(codice: string, posti: number){
        if(typeof codice !== "string" || codice.length === 0)
            throw new TypeError()
        if(!Number.isInteger(posti) || posti <= 0)
            throw new TypeError()
        this.#codice = codice
        this.#posti = posti
    }
    get codice(): string{return this.#codice}
    get stato(): StatoPrenotazione{return this.#stato}

    aggiungi(p:Passeggero):Passeggero{
        if(!(p instanceof Passeggero))
            throw new TypeError()
        if(this.#stato === "chiusa")
            throw new PrenotazioneChiusaError()
        if(this.#posti <= 0)
            throw new PrenotazionePienaError()
        if(this.#passeggeri.has(p))
            throw new PasseggeroDuplicatorError()
        this.#passeggeri.add(p)
        this.#posti -= 1
        return new Passeggero(p.nome,p.categoria)
    }
    chiudi():void{
        this.#stato = "chiusa"
    }
    elenco(): Passeggero[]{
        return [...this.#passeggeri]
    }
    conteggioMinori(): number{
        let c: number = 0
        for(let i of this.#passeggeri){
            if(i.categoria === "minore")
                c += 1
        }
        return c
    }
    postiLiberi(): number{
        return this.#posti
    }
}

interface RigaPremium{
    nome: string
    extra: string
}
class PrenotazionePremium extends Prenotazione{
    #servizioExtra: string
    constructor(codice: string, posti: number, servizioExtra: string) {
        super(codice,posti);
        if(typeof servizioExtra !== "string" || servizioExtra.length === 0)
            throw new TypeError()
        this.#servizioExtra = servizioExtra
    }
    get servizioExtra(): string {return this.#servizioExtra}

    elencoPremium():Array<RigaPremium>{
        let res: Array<RigaPremium> = []
        for(let i of this.elenco()){
            res.push({
                nome: i.nome,
                extra: this.#servizioExtra
            })
        }
        return res

    }
    chiudiPrenotazioniPiene(xs: unknown []): Array<Prenotazione>{ //uso unknown perché xs deve essere un array eterogeneo, verifico le istanze dentro il metodo
        let chiuse: Array<Prenotazione> = []
        for(let x of xs) {
            if(x instanceof Prenotazione){
                if(x.postiLiberi() <= 0 && x.stato === "aperta"){
                    x.chiudi()
                    chiuse.push(x)
                }
            }
        }
        return chiuse
    }
}