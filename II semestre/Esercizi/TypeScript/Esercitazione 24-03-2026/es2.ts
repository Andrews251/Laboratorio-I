interface Traccia{
    titolo: string,
    artista: string,
    durata: number,
    preferita?: boolean
}

interface TracciaConGenere extends Traccia{
    genere: string
}
function durataTotale(lista:Traccia[]):number{
    let somma: number = 0
    for(let t of lista){
        somma += t.durata
    }
    return somma
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

function aggiungiGenere(t:TracciaConGenere,genere:string):{}{
    return {
        ...t,
        genere: genere}
}