
//funzione ricorsiva che restituisce il nodo alla posizione n
function listNth(head, n){

    console.log(head)
    if(!head)
        return null
    if(n == 0)
        return head
    else    
        return listNth(head.next,n - 1)
}

let l = {val:1,next:{val:4,next:{val:3,next:null}}}
let m = {val:1,next:{val:3,next:{val:3,next:{val:3,next:null}}}}


//funzioneche restituisce true se e solo se la lista è ordinata in modo non decrescente

function listIsSorted(head){
    if(!head || head.next == null)
        return true
    if(head.val <= head.next.val)
        return listIsSorted(head.next)
    else
        return false

    //return head.val <= head.next.val && listIsSorted(head.next) -> modo alternativo più conciso
}



//funzione che restituisce una nuova lista i cui valori sono il risultato dell’applicazione di f ai valori della lista originale

function listMap(head, f){
    if(!head)
        return null
    return {val: f(head.val), next: listMap(head.next,f)}
}

//funzioneche restituisce true se e solo se le due liste sono uguali, ossia hanno gli stessi valori nello stesso ordine

function listEquals(l1, l2){
    if(!l1 && !l2)
        return true
    if(!l1 || !l2)
        return false
    return l1.val === l2.val && listEquals(l1.next,l2.next)
}



//funzione che restituisce una lista ottenuta rimuovendo deleteCount nodi a partire dalla posizione start

function listSplice(head, start, deleteCount){
    if(!head)
        return null
    if(start > 0)
        return {val: head.val, next: listSplice(head.next,start - 1, deleteCount)}
    if(deleteCount > 0)
        return listSplice(head.next,0,deleteCount - 1)

    return head
}



var mergeTwoLists = function(list1, list2) {
    let arr = []
    let n = 0;

    n = list1.length + list2.length

    console.log(n)
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if(list1[i] != undefined || list2[j] != undefined){
                if(list1[i] == undefined){
                    arr.push(list2[i])
                    continue
                }
                if(list2[j] == undefined){
                    arr.push(list1[i])
                    continue
                }
                else{
                    
                    if(list1[i] < list2[j])
                        arr.push(list1[i])
                    else if(list2[i] == list1[i]){
                        arr.push(list1[i])
                        arr.push(list2[j])
                    }
                    else
                        arr.push(list1[i])
            }

        }
        
        }
        
    }

    return arr
};

let l1 = [1,2,3]
let l2 = [1,3,4]

console.log(mergeTwoLists(l1,l2))