var partial = function(fn){
  console.log(arguments);

  //var args = Array.prototype.slice.call(arguments, 1);
  var args = [];
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i]);
  }
  return function(){
    console.log(args);
    for(var elem of arguments){
      args.push(elem);
    }
    return fn.apply(this, args);
  }
}

var someFunction = function() {
  console.log(this);
  console.log(arguments);
  var result = "";
  for(elem of arguments){
    result += elem;
  }
  return result;
}

var someFunc1 = partial(someFunction, 2, 3, 4);
var someFunc2 = partial(someFunction, 1, 2);

console.log(someFunc1(7, 8, 9));
console.log(someFunc2(7, 8, 10))
