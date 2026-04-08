

class Counter{
    value: number
    static default_value: number = 0
    constructor(value: number | undefined) {
        if(typeof value === 'number')
            this.value = value
        else
            this.value = Counter.default_value
    }
    increment(x:number):void{
        if(x <= 0)
            throw new RangeError()
        this.value += x
    }
    decrement(x:number):void{
        if(x <= 0)
            throw new RangeError()
        this.value -= x
    }
}

//TEST
let c: Counter = new Counter(undefined)
console.log(c.value)
c.increment(10)
console.log(c.value)
let c1: Counter = new Counter(1)
c1.decrement(10)
console.log(c1.value)

try{
    c1.increment(0)
}catch(e){
    if(e instanceof RangeError){
        console.log("Errore Range")
    }
}