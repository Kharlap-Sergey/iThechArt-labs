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

function curry_modern(func){
  return function curried(...args){
    if(func.length > args.length){
      return function(...args2){
        return curried.apply(this, args.concat(args2));
      }
    }
    return func.apply(this, args);
  }
}

function sum(x, y, z, t) {
  return x + y + z + t;
}

var curry1 = curry_modern(sum);
console.log(typeof(curry1));
console.log(curry1(1, 2)(4, 4));
