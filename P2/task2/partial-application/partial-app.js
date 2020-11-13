var partial = function (fn) {
  console.log(arguments);

  //var args = Array.prototype.slice.call(arguments, 1);
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return function () {
    console.log(args);
    for (var elem of arguments) {
      args.push(elem);
    }
    return fn.apply(this, args);
  };
};

function partial_modern(func, ...args){
  console.log(args);
  return function(...args2){
    return func.apply(this, args.concat(args2));
  }
}

var someFunction = function () {
  console.log(this);
  console.log(arguments);
  var result = "";
  for (let elem of arguments) {
    result += elem;
  }
  return result;
};

var someFunc1 = partial_modern(someFunction, 2, 3, 4);
var someFunc2 = partial_modern(someFunction, 1, 2);

console.log(someFunc1(7, 8, 9));
console.log(someFunc2(7, 8, 10));
