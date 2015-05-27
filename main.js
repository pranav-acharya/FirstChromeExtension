var ENTER_KEYCODE = 13;//enter keycode value for keyup event
var bg = chrome.extension.getBackgroundPage();

window.addEventListener("unload", function() {
  bg.popupUnloaded();
}, false);


window.onload = function(){

  document.querySelector("#searchField").addEventListener("keyup",function(){
    if(event.keyCode == ENTER_KEYCODE)
      processInput(document.getElementById('searchField').value);
  });

}

function processInput(input){
  clearResult();
  var temp = input.trim().split(" ");
  temp[0] = temp[0].toLowerCase();
  if(temp.length == 1){
    if(temp[0] == "note" || temp[0] == "notepad"){
      showNotepad();
      return;
    }else if(temp[0] == "links"){
      showLinks();
      return;
    }else if(temp[0] == "settings" || temp[0] == "preferences" ){
      chrome.tabs.create({ url: "options.html" });
    }
    //provide help to user for specific command
    for(var i=0;i<commands.length;i++){
      if(commands[i].name == temp[0]){
        var outputString = "<div id='desc'>"+commands[i].description+"</div>";
        outputString += "<div id='sub_desc'>"+commands[i].sub_description+"</div>";
        outputString += "<div id='example'>"+commands[i].example+"</div>";
        output(outputString);
        break;
      }else{
        if(i == commands.length -1 ){
          output("This command wasn't found!");
        }
      }
    }
  }
  else if(temp[0] == "define"){
    var actual_input = input.replace(temp[0]+" ","");
    define(actual_input);
  }
  else if(temp[0] == "wiki"){
    var actual_input = input.replace(temp[0]+" ","");
    wiki(actual_input);
  }
  else if(input.toLowerCase().indexOf("to")>0){
    currencyConversion(input);
  }
  else{
    chat(input);
  }

}



function define(input){
  var url = "http://google-dictionary.so8848.com/meaning?word="+input;
  ajax('GET',url,'document', function(xhr){
    var a = xhr.response.getElementsByClassName('std');
    output(a,input);
  });
}

function wiki(input){
  var url = "http://en.wikipedia.org/wiki/"+input;
  ajax('GET',url,'document', function(xhr){
    var a = xhr.response.getElementsByTagName('p');
    output(a);
  });
}

function converter(input){
  if(currencyConversion){

  }else if(others){

  }
}
function currencyConversion(input){
  var amount,from,to;
  //amount = 1600; from = "INR";to="USD";
  input = input.toUpperCase();
  var temp = input.split(" ");
  var indexOfTo;
  for(var i=0;i<temp.length;i++){
    if(temp[i] == "TO"){
      indexOfTo = i; break;
    }
  }

  from = temp[i-1];
  to = temp[i+1];
  if(temp.length == 3){//no AMOUNT is specified
    amount = 1;
  }
  else if(temp[i+2]){
    amount = temp[i+2];
  }else{
    amount = temp[0];
  }
  var url = "https://www.google.com/finance/converter?a="+amount+"&from="+from+"&to="+to;
  ajax('GET',url,'document', function(xhr){
    var a = xhr.response.getElementById('currency_converter_result').getElementsByClassName('bld')[0].innerHTML;
    a = a.split(" ");
    a[0] = a[0].replace(/^0+|0+$/g, "");
    a = a.join(" ");
    a = a.replace(/^0+|0+$/g, "");
    a = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " "+ from + " = ";
    a = "<span class='amount'>"+amount+"</span><span class='converted'>"+a+"</span>";
    output(a);
  });

}

function calc(input){

}

// 1.WHEREVER U HAVE A NUMBER U CAN REPLACE IT WITH A CALCULATOR EXPRESSION
// TEXT  - CASE INSENSITIVE
// MANUAL For Command in a.length == 0
// Keywords : define, wiki, (a) to (b), (expression) (a) to (b), (expression), scratchpad, quicklinks, Quote of the DAY with greeting
// chatterbot

function chat(input){
  var query = input.split(" ").join("+");
  var url = "http://www.botlibre.com/rest/botlibre/form-chat?instance=165&message="+query;
  ajax('GET',url,'XML', function(xhr){
    console.log("done");
    var a = xhr.responseXML.getElementsByTagName('message')[0].firstChild.nodeValue;
    output(a);
  });
}


//CALCULATOR
function calc(expression){

}
