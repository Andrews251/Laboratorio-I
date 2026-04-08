type Product ={
    name: string,
    price: number,
    category: string,
}

type TransformProduct = (p: Product) => Product
function createDiscount(discount = 10): TransformProduct {
    return (p: Product): Product => ({
        ...p,
        price: p.price - ((p.price * discount)/100)
    });
}

let a: Product = {name: "cosa", price: 100, category: "cibo"}

let f: (p: Product) => Product = createDiscount(20);

console.log(f(a))