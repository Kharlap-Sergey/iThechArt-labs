function lazyFunc(fn) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return function () {
    return fn.apply(this, args);
  };
}

function sum(x, y) {
  return x + y;
}

var lazySum = lazyFunc(sum, 6, 10);
console.log(lazySum);
console.log(lazySum());
