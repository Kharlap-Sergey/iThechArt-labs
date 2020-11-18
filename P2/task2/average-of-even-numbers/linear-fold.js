export function f(array, callback, initialValue = null) {
  var previousValue = initialValue;
  var result;
  for (var i = 0; i < array.length; i++) {
    var currentValue = array[i];
    result = callback(previousValue, currentValue, i, array);
    previousValue = result ?? currentValue;
  }
  return result;
}
