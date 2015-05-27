var storedLinks;
function showLinks(){
  //user input shall be used to add link and search for existing links
  storedLinks = bg.getLinksData();
  var localStoredLinks = storedLinks;

  //user input
  var userInput = document.createElement("input");
  var prevInput = "";
  userInput.placeholder = "Filter OR Add new link";
  userInput.id = "linksInput";
  userInput.addEventListener('keyup',function(){
    var val = userInput.value.trim().toLowerCase();
    if(val !== prevInput){
      prevInput = val;
      document.getElementById('LinkSelectList').innerHTML = "";

      for(var i=storedLinks.length - 1 ;i >= 0;i--){
        if(storedLinks[i].toLowerCase().search(val) >= 0){
          var linksOption = document.createElement("option");
          linksOption.text = storedLinks[i];
          var linkOptionImageURL = storedLinks[i].split("/")[0];
          linksOption.style.backgroundImage = "url('http://www.google.com/s2/favicons?domain="+linkOptionImageURL+"')";
          linksOption.className = 'linkOption';
          document.getElementById('LinkSelectList').appendChild(linksOption);
        }

      }
    }

  });

  //Add button
  var addLinkButton = document.createElement("button");
  addLinkButton.innerHTML = "+";
  addLinkButton.addEventListener('click',function(){
    bg.addLinksData(userInput.value);
    storedLinks = bg.getLinksData();
    document.getElementById('linksInput').value = "";
    renderList();
  });

  //remove button
  var removeLinkButton = document.createElement("button");
  removeLinkButton.innerHTML = "-";
  removeLinkButton.addEventListener('click',function(){
    var select = document.getElementById('LinkSelectList');
    for(var i=0;i<select.options.length;i++){
      if(select.options[i].selected)
        bg.removeLink(select.options[i].text);
    }
    storedLinks = bg.getLinksData();
    document.getElementById('linksInput').value = "";
    renderList();
  });

  //save current page button
  var saveCurrentPageButton = document.createElement("button");
  saveCurrentPageButton.innerHTML = "+ current page";
  saveCurrentPageButton.addEventListener("click",function(){
    chrome.tabs.getSelected(function(tab){
      bg.addLinksData(tab.url);
      renderList();
    });

  });

  //List with all links
  var selectList = document.createElement('select');
  selectList.id = 'LinkSelectList';
  selectList.multiple = 'multiple';
  selectList.addEventListener("dblclick",function(){
    //console.log("selected "+selectList.value);
    var url;
    if(selectList.value.search("http")>=0)
      url = selectList.value;
    else {
      url = "http://"+selectList.value;
    }
    chrome.tabs.create({active: true, url: url});
  });



  //Appending everything in order to the UI
  document.getElementById('result').innerHTML = "";
  document.getElementById('result').appendChild(userInput);
  document.getElementById('result').appendChild(addLinkButton);
  document.getElementById('result').appendChild(removeLinkButton);
  document.getElementById('result').appendChild(saveCurrentPageButton);
  document.getElementById('result').appendChild(selectList);

  renderList();
  userInput.focus();
}

function renderList(){
  document.getElementById('LinkSelectList').innerHTML = "";
  for(var i=storedLinks.length - 1 ;i >= 0;i--){
    var linkOption = document.createElement('option');
    if( i == storedLinks.length - 1){
      linkOption.selected = 'selected';
    }
    linkOption.text = storedLinks[i];
    var linkOptionImageURL = (storedLinks[i])?storedLinks[i].split("/")[0]:"";
    linkOption.style.backgroundImage = "url('http://www.google.com/s2/favicons?domain="+linkOptionImageURL+"')";
    linkOption.className = 'linkOption';
    document.getElementById('LinkSelectList').appendChild(linkOption);
  }
}
