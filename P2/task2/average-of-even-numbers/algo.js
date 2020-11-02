//import {str} from '/linear-fold.js';

function f(array, callback) {
  initialValue = arguments[2];
  previousValue = initialValue;
  var result;
  for (var i = 0; i < array.length; i++) {
    currentValue = array[i];
    result = callback(previousValue, currentValue, i, array);
    previousValue = result == null ? currentValue : result;
  }
  return result;
}


function calculateAverage(arr){
  calculateSum = function(previousValue, currentValue){
    return previousValue + currentValue;
  }
  calculatedSum = f(arr, calculateSum, 0);

  return calculatedSum / arr.length;
}


arr = [1, 2, 3];
console.log(calculateAverage(arr));
