var input = document.querySelector("#input");
var executerBut = document.querySelector("#executer");
var optionTo = document.querySelector("#option-to");
var optionFrom = document.querySelector("#option-from");

var converter = {
  convertFromDec: function (value, to) {
    console.log(typeof value);
    return value.toString(to);
  },
}

var executer = {
  transform: function () {
    console.log("execution was started");
    console.log(input.value);
    console.log(optionFrom.value);
    console.log(optionTo.value);

    var decNumbric = parseInt(input.value, +optionFrom.value);
    var result = converter.convertFromDec(decNumbric, +optionTo.value);

    alert(result);
  }
}

executerBut.addEventListener("click", executer.transform);

