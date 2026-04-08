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
    let x: number = o[0]
    let y: number = o[1]
    for(let i of p){
        switch(i.d){
            case Dir.Nord:
                y += i.l
                break
            case Dir.Sud:
                y -= i.l
                break
            case Dir.Est:
                x += i.l
                break
            case Dir.Ovest:
                x -= i.l
                break
        }
    }
    return [x,y]
}

type Trasformatore = (p: Point) => Point | string | number

function applica(o: Point, p: Step[], f? : Trasformatore):Point | string | number {
    let posizioneFinale: Point = walk(o,p)
    return f? f(posizioneFinale) : posizioneFinale
}