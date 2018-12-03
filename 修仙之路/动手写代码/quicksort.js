let arr = [1,2,4,5,6,5];

function quicksort(arr) {
    if(arr.length < 2) {
        return arr;
    } 
    let left = [], right = [];
    let pivot = arr[0]
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] <= pivot) {
            left.push(arr[i])
        }
        if(arr[i] > pivot) {
            right.push(arr[i]);
        }
    }
    return quicksort(left).concat([pivot]).concat(quicksort(right));
}
quicksort(arr);