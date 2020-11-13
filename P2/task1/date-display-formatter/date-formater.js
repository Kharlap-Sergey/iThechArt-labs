var executeBut = document.querySelector("#executer");
var options = document.querySelector("#options");
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");
var input3 = document.getElementById("input3");
var input2Info = document.getElementById("input2-info");
var input3Info = document.getElementById("input3-info");

var dateFormater = {
  getDateStirngFromDate: function (date) {
    var regex = "MM/DD/YYYY";
    if (arguments[1]) {
      regex = arguments[1];
    }
    console.log("regex for outputing " + regex);
    var result = "";
    var mf = false,
      df = false,
      yf = false;
    for (var i = 0; i < regex.length; i++) {
      switch (regex[i]) {
        case "M":
          if (mf) {
            break;
          }
          result += date.getMonth();
          mf = true;
          break;
        case "D":
          if (df) {
            break;
          }
          result += date.getDate();
          df = true;
          break;
        case "Y":
          if (yf) {
            break;
          }
          console.log("year " + date.getFullYear());
          result += date.getFullYear();
          yf = true;
          break;
        default:
          result += regex[i];
      }
    }
    return result;
  },

  getDateFromeString: function (str) {
    var regex = "MMDDYYYY";
    if (arguments[1]) {
      regex = arguments[1];
    }
    console.log("string for format " + str);
    var month = 0,
      day = 0,
      year = 0;

    for (var i = 0; i < regex.length; i++) {
      switch (regex[i]) {
        case "M":
          console.log(str[i]);
          month = month * 10 + +str[i];
          break;
        case "D":
          console.log(str[i]);
          day = day * 10 + +str[i];
          break;
        case "Y":
          year = year * 10 + +str[i];
          break;
      }
    }
    console.log(year, day, month);
    return (dateTime = new Date(year, month, day));
  },

  getDateFromeMs: function (ms) {
    return new Date(ms);
  },
};
var executer = {
  format: function () {
    var result;
    switch (+options.value) {
      case 1:
        var ms = +input1.value;
        console.log("format from ms = " + ms);
        result = dateFormater.getDateFromeMs(ms);
        result = dateFormater.getDateStirngFromDate(result);
        break;
      case 2:
        console.log("format from ms = " + ms);
        result = dateFormater.getDateFromeString(input1.value);
        result = dateFormater.getDateStirngFromDate(result);
        break;
      case 3:
        result = dateFormater.getDateFromeString(input1.value, input2.value);
        result = dateFormater.getDateStirngFromDate(result);
        break;
      case 4:
        console.log("regex for outputing " + input3.value);
        result = dateFormater.getDateFromeString(input1.value, input2.value);
        result = dateFormater.getDateStirngFromDate(result, input3.value);
        break;
    }

    alert("fomrated string is " + result);
  },
};

function optionsChanged() {
  console.log("options was changet");
  switch (+options.value) {
    case 1:
      input2.style.display = "none";
      input3.style.display = "none";
      input2Info.style.display = "none";
      input3Info.style.display = "none";
      break;
    case 2:
      input2.style.display = "none";
      input3.style.display = "none";
      input2Info.style.display = "none";
      input3Info.style.display = "none";
      break;
    case 3:
      input2.style.display = "block";
      input3.style.display = "none";
      input2Info.style.display = "block";
      input3Info.style.display = "none";
      break;
    case 4:
      input2.style.display = "block";
      input3.style.display = "block";
      input2Info.style.display = "block";
      input3Info.style.display = "block";
  }
}

console.log(options);
executeBut.addEventListener("click", executer.format);
options.addEventListener("change", optionsChanged);
