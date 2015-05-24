var notepadData;
var settings;
//load all settings here, from background page
chrome.storage.sync.get(null, function(items) {
  notepadData = (items.notepadData)?items.notepadData:"";
});


function popupUnloaded(){
  console.log("popup unloaded");

  chrome.storage.sync.set({
    notepadData: notepadData,

  }, function() {
    console.log("data saved");
  });
}

function updateNotepadData(data){
  notepadData = data;
}
function getNotepadData(){
  return notepadData;
}
// //var a = 10;
// //console.log(a);
// var list_of_functions;
// var functions_definition;
// /**
//  * Listens for the app launching, then creates the window.
//  *
//  * @see http://developer.chrome.com/apps/app.runtime.html
//  * @see http://developer.chrome.com/apps/app.window.html
//
// chrome.app.runtime.onLaunched.addListener(function(launchData) {
//   chrome.app.window.create(
//     'index.html',
//     {
//       id: 'mainWindow',
//       bounds: {width: 800, height: 600}
//     }
//   );
// });
//  */
//
//  chrome.storage.sync.get(
//     null
//   , function(items) {
//       list_of_functions = items.functionsListString.split(",");
//       functions_definition = items.functionsDefinitionString;
//       console.log(list_of_functions);
//
//   });
//
//  var updateStorage = function(){
//  	chrome.storage.sync.get(
//     null
//   , function(items) {
//       list_of_functions = items.functionsListString.split(",");
//       functions_definition = items.functionsDefinitionString;
//       console.log(list_of_functions);
//
//   });
//  };
