
const input1 = [1, [1, 2, [3]], [], 4, [[5, 6], 7]];
const input2 = [1,2,3,4]

function sumNestedArray(arr, sum = 0, i = 0){
    if(typeof(arr[i]) === 'object'){
        return sum + sumNestedArray(arr[i],0,0) + sumNestedArray(arr,sum,i + 1)
    }
    else if (i < arr.length){
        return arr[i] + sumNestedArray(arr,sum,i + 1)
    }
        
    return sum
}

//non funziona
function flattenNestedArray(arr, res = [], i = 0){
    console.log(typeof(res))
    if(typeof(arr[i]) === 'object'){
        return res.push(flattenNestedArray(arr[i],0,0)) //, flattenNestedArray(arr,res,i + 1)
    }
    else if (i < arr.length){
        res.push(arr[i])
        return flattenNestedArray(arr,res,i + 1)
    }
        
    return res
}
console.log(flattenNestedArray(input1))