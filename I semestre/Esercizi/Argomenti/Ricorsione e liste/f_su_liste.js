
//cerca un elemento nella lista
function listFind(head, value){
    if(!head)
        return null
    if(head.val === value)
        return head
    return listFind(head.next,value)
}

//inserimento di un elemento nella lista

function listInsert(x,value){
    if(!x)
        return
    let nuovo = {val: value, next: x.next}
    x.next = nuovo
}

//inserimento di un elemento in coda e restituisce la testa aggiornata

function listPush(head,value){
    if(!head) //controllo se la lista è vuota
        return {val:value, next: null}
    if(head.next) //controllo se esiste un nodo successivo e nel caso vado in quel nodo
        listPush(head.next,value)
    else
        listInsert(head,value) //non ho un next e quindi inserisco in coda
    return head
}

//rimuovo il nodo in coda e restituisce la coppia [testa aggiornata, valore rimosso]

function listPop(head){
    if(!head)
        return [null, undefined]
    if(!head.next)
        return [null, head.val]
    let [newNext, removedVal] = listPop(head.next)
    head.next = newNext

    return [head, removedVal]
}