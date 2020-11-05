var executeSubSum = document.querySelector(".sub-sum__exec");
var subSumInput = document.querySelector(".sub-sum__data-input");

var executeSearch = document.querySelector(".search__exec");
var searchInput = document.querySelector(".search__data-input");
var searchOption = document.querySelector("#ssearch__type-input-selecter");

var executeSelect = document.querySelector(".selevtion__exec");
var selectInput = document.querySelector(".selevtion__data-input");


function toIntArray(arr) {
  var intArr = [];
  for (var i = 0; i < arr.length; i++) {
    var elem = arr[i];
    intArr.push(+elem);
  }

  return intArr;
}

var array = {
  subSum: function (arr) {
    var sum = 0;
    var maxSum = +arr[0];
    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      sum += +elem;
      maxSum = maxSum < sum ? sum : maxSum;
      if (sum < 0) sum = 0;
    }

    return maxSum;
  },

  findMax: function (arr) {
    var res = arr[0];
    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      res = res < +elem ? +elem : res;
    }
    return res;
  },

  findMin: function (arr) {
    var res = arr[0];

    for (var i = 0; i < arr.length; i++) {
      var elem = arr[i];
      res = res > +elem ? +elem : res;
    }

    return res;
  },

  findMedian: function (arr) {

    var intArr = toIntArray(arr);
    intArr.sort();

    return intArr[Math.floor(intArr.length / 2)];
  },

  selectMaxAscendingSubsequence: function (arr) {
    var intArr = toIntArray(arr);
    intArr.push(null);
    var start = 0;
    var end = 0;

    for (var i = 0; i < intArr.length; i++) {
      var j = i;
      while (j < intArr.length && intArr[j] <= intArr[j + 1]) {
        j++;
        if(j+1 == null) break;
      }

      if (j - i > end - start) {
        start = i;
        end = j;
      }
    }
    console.log(intArr.slice(start, end+1));
    return intArr.slice(start, end+1);
  }
};

var executer = {
  subSum: function () {
    console.log("sub sum executer");
    console.log(subSumInput.value);
    var arr = subSumInput.value.split(", ");
    console.log(arr);

    alert("Sub Sum: " + array.subSum(arr));
  },

  search: function () {
    console.log("searching");
    console.log(searchOption.value);
    var arr = searchInput.value.split(", ");
    console.log(arr);
    var res;
    switch (searchOption.value) {
      case 'max':
        res = "max: ";
        res += array.findMax(arr);
        break;
      case 'min':
        res = "nin: ";
        res += array.findMin(arr);
        break;
      case 'median':
        res = "median: "
        res += array.findMedian(arr);
        break;
    }
    alert(res);
  },

  select: function () {
    console.log("selecting");
    console.log(selectInput.value);
    var arr = selectInput.value.split(", ");
    console.log(arr);
    var res = array.selectMaxAscendingSubsequence(arr);
    alert("ascending subsequence: " + res);
  }
};

executeSubSum.addEventListener("mousedown", executer.subSum);
executeSearch.addEventListener("mousedown", executer.search);
executeSelect.addEventListener("mousedown", executer.select)
