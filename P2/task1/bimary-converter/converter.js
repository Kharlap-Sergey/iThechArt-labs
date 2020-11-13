const input = document.querySelector("#input");
const executerBut = document.querySelector("#executer");
const optionTo = document.querySelector("#option-to");
const optionFrom = document.querySelector("#option-from");

let converter = {
  convertFromDec: function (value, to) {
    console.log(typeof value);
    return value.toString(to);
  },
}

let executer = {
  transform: function () {
    console.log("execution was started");
    console.log(input.value);
    console.log(optionFrom.value);
    console.log(optionTo.value);

    let decNumbric = parseInt(input.value, +optionFrom.value);
    let result = converter.convertFromDec(decNumbric, +optionTo.value);

    alert(result);
  }
}

executerBut.addEventListener("click", executer.transform);

