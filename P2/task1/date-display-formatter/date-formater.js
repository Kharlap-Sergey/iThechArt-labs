var executeBut = document.querySelector("#executer");
var options = document.querySelector("#options");
var input1 = document.getElementById("input1");

formater = {
    format: function(){
        
    }
}
executer = {
    format: function () {
        
    }
}

function optionsChanged(){
    console.log("options was changet");
    if(+options.value > 2){
        console.log("more 2");
        input1.style.display = "block";
    }
    else{
        input1.style.display = "none";
    }
}

console.log(options);
executeBut.addEventListener("click", executer.format);
options.addEventListener("change", optionsChanged);

