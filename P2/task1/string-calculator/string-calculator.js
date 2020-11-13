var input = document.querySelector("#input");
var executerBut = document.querySelector("#executer");

var stringCalculator = {
  determAndCalc: function (operator, val1, val2) {
    val1 = +val1;
    val2 = +val2;
    switch (operator) {
      case "+":
        return this.add(val1, val2);
      case "-":
        return this.subtract(val1, val2);
      case "/":
        return this.divide(val1, val2);
      case "*":
        return this.multiply(val1, val2);
      case "^":
        return this.pow(val1, val2);
    }
  },
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    return a / b;
  },
  pow: function (a, b) {
    return Math.pow(a, b);
  },

  calculate: function (str) {
    console.log("inp " + str);
    var l = -1;
    var r = -1;
    var openBreckConunt = 0;
    var buf1 = "";
    console.log("str len " + str.length);
    //execute (...)
    for (var i = 0; i < str.length; i++) {
      console.log(str[i] + " i " + i + " len " + str.length);

      if (str[i] == "(") {
        openBreckConunt++;
        l = l == -1 ? i : l;
      }
      if (openBreckConunt == 0) {
        buf1 += str[i];
      }
      if (str[i] == ")") {
        openBreckConunt--;
        if (openBreckConunt == 0) {
          r = i;
          subss = str.substr(l + 1, r - l - 1);
          console.log(subss);
          var res = this.calculate(subss);
          console.log("was ended calc part");
          buf1 += res;
        }
      }
    }

    //execute pows
    var cont = buf1.split(/\b/);
    while (true) {
      var exite = true;
      for (var i = 0; i < cont.length - 1; i++) {
        if (cont[i + 1] == "." || cont[i + 1] == ",") {
          var res = +(cont[i]) + cont[i + 2] / 10;
          console.log(cont);
          cont.splice(i, 3, res);
          console.log(cont);
          console.log("_---------_");
          exite = false;
          break;
        }
      }
      if (exite) break;
    }

    while (true) {
      var exite = true;
      for (var i = 0; i < cont.length - 1; i++) {
        if (cont[i + 1] == "^") {
          var res = this.determAndCalc(cont[i + 1], cont[i], cont[i + 2]);
          console.log(cont);
          cont.splice(i, 3, res);
          console.log(cont);
          console.log("_---------_");
          exite = false;
          break;
        }
      }

      if (exite) break;
    }

    //execute multiply and divide
    while (true) {
      var exite = true;
      for (var i = 0; i < cont.length - 1; i++) {
        if (cont[i + 1] == "*" || cont[i + 1] == "/") {
          var res = this.determAndCalc(cont[i + 1], cont[i], cont[i + 2]);
          console.log(cont);
          cont.splice(i, 3, res);
          console.log(cont);
          console.log("_---------_");
          exite = false;
          break;
        }
      }
      if (exite) break;
    }

    //execute add and subtract
    while (true) {
      var exite = true;
      for (var i = 0; i < cont.length - 1; i++) {
        if (cont[i + 1] == "+" || cont[i + 1] == "-") {
          var res = this.determAndCalc(cont[i + 1], cont[i], cont[i + 2]);
          console.log(cont);
          cont.splice(i, 3, res);
          console.log(cont);
          console.log("_---------_");
          exite = false;
          break;
        }
      }
      if (exite) break;
    }

    console.log(cont[0]);
    return cont[0];
  },
};

executer = {
  calculate: function () {
    console.log("execution was started");
    console.log(input.value);

    var result = stringCalculator.calculate(input.value);

    alert(result);
  },
};

console.log(executerBut);
executerBut.addEventListener("click", executer.calculate);
