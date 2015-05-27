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
    clearResult();
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
