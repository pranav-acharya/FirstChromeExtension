var ENTER_KEYCODE = 18;//enter keycode value for keyup event
window.onload = function(){

  document.querySelector("#searchField").addEventListener("keyup",function(){
    if(event.keyCode == ENTER_KEYCODE)
      processInput(document.getElementById('searchField').value);
  });
  document.querySelector("#searchButton").addEventListener("click",function(){
    processInput(document.getElementById('searchField').value);
  });

  //document.querySelector("#myFrame").src = "http://www.w3schools.com/tags/ref_colorpicker.asp";
 
}

function processInput(input){
  clearResult();
  var temp = input.split(" ");
  if(temp[0].toLowerCase() == "define"){
    var actual_input = input.replace(temp[0]+" ","");
    define(actual_input);
  }
  else if(temp[0].toLowerCase() == "wiki"){
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
  ajax('GET',url,'xml', function(xhr){
    console.log("done");
    var a = xhr.responseXML.getElementsByTagName('message')[0].firstChild.nodeValue;
    output(a);
  });
}







/*************HEPLER FUNCTIONS******************/
// type - GET/POST
// url = URL
// response_type = document, XML, json, text
// callback - function to be called after onload
function ajax(type,url,response_type,callback){
  var xhr = new XMLHttpRequest();
  /*xhr.onload = function(xhr) {
    callback(xhr);
  };*/
  
  xhr.open(type, url);
  xhr.responseType = response_type;
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200){
      callback(xhr);
    }else if(xhr.status === 404){
      errorMessage("The page is missing. Try a different input");
    }else if(xhr.status === 403){
      errorMessage("Forbidden. Please check your firewall settings.");
    }else{
      //errorMessage("An error occurred");
    }
    
  }
  xhr.send();
  document.getElementById("result").innerHTML="<div class='Loading'><span>Loading</span></div>";
}

function output(output,input){
  if(output.length === 0 ){
    chat(input);
  }
  else if(typeof output === 'string'){
    document.getElementById("result").innerHTML="<div class='answerSingle'><span>"+output+"</span></div>";
  }else{
    document.getElementById("result").innerHTML = "";
    var answer = document.createElement("div");
    answer.className='answer';
    for(var i=0;i<output.length;i++){
      answer.appendChild(output[i]);
    }
    document.getElementById('result').appendChild(answer);
  }
  

}

function errorMessage(errorMsg){
  document.getElementById("result").innerHTML="<div class='error'><span>"+errorMsg+"</span></div>";
}

function clearResult(){
  document.getElementById('result').innerHTML = "";
}
