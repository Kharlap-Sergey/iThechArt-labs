var partial = function(fn){
  console.log(arguments);

  var args = []
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i]);
  }

  return function(){
    return fn(args, arguments);
  }
  //return fn.bind(null, args); можно так же
}

var someFunction = function() {
  var result = "";
  for(elem of arguments){
    if(elem[Symbol.iterator]){
      for(elem2 of elem)
        result += elem2;
    }

    else result += elem;
  }
  return result;
}

var someFunc1 = partial(someFunction, 2, 3, 4);
var someFunc2 = partial(someFunction, 1, 2);

console.log(someFunc1(7, 8, 9, 10));
console.log(someFunc2(7, 8, 10))
