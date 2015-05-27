//notepad
function showNotepad(){
  var textarea = document.createElement("textarea");
  textarea.innerHTML = bg.getNotepadData();
  textarea.id = "notepad";
  textarea.addEventListener("keyup",function(){
    document.getElementById('bytesUsed').innerHTML = textarea.value.length + "/8192 bytes used";
    bg.updateNotepadData(textarea.value);
  });
  document.getElementById('result').innerHTML = "";
  document.getElementById('result').appendChild(textarea);
  document.getElementById('notepad').focus();
  var caretPos = document.getElementById('notepad').value.length;
  document.getElementById('notepad').setSelectionRange(caretPos, caretPos);

  var bytesInUse = document.createElement("p");
  bytesInUse.id = "bytesUsed";
  bytesInUse.innerHTML = textarea.value.length + "/8192 bytes used";
  document.getElementById('result').appendChild(bytesInUse);
}
