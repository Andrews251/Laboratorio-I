type Messaggio = string | number | null | undefined

function formatta(m: Messaggio):string{
    if(typeof m === 'string')
        return m
    if(typeof m === 'number')
        return `CODICE ${m}`

    return "NESSUN MESSAGGIO"
}

function formattaTutti(ms: Messaggio[]): string[]{
    let res: string[] = []
    for(let i of ms){
        res.push(formatta(i))
    }
    return res
}
function isMessaggio(x: unknown): x is Messaggio{ //funzione ausiliaria comoda per verificare che x sia di tipo Messaggio
    return typeof x === 'string' ||
        typeof x === 'number' ||
        x === null || x === undefined

}
function leggiValore(x:unknown):Messaggio{
    if(isMessaggio(x))
        return x
    else
        throw new TypeError()
}
