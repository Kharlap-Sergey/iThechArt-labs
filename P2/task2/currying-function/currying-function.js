var curry = function curry(fn) {
  return function cf() {
    //var args = [].slice.call(arguments);
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    if (fn.length > args.length) {
      return function () {
        console.log(args);
        for (var elem of arguments) {
          args.push(elem);
        }
        return cf.apply(this, args);
      };
    } else {
      return fn.apply(null, args);
    }
  };
};

function sum(x, y, z, t) {
  return x + y + z + t;
}

var curry1 = curry(sum);
console.log(curry1(1, 2)(4, 4));
