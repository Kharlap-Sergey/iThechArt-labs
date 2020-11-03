import {f} from './linear-fold.js';

function calculateAverage(arr){
  var calculateSum = function(previousValue, currentValue){
    return previousValue + currentValue;
  }
  var calculatedSum = f(arr, calculateSum, 0);
  return calculatedSum / arr.length;
}


var arr = [1, 2, 3];
console.log(calculateAverage(arr));
