(function () {
  const executeSubSum = document.querySelector(".sub-sum__exec");
  const subSumInput = document.querySelector(".sub-sum__data-input");

  const executeSearch = document.querySelector(".search__exec");
  const searchInput = document.querySelector(".search__data-input");
  const searchOption = document.querySelector("#ssearch__type-input-selecter");

  const executeSelect = document.querySelector(".selevtion__exec");
  const selectInput = document.querySelector(".selevtion__data-input");

  // function toIntArray(arr) {
  //   var intArr = [];
  //   for (var i = 0; i < arr.length; i++) {
  //     var elem = arr[i];
  //     intArr.push(+elem);
  //   }

  //   return intArr;
  // }
  function toIntArray(arr) {
    return arr.map((currVal) => +currVal);
  }

  let array = {
    subSum: function (arr) {
      let sum = 0;
      let maxSum = +arr[0];
      for (let i = 0; i < arr.length; i++) {
        let elem = arr[i];
        sum = sum + +elem;
        maxSum = maxSum < sum ? sum : maxSum;
        if (sum < 0) {
          sum = 0;
        }
      }

      return maxSum;
    },

    findMax: function (arr) {
      return Math.max.apply(null, arr);
    },

    findMin: function (arr) {
      return Math.min.apply(null, arr);
    },

    findMedian: function (arr) {
      let intArr = toIntArray(arr);
      intArr.sort();
      let median = intArr[Math.floor(intArr.length / 2)];
      return median;
    },

    selectMaxAscendingSubsequence: function (arr) {
      let intArr = toIntArray(arr);
      intArr.push(null);
      let start = 0;
      let end = 0;

      for (let i = 0; i < intArr.length; i++) {
        let j = i;
        while (j < intArr.length && intArr[j] <= intArr[j + 1]) {
          j++;
          if (j + 1 == null) break;
        }

        if (j - i > end - start) {
          start = i;
          end = j;
        }
      }
      console.log(intArr.slice(start, end + 1));
      return intArr.slice(start, end + 1);
    },
  };

  let executer = {
    subSum: function () {
      console.log("sub sum executer");
      console.log(subSumInput.value);
      let arr = subSumInput.value.split(", ");
      console.log(arr);

      alert("Sub Sum: " + array.subSum(arr));
    },

    search: function () {
      console.log("searching");
      console.log(searchOption.value);
      let arr = searchInput.value.split(", ");
      console.log(arr);
      let res;
      switch (searchOption.value) {
        case "max":
          res = "max: ";
          res = res + array.findMax(arr);
          break;
        case "min":
          res = "nin: ";
          res = res + array.findMin(arr);
          break;
        case "median":
          res = "median: ";
          res = res + array.findMedian(arr);
          break;
      }
      alert(res);
    },

    select: function () {
      console.log("selecting");
      console.log(selectInput.value);
      let arr = selectInput.value.split(", ");
      console.log(arr);
      let res = array.selectMaxAscendingSubsequence(arr);
      alert("ascending subsequence: " + res);
    },
  };

  executeSubSum.addEventListener("mousedown", executer.subSum);
  executeSearch.addEventListener("mousedown", executer.search);
  executeSelect.addEventListener("mousedown", executer.select);
})();
