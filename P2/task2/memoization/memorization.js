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

function sum(x, y) {
  return x + y;
}

var lazySum = memoriztion(sum);
console.log(lazySum(10, 6));
