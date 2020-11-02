export function f(array, callback) {
  initialValue = arguments[2];
  previousValue = initialValue;
  for (var i = 0; i < array.length; i++) {
    currentValue = array[i];
    var result = callback(previousValue, currentValue, i, array);

    previousValue = result == null ? currentValue : result;
  }
}

var arr = [1, 23, "fsdafasd", [1, 2, 3]];

f(arr, (previousValue, currentValue) =>
  console.log(previousValue + currentValue)
);

console.log("reduce");

arr.reduce((previousValue, currentValue) => {
  console.log(previousValue + currentValue);
  return currentValue;
});
