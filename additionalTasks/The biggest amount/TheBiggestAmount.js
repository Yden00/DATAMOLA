function TheBiggestAmount(arr) {
    let partialSum = 0;
    let maxSum = 0;
    for (let el of arr) {
        partialSum += el;
        maxSum = Math.max(maxSum, partialSum);
        if (partialSum < 0) partialSum = 0;
    }
    return maxSum;
}
console.log(TheBiggestAmount([-2,1,-3,4,-1,2,1,-5,4]));