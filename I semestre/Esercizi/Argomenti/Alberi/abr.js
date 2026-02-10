//ABR: I valori del sottoalbero sinistro hanno valori <= x.val, quelli a destra valori >= x.val
let albero = {
    val : 6,
    sx:{
        val:5,
        sx:{val:2},
        dx:{ val: 5}
    },
    dx: {
        val: 7,
        dx: {val: 8}
    }
}

function abrStampaCrescente(t){

    if(t){
        abrStampaCrescente(t.sx);
        console.log(t.val);
        abrStampaCrescente(t.dx);
    }
}
abrStampaCrescente(albero)

function abrCrescente(t){

    return t ? [...abrCrescente(t.sx), t.val,...abrCrescente(t.dx)] : [];
}

console.log(abrCrescente(albero));

function abrDecrescente(t){
    return t ? [...abrDecrescente(t.dx), t.val, ...abrDecrescente(t.sx)] : []
}

console.log(abrDecrescente(albero));

function abrMax(t){
    if(!t){
        return -Infinity
    }

    return Math.max(t.val, abrMax(t.dx));
    //return !t.dx ? abrMax(t.dx) :  t.val
}
console.log(abrMax(albero));

function abrCerca(t, v){
    if(!t){
        return false
    }
    if(v == null){
        return t
    }
    /*
    if(t.val === v){
        return true
    }else if(t.val <= v){
        return abrCerca(t.dx, v)
    }else{
        return abrCerca(t.sx, v)
    }
    */
    if(v <= t.val){
        return abrCerca(t.sx, v)
    }
    return abrCerca(t.dx, v)
}

console.log(abrCerca(albero, 8))

function abrInserimento(t, v){
    if(!t){
        return {val : v}
    }

    if(v <= t.val){
        t.sx = abrInserimento(t.sx, v)
    }else {
        t.dx = abrInserimento(t.dx, v)
    }
    return t;
}

console.log(JSON.stringify((abrInserimento(albero, -9))));



/// grafi



console.log("GRAFIII")
