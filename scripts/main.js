var defaultGameData = {
  vim: 0,
  vimPerClick: 1,
  vimPerClickCost: 10,
  vigor: 0,
  vigorPerClick: 1,
  vigorCost: 100
}

var gameData = {
  vim: 0,
  vimPerClick: 1,
  vimPerClickCost: 10,
  vigor: 0,
  vigorPerClick: 1,
  vigorCost: 100
}

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("tendencySave", JSON.stringify(gameData))
}, 15000)
var savegame = JSON.parse(localStorage.getItem("tendencySave"))
if (savegame !== null) {
  gameData = savegame
}

function fullReset() {
  //Dirty way to clone values without setting as a reference
  gameData = JSON.parse(JSON.stringify(defaultGameData))
}

function openTab(event, tabName) {
  var i, tabContent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

function updateDisplayValues() {
  document.getElementById("vimGained").innerHTML = gameData.vim + " VIM"
  document.getElementById("vimPerClickUpgrade").innerHTML = "Improved Methods " 
  + gameData.vimPerClick + " (" + gameData.vimPerClickCost + " Vim)"
  document.getElementById("vigorGained").innerHTML = gameData.vigor + " VIGOR"
}