function unfold(callback, initialValue) {
  var result = [];
  value = [initialValue];
  while (true) {
    value = callback(value[0]);

    if (!value) break;
    result.push(value[1]);
  }
  return result;
}

function generator(value) {
  if (value % 2 != 0 || value < 0) return;
  var state = value / 2;
  var element = value;
  return [state, element];
}

console.log(unfold(generator, 120));
