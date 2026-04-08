interface IPrice{
    price: number
}

enum Sort{
    CRESCENTE,
    DECRESCENTE
}
function sortByPrice<T extends IPrice>(arr: Array<T>, sort: Sort):Array<T>{
    if(!(sort in Sort))
        throw new TypeError()
    return sort === Sort.CRESCENTE
        ? arr.sort((a:T, b:T): number => a.price - b.price)
        : arr.sort((a:T, b:T): number => b.price - a.price)
}