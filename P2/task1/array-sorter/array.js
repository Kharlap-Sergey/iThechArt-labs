var executeButton = document.querySelector(".array-sorter__executer");
var sorterType = document.querySelector("#sorter-type");
var input = document.querySelector("#input");

function ToIntArr(arr) {
  var intArr = [];
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];
    intArr.push(+element);
  }
  return intArr;
}
var array = {
  bubbleSort: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          var t = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = t;
        }
      }
    }
    console.log("sorted arr: " + arr);
    return arr;
  },

  quicksort: function (arr, l, r) {
    var i = l,
      j = r;
    var x = arr[Math.floor((l + r) / 2)];
    do {
      while (arr[i] < x) i++;
      while (arr[j] > x) j--;
      if (i <= j) {
        var t = arr[j];
        arr[j] = arr[i];
        arr[i] = t;
        i++;
        j--;
      }
    } while (i <= j);

    if (i < r) this.quicksort(arr, i, r);
    if (l < j) this.quicksort(arr, l, j);
    return arr;
  },

  smartSort: function (arr) {
    var buf = [];
    for (i = 0; i < 10000; i++) {
      buf[i] = 0;
    }

    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      buf[elem]++;
    }

    console.log(buf);
    sortedArr = [];
    for (i = 0; i < 10000; i++) {
      for (j = 0; j < buf[i]; j++) {
        sortedArr.push(i);
      }
    }
    console.log(buf);
    return sortedArr;
  },

  InsertionSort: function (arr) {
    for (i = 1; i < arr.length; i++) {
      var j = i;
      while (j > 0 && arr[j - 1] > arr[j]) {
        var t = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = t;
        j--;
      }
    }
    return arr;
  },
};

var executor = {
  sort: function () {
    console.log("sort-exequter");
    console.log("type: " + sorterType.value);
    console.log("input: " + input);
    var arr = input.value.split(", ");
    var intArr = ToIntArr(arr);
    console.log("int arr: " + intArr);
    var sortedArr;
    switch (sorterType.value) {
      case "quicksort":
        sortedArr = array.quicksort(intArr, 0, intArr.length - 1);
        break;
      case "smart-sort":
        sortedArr = array.smartSort(intArr);
        break;
      case "bubble-sort":
        sortedArr = array.bubbleSort(intArr);
        break;
      case "Insertion-sort":
        sortedArr = array.InsertionSort(intArr);
        break;
    }
    alert(sortedArr);
  },
};

executeButton.addEventListener("click", executor.sort);
