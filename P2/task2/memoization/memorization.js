function memoriztion(fn) {
  var cache = {};

  function getCacheResult(key) {
    return cache[key];
  }
  function setCacheResult(key, val) {
    cache[key] = val;
  }

  return function () {
    var args = [];
    var cacheKey = "?";
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
      cacheKey += arguments[i] + "?";
    }

    var result = getCacheResult(cacheKey);
    if (!result) {
      result = fn.apply(this, args);
      setCacheResult(cacheKey, result);
    }
    return result;
  };
}

function memoriztion__modern(func, hash){
  let cache = {};
  return function memorized(...args){
    let key = hash(...args);
    if(!cache[key]){
      console.log("starting calculation");
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  }
}

function sum(x, y) {
  return x + y;
}

var lazySum = memoriztion__modern(sum, (...args)=>args.sort().join("$"));
console.log(lazySum(10, 6));
console.log(lazySum(10, 6));
console.log(lazySum(10, 7));
console.log(lazySum(7, 10));