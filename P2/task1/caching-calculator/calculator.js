var executeBut = document.querySelector("#executer");
var numberA = document.querySelector("#input1");
var numberB = document.querySelector("#input2");
var operator = document.querySelector("#operation");

var cacheCalculator = {
    cache: {},
    getOrSetCache: function (val1, val2, operatino) {
        var cacheKey = operatino + val1 + val2;

        if (arguments.length == 4) {
            return this.cache[cacheKey];
        }

        this.cache[cacheKey] = arguments[3];
    },

    executeOperation: function (val1, val2, opearation) {
        var val1 = parseFloat(val1);
        var val2 = parseFloat(val2);
        var res;
        switch (opearation) {
            case '+':
                res = val1 + val2;
                break;
            case '-':
                res = val1 - val2;
                break;
            case '*':
                res = val1 * val2;
                break;
            case "/":
                res = val1 / val2;
                break;
        }

        return res;
    },

    calculate: function (val1, val2, opearation) {
        var result = this.getOrSetCache(val1, val2, opearation);

        if (!result) {
            var result = this.executeOperation(val1, val2, opearation);
            this.getOrSetCache(val1, val2, opearation, result);
        }

        return result;
    },
}

var executer = {
    calculate: function () {
        console.log("executin was started");
        var result = cacheCalculator.calculate(numberA.value, numberB.value, operator.value);
        alert("result is " + result);
    }
}

console.log(executeBut);
executeBut.addEventListener("click", executer.calculate);

