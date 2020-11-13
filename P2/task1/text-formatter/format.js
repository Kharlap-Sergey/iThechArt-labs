var input = document.querySelector("#input");
var executerBut = document.querySelector("#executeBut");
var option = document.querySelector("#formatOpt");

var formatter = {
  splitByChar: function (str) {
    return str.split("");
  },
  splitByWord: function (str) {
    var res = str.split(/\W+/);
    console.log(res);
    return res;
  },
  splitBySentances: function (str) {
    var res = str.split(/[.?!]+/);
    console.log(res);
    return res;
  },
};

var executer = {
  format: function () {
    console.log("execution was started");
    console.log(input.value);
    var result;
    switch (option.value) {
      case "none":
        result = input.value;
        break;
      case "word":
        result = formatter.splitByWord(input.value).join("\n");
        break;
      case "varter":
        result = formatter.splitByChar(input.value).join("\n");
        break;
      case "sentence":
        result = formatter.splitBySentances(input.value).join("\n");
        break;
    }
    alert(result);
  },
};

executerBut.addEventListener("click", executer.format);
