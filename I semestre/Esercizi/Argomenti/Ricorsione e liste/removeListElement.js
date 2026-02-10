//Esercizio preso da LeetCode (203. Remove Linked List Elements)
let head = { val: 1,
             next: {
                    val: 2,
                    next: {
                        val: 3,
                        next: {
                            val: 4,
                            next: {
                                val: 3,
                                next: null
                            }
                        }
                    }
                }
            };

function removeElements(head, val) {

    if(!head){
        return null    
    }
        
    if(head.val === val){
        return removeElements(head.next,val)
    }
    else{
        return {val:head.val, next: removeElements(head.next,val)}
    }
};

console.log(removeElements(head,3))

