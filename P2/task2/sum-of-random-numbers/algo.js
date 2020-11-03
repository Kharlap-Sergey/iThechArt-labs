export function unfold(callback, initialValue) {
  var result = [];
  var value = [initialValue];
  while (true) {
    value = callback(value[0]);

    if (!value) break;
    result.push(value[1]);
  }
  return result;
}

export function fold(array, callback) {
  var initialValue = arguments[2];
  var previousValue = initialValue;
  var result;
  for (var i = 0; i < array.length; i++) {
    var currentValue = array[i];
    result = callback(previousValue, currentValue, i, array);
    previousValue = result == null ? currentValue : result;
  }
  return result;
}
