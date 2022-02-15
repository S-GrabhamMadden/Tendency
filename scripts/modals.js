function makePopup(title, text, id = "") {
  const modalDiv = document.createElement('div');
  modalDiv.className = "modalClass"
  modalDiv.id = id
  modalDiv.innerHTML = 
  "<div class=\"modal\">\n" +
    "<div id=\"modalcontent\" class=\"modal-content\">\n" +
      //"<span class=\"close\">&times;</span>\n" +
      "<h3>"+title+"</h3>\n" +
      "<p>"+text+"</p>\n" +
    "</div>\n" +
  "</div>"
  
  document.getElementById("wrapper").prepend(modalDiv);
  
  /*var closeX = document.getElementsByClassName("close")[0]
  closeX.onclick = function() {
    var modals = document.getElementsByClassName("modalClass")
    Array.from(modals).forEach((modal) => {
      modal.remove()
    });
  }*/
}

function closeModals(id="") {
  if (id != "") {document.getElementById(id).remove()}
  var modals = document.getElementsByClassName("modalClass")
  modals[0].remove()
  /*Array.from(modals).forEach((modal) => {
    modal.remove()
  });*/
}

function addPopupOption(buttonText, tooltipText="", functionName="closeModals()") {
  const buttonDiv = document.createElement('div');
  buttonDiv.className = "tooltip"
  buttonDiv.innerHTML = "<button onclick=\"" + functionName +"\">" + buttonText + "</button><span class=\"tooltiptext\">" + tooltipText + "</span>"
  document.getElementById("modalcontent").append(buttonDiv);
}