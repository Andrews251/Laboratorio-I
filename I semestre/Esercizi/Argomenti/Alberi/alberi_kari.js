let kAryTree = {
  val: 1, // Radice
  children: [
    // Figlio 1: Una foglia
    { 
      val: 2, 
      children: [] 
    },
    
    // Figlio 2: Ha a sua volta 3 figli
    { 
      val: 3, 
      children: [
        { val: 31, children: [] },
        { val: 32, children: [] },
        { val: 33, children: [] }
      ] 
    },

    // Figlio 3: Ha 1 solo figlio (struttura profonda)
    { 
      val: 4, 
      children: [
        { 
          val: 41, 
          children: [
             { val: 411, children: [] }
          ] 
        }
      ] 
    },

    // Figlio 4: Questo nodo sfrutta tutti e 5 i possibili rami (k=5 completo)
    { 
      val: 5, 
      children: [
        { val: 51, children: [] },
        { val: 52, children: [] },
        { val: 53, children: [] },
        { val: 54, children: [] },
        { val: 55, children: [] }
      ] 
    },

    // Figlio 5: Altra foglia
    { 
      val: 6, 
      children: [] 
    }
  ]
};

//visita di un albero k-ario

function anticipataK(t){
    if(!t)
        return -Infinity
    console.log(t.val)

    for(let i of t.children){
        anticipataK(i) //visito tutti i figli
    }
}

//massimo di un albero k-ario
function massimoK(t){
    if(!t)
        return -Infinity
    let max = t.val

    for(let i of t.children){
        max = Math.max(massimoK(i), max) //visito tutti i figli
    }
    return max
}


//console.log(massimoK(kAryTree))

//massimo di un albero k-ario
function minimoK(t){
    if(!t)
        return +Infinity
    let min = t.val

    for(let i of t.children){
        min = Math.min(minimoK(i), min) //visito tutti i figli
    }
    return min
}

//console.log(minimoK(kAryTree))

//somma dei valori dell'albero
function sumK(t){
    if(!t)
        return 0
    let sum = t.val
    for(let child of t.children){
        sum = sum + sumK(child)
    }
    return sum
}

//console.log(sumK(kAryTree))

let f = (a) => a*a;

function applyf(t){
    if(!t)
        return undefined
    t.val = f(t.val)
    for(let child of t.children){
        applyf(child)
    }
    return t
}

//console.log(applyf(kAryTree))

function findK(t,v){
    if(!t)
        return false
    if(t.val === v) 
        return true //questo è il valore che sto restituendo alla chiamata ricorsiva, a meno che v non sia la radice dell'albero
    for(let child of t.children){
        if(findK(child,v)) //ho necessità di fare questa verifica
            return true
    }
    return false
}

//ESERCIZIO DA GEMINI: Scrivi una funzione bestPath(t) che trovi il percorso che va dalla radice a una foglia tale che la somma dei valori dei nodi in quel percorso sia la massima possibile.
//                     La funzione deve restituire l'Array contenente i valori di quel percorso.

function bestPathSum(t){ //versione che restituisce la somma maggiore
    if(!t)
        return 0
    
    let max = 0
    let sum = t.val
    for(let child of t.children){
        console.log(child)
        max = Math.max(bestPathSum(child),max)
    }
    sum += max
    return sum
}


function bestPath(t){
    if(!t)
        return []
    let res = []
    
    for(let child of t.children){
        let current = bestPath(child)
        if(sumArr(current) > sumArr(res)){
            res = current
        }
    }
    
    return [t.val].concat(res)
}

function sumArr(arr){
    let sum = 0

    for(let i = 0; i < arr.length; i++)
        sum = sum + arr[i]

    return sum
}


function hasPathSum(root,targetSum){
    if(!root)
        return false
    let temp = targetSum
    temp -= root.val
    if(temp === 0 && !root.right && !root.left)
        return true
    return hasPathSum(root.left,temp) || hasPathSum(root.right, temp)
}             



let bTree = {
    val:1,
    left: {
        val:2,
    right: {
        val: 3,
        left: {
            val: 4
        },
        right:{
            val: 5
        }
    }
    }
}

//console.log(hasPathSum(bTree,15))

var preorderTraversal = function(root) {
    if(!root)
        return []
    let res
    res.push(root.val)
    res = res.concat(preorderTraversal(root.left))
    res = res.concat(preorderTraversal(root.right))

    return res
}

//console.log(preorderTraversal(bTree))

var postorderTraversal = function(root) {
    if(!root)
        return []
    let res
    res = res.concat(postorderTraversal(root.left))
    res = res.concat(postorderTraversal(root.right))
    res.push(root.val)

    return res
}


