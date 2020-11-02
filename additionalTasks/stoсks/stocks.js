function stocks(arr) {
    let result = 0;
    let i = 0;
    while (i < arr.length) {
      if (arr[i + 1] > arr[i]) {
        result += arr[i + 1] - arr[i];
      }
      i++;
    }
    return result;                         
}

console.log(stocks([7,6,4,3,1]))