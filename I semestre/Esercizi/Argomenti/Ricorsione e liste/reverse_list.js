let head = { val: 1,
             next: {
                    val: 2,
                    next: {
                        val: 3,
                        next: {
                            val: 4,
                            next: null
                        }
                    }
                }
            };


//Prende una lista e la stampa al contrario, esercizio preso da LeetCode (Reverse Linked List)
function reverseList(head, prev = null) {
    if(!head)
        return prev
    let next = head.next
    head.next = prev
    prev = head
    
    return reverseList(next, prev)
};

function reverseBetween(head,left,right, rev = null) {
    let p, q;
    if(!head)
        return null
    if(left == right)
        return rev
    if(left > 0)
        rev = {val: head.val, next: reverseBetween(head.next,(left - 1) - 1), right,rev}
    else{
        p = head.val
    }
    if(right > 0)
        rev = {val: head.val, next: reverseBetween(head.next,left,(right - 1) - 1),rev}
    else{
        q = head.val
        head.val = p
    }

    return rev
    
    
};


console.log(reverseBetween(head,2,4))