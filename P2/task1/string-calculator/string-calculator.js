const input = document.querySelector("#input");
const executerBut = document.querySelector("#executer");

stringCalculator = {
    determAndCalc(operator, val1, val2) {
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
        return a ** b;
    },

    calculate: function (str) {
        console.log("inp " + str);  
        let l = -1;
        let r = -1;
        let openBreckConunt = 0;
        let buf1 = "";
        for (i = 0; i < str.length; i++) {
            console.log(str[i]);
            if(openBreckConunt == 0){
                buf1 += str[i];
            }
            if (str[i] == '(') {
                openBreckConunt++;
                l = l == -1 ? i : l;
            }
            if (str[i] == ')') {
                openBreckConunt--;
                if (openBreckConunt == 0) {
                    r = i;
                    subss = str.substr(l + 1, r - l - 1);
                    console.log(subss);
                    let res = this.calculate(subss);
                    buf1 += res;
                }
            }
        }

        console.log(buuf.split(/\b/));запушит
        return buf1;
    },
};

executer = {
    calculate: function () {
        console.log("execution was started");
        console.log(input.value);

        let result = stringCalculator.calculate(input.value);

        alert(result);
    },
};

console.log(executerBut);
executerBut.addEventListener("click", executer.calculate);
