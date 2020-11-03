import {unfold, fold} from "./algo.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandom(initValue){
  if(initValue == 0) return;
  return [initValue-1, getRandomInt(10)];
}

function sumArr(prev, curr){
  return prev + curr;
}

var arr= unfold(generateRandom, 10);
var sum = fold(arr, sumArr, 0);
console.log(sum);
