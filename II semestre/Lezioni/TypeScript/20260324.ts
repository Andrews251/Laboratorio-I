//ESERCIZIO 1

class CreditoInsufficiente extends Error{}

class Movimento{
    tipo: string
    euro: number
    motivo: string
    data: Date
    constructor(tipo:string,euro:number,motivo:string,data:Date) {
        this.tipo = tipo;
        this.euro = euro;
        this.motivo = motivo;
        this.data = data;
    }
}



class Parcometro{
    #targa : string
    #credito : number
    static #reg: Set<[Parcometro, Movimento]> = new Set()
    #mov: Movimento[] = []
    constructor(targa:string,credito = 0){
        if(credito < 0)
            throw new TypeError()
        if(targa.length === 0)
            throw new TypeError()
        this.#targa = targa;
        this.#credito = credito;
    }
    get credito(): number{
        return this.#credito;
    }
    ricarica(euro: number,motivo: string): Movimento{
        if(euro <=0)
            throw new TypeError()
        this.#credito = this.credito + euro;
        let m: Movimento = new Movimento("R",euro,motivo,new Date())
        this.#mov.push(m)
        Parcometro.#reg.add([this,m])
        return m
    }
    paga(euro: number,motivo: string): Movimento{
        if(euro > this.#credito)
            throw new CreditoInsufficiente()
        if(euro <=0)
            throw new TypeError()
        this.#credito = this.credito - euro;
        let m: Movimento = new Movimento("S",euro,motivo,new Date())
        this.#mov.push(m)
        Parcometro.#reg.add([this,m])
        return m
    }
    storico(k = 5):Movimento[]{
        let arr: Movimento[] = []
        let len: number = Math.max(0, this.#mov.length - k)
        for(let i=this.#mov.length - 1; i >= len;i--){
            let res: Movimento = this.#mov[i]
            arr.push(new Movimento( //questo può essere sostituito da .map(x=>({...x})
                res.tipo,
                res.euro,
                res.motivo,
                new Date(res.data))
            )
        }
        return arr
        ///oppure puoi fare return [...this.#mov.slice(-k).map(x=>({...x}))].reverse()
    }
    static registro():Set<[Parcometro, Movimento]>{
        return new Set(this.#reg)
    }
}

//ESERCIZIO 2

interface Traccia{
    titolo: string,
    artista: string,
    durata: number,
    preferita?: boolean
}

function durataTotale(lista:Traccia[]):number{

    return lista.reduce((acc: number,curr: Traccia):number => acc + curr.durata)
}

function soloPreferite(lista:Traccia[]): Array<Traccia>{
    let res: Array<Traccia> = []
    for(let i of lista){
        if(i.preferita)
            res.push(i)
    }
    return res
}

function descrivi(t:Traccia): string{
    return t.preferita? `${t.titolo} - ${t.artista}`: `${t.titolo} - ${t.artista} ★`

}

function aggiungiGenere(t:Traccia,genere:string):{}{
    return t[genere] = genere
}

type Messaggio = string | number | null | undefined

function formatta(m: Messaggio):string{
    if(typeof m === 'string')
        return m
    if(typeof m === 'number')
        return `CODICE ${m}`
    if(typeof m === null || typeof m === undefined )
        return "NESSUN MESSAGGIO"
}

function formattaTutti(ms: Messaggio[]): string[]{
    let res: string[] = []
    for(let i of ms){
        res.push(formatta(i))
    }
    return res
}

function leggiValore(x:unknown):Messaggio{
    return  x  ? x : throw newa TypeError()
}


enum Dir{
    Nord,
    Sud,
    Est,
    Ovest
}

interface Step{
    d: Dir,
    l: number
}

type Point = [number,number]

function walk(o:Point,p:Step[]):Point{
    for(let i of p){
        if(i.d === Dir.Nord)
            o[1] += i.l
        if(i.d === Dir.Sud)
            o[1] -= i.l
        if(i.d === Dir.Est)
            o[0] += i.l
        if(i.d === Dir.Ovest)
            o[1] -= i.l
    }
    return o
}


