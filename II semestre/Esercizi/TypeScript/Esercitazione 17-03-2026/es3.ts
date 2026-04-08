enum Semi{
    CUORI,
    QUADRI,
    FIORI,
    PICCHE
}

enum Valori{
    DUE = 2,
    TRE,
    QUATTRO,
    CINQUE,
    SEI,
    SETTE,
    OTTO,
    NOVE,
    DIECI,
    J,
    Q,
    K,
    ASSO
}

type Carta = [Semi,Valori]
class Mano{
    carte: Carta[] = []
    constructor (c1:Carta,c2:Carta,c3:Carta,c4:Carta,c5:Carta){
        this.carte.push(c1,c2,c3,c4,c5)
    }
    ordina():void{
        this.carte.sort((a:Carta,b:Carta):number => {
            if(a[1] === b[1])
                return b[0] - a[0];
            else
                return a[1] - b[1];
        });
    }
    poker():boolean{
        let count: {[key:number]:number} = {}
        for(let c of this.carte){
            let valore: Valori = c[1]
            if(!count[valore])
                count[valore] = 0;
            else
                count[c[1]] += 1
        }
        for(let i in count){
            if(count[i] === 4)
                return true
        }
        return false
    }
    scala():boolean{
        this.ordina()
        //verifico scala 1-5
        if( this.carte[4][1] === Valori.ASSO &&
            this.carte[0][1] === Valori.DUE &&
            this.carte[1][1] === Valori.TRE  &&
            this.carte[2][1] === Valori.QUATTRO  &&
            this.carte[3][1] === Valori.CINQUE
        )
            return true
        for(let i = 1; i < this.carte.length; i++){
            let curVal = this.carte[i][1]
            let precVal = this.carte[i-1][1]
            if(curVal > precVal)
                return false
        }
        return true
    }
}