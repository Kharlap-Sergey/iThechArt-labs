const executeButton = document.querySelector(".array-sorter__executer");
const sorterType = document.querySelector("#sorter-type");
const input = document.querySelector("#input");

function ToIntArr(arr){
  let intArr = [];
  for(element of arr){
    intArr.push(+element);
  }
  return intArr
}
let array = {
  bubbleSort: function(arr){
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr.length-1; j++){
        if(arr[j] > arr[j+1]){
          let t = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = t;
        }
      }
    }
    console.log("sorted arr: " + arr);
    return arr;
  },

  quicksort: function(arr, l, r){
    let i = l, j = r;
    let x = arr[Math.floor((l+r)/2)];
    do{
      while(arr[i] < x) i++;
      while(arr[j] > x) j--;
      if(i <= j){
        let t = arr[j];
        arr[j] = arr[i];
        arr[i] = t;
        i++;
        j--;
      }
    }while(i <= j);

    if(i < r) this.quicksort(arr, i, r);
    if(l < j) this.quicksort(arr, l, j);
    return arr;
  },

  smartSort: function(arr){
    let buf = []
    for(i = 0; i < 10000; i++){
      buf[i] = 0;
    }
    for(elem of arr){
      buf[elem]++;
    }

    sortedArr = [];
    for(i = 0; i < 10000; i++){
      for(j = 0; j < arr[i]; j++){
        sortedArr.push(i);
      }
    }
    console.log(buf);
    return sortedArr;
  },
};
let executor = {
  sort: function () {
    console.log("sort-exequter");
    console.log("type: " + sorterType.value);
    console.log("input: "+input);
    let arr = input.value.split(', ');
    let intArr = ToIntArr(arr);
    console.log("int arr: " + intArr)
    let sortedArr;
    switch (sorterType.value) {
      case "quicksort":
        sortedArr = array.quicksort(intArr, 0, intArr.length-1)
        break;
      case "smart-sort":
        sortedArr = array.smartSort(intArr);
        break;
      case "bubble-sort":
        sortedArr = array.bubbleSort(intArr)
        break;
      case "":
        break;
    }
    alert(sortedArr);
  },
};

executeButton.addEventListener("click", executor.sort);
