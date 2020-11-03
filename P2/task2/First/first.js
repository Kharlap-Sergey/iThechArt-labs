function first(array, func){
  var result = null;

  for(var elem of array){
    if(func(elem)){
      result = elem;
      break;
    }
  }

  return result;
}

arr = [1, 2, 3, 4, 5];
function isDivideByFoure(number){
  return number % 2 == 0;
}

console.log(first(arr, isDivideByFoure))
