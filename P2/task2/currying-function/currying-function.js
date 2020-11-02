// var curry = function(fn, temp){
//   return function(){
//     var args = []
//     for(var i = 0; i < arguments.length; i++){
//       args.push(arguments[i]);
//     }
//     if(fn.length > args.length){
//       const t = fn.bind(null, ...args);
//       return curry(t);
//     }
//     else{
//       return fn(args);
//     }
//   }
// }

var curry = function curry(fn, ctx){
  return function cf(){
    var args = []
    for(var i = 0; i < arguments.length; i++){
      args.push(arguments[i]);
    }
    return (args.length >= fn.length) ?
      fn.apply(null, args) :
      function () {
        return cf.apply(ctx, args.concat([].slice.call(arguments)));
      };
  };
}

function sum(x, y, z, t){
  result = 0;
  for(elem of arguments){
    if(elem[Symbol.iterator]){
      for(elem2 of elem)
        result += elem2;
    }
    else result += elem;
  }
  return x+y+z+t;
  return result;
}

var curry1 = curry(sum);
console.log(curry1(1,2)(3, 4));
