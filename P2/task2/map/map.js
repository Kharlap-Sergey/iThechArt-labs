function map(array, callback) {
  var result = [];
  for (var elem of array) {
    result.push(callback(elem));
  }
  return result;
}

function generator(value) {
  return value ** 2;
}

arr = [1, 2, 3, 4, 5];
console.log(map(arr, generator));
