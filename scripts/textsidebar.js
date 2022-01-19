function addMessage(text) {
  if(typeof text == 'undefined') {
    console.log("Undefined Text")
    return;
  }
  else {
    const div = document.createElement('div');
    div.className = "text"
    div.innerHTML = text
    document.getElementById("textBar").prepend(div);
    
		clearBottomText();
  }
}

function clearBottomText() {
  var bottom = document.getElementById("textBarFadeOut").getBoundingClientRect().bottom;
  var texts = document.getElementsByClassName('text')
  
  Array.from(texts).forEach((textMessage) => {
    var top = textMessage.getBoundingClientRect().top;
    if (top > bottom) {
      textMessage.remove()
    }
  });
}

function clearAllText() {
  var texts = document.getElementsByClassName('text')
  Array.from(texts).forEach((textMessage) => {
    textMessage.remove()
  });
}