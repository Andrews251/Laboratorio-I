
/*
function applicaNaturali(f,a){
    let r = [];
    let min, max;
    let i = 0;
    let assegnato = false;

    //eseguo f(a) e metto i valori in r
    for(let i = 0; i < a.length; i++){
        if(a[i] < 0 || !Number.isInteger(a[i]) || a[i] === null || a[i] === undefined)
            r[i] = undefined;
        else{
            r[i] = f(a[i]);
        }
    }
    i = 0; //inizializzo per il prossimo ciclo

    //controllo il massimo e il minimo in r
    while(i < r.length){
        if(r[i] !== null && r[i] !== undefined && assegnato == false){
            min = r[i];
            max = r[i];
            assegnato = true;
        }
        if(assegnato == true && r[i] !== undefined && r[i] !== null && r[i] < min)
            min = r[i];
        else if (assegnato == true && r[i] !== undefined && r[i] !== null && r[i] > max)
            max = r[i];
        i++;
    }
    let obj = {risultati: r, min: min, max: max};
    return obj;
}

*/

let p = [
            {nome: "Marta", eta: 22}, 
            {nome: "John", eta: 24}, 
            {nome: "Alice", eta: 21}, 
            {nome: "Fabio", eta: 18}, 
            {nome: "Laura", eta: 19}
        ];

function trovaCoppieVicini(p,d){

    let result = [];
    
    for(let i = 0; i < p.length; i++){
        console.log(`i = ${i}`)
        if(typeof(p[i].nome) === 'string' && p[i].eta >= 0){
            for(let j = i + 1; j < p.length; j++){
                if(Math.abs(p[i].eta - p[j].eta) <= d){
                    //console.log(Math.abs(p[i].eta - p[j].eta));
                    result[i] = [p[i].nome, p[j].nome];
                    //console.log(result[i]);
                    console.log(`j = ${j}`)
                }
            }
        }else
          return -1;
        //console.log(result[i])
    }
    
    return result;
}

let v = trovaCoppieVicini(p, 2);

console.log(v);
