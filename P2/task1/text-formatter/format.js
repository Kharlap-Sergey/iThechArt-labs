const input = document.querySelector("#input");
const executerBut = document.querySelector("#executeBut");
const option = document.querySelector("#formatOpt");

formatter = {
  splitByChar: function (str) {
    return str.split("");
  },
  splitByWord: function (str) {
    let res = str.split(/\W+/);
    console.log(res);
    return res;
  },
  splitBySentances: function (str) {
    let res = str.split(/[.?! ]+/);
    console.log(res);
    return res;
  },
};

executer = {
  format: function () {
    console.log("execution was started");
    console.log(input.value);
    let result;
    switch (option.value) {
      case "none":
        result = input.value;
        break;
      case "word":
        result = formatter.splitByWord(input.value).join("\n");
        break;
      case "letter":
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
