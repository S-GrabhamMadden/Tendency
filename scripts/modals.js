function makePopup(title, text, options = []) {
  const modalDiv = document.createElement('div');
  modalDiv.className = title
  modalDiv.innerHTML = 
  "<div class=\"modal\">\n" +
    "<div id=\"modalcontent\" class=\"modal-content\">\n" +
      "<span class=\"close\">&times;</span>\n" +
      "<h3>"+title+"</h3>\n" +
      "<p>"+text+"</p>\n" +
    "</div>\n" +
  "</div>"
  
  document.getElementById("wrapper").prepend(modalDiv);
  
  var closeX = document.getElementsByClassName("close")[0]
  closeX.onclick = function() {
    var modals = document.getElementsByClassName(title)
    Array.from(modals).forEach((modal) => {
      modal.remove()
    });
  }
}