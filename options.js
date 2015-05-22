// Saves options to chrome.storage

var functions_definition_editor;
var functions_list_editor;


function save_options() {
  //var color = document.getElementById('color').value;
  //var likesColor = document.getElementById('like').checked;
  //var jsFunctionsDefinitionString = document.getElementById('textarea_view').value;
  var jsFunctionListString = document.getElementById('function_list_textarea').value;
  var jsFunctionsDefinitionString =functions_definition_editor.getValue();
  chrome.storage.sync.set({
    functionsDefinitionString: jsFunctionsDefinitionString,
    functionsListString: jsFunctionListString
    //favoriteCfolor: color,
    //likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';

    var bgPage = chrome.extension.getBackgroundPage();
    bgPage.updateStorage();

    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });


}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

  var header_height = 50;
  var button_height = 50;
  var function_definition_height = 90;

window.onload = function(){

  


  var textarea_view = document.getElementById('textarea_view');
  var window_height = window.innerHeight;
  textarea_view.style.height = window_height -button_height - header_height -function_definition_height + "px";



  chrome.storage.sync.get(
    null
  , function(items) {
    document.getElementById('textarea_view').value = items.functionsDefinitionString;
    document.getElementById('function_list_textarea').value = items.functionsListString;

    functions_definition_editor = CodeMirror.fromTextArea(document.getElementById("textarea_view"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter"
    });
    functions_definition_editor.setOption("theme", "ambiance");

  });


};
window.onresize = function(){
  var textarea_view = document.getElementById('textarea_view');
  var window_height = window.innerHeight;
  textarea_view.style.height = window_height - button_height - header_height - function_definition_height + "px";
};