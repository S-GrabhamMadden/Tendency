var defaultGameData = {
  finances: 0,
  wage: 8,
  bills: 100,
  stressTotal: 0,
  relaxation: 1,
  education: 0,
  study: 1,
  workClicks: 0,
  workStressGain: 2,
  vim: 0,
  vimPerClick: 1,
  vimPerClickCost: 10,
  vigor: 0,
  vigorPerClick: 1,
  vigorCost: 100,
  gainVimClicks: 0
}

var gameData = {
  finances: 0,
  wage: 8,
  bills: 100,
  stressTotal: 0,
  relaxation: 1,
  education: 0,
  study: 1,
  workClicks: 0,
  workStressGain: 2,
  vim: 0,
  vimPerClick: 1,
  vimPerClickCost: 10,
  vigor: 0,
  vigorPerClick: 1,
  vigorCost: 100,
  gainVimClicks: 0
}

var unlockedTabs = {
  mundane: false,
  mundaneLeisure: false,
  mundaneClasses: false,
  mundaneAccoutrements: false,
  occult: false
}

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("tendencySave", JSON.stringify(gameData))
  localStorage.setItem("tendencySaveUnlockTabs", JSON.stringify(unlockedTabs))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("tendencySave"))
var savegameTabs = JSON.parse(localStorage.getItem("tendencySaveUnlockTabs"))
if (savegame !== null) {
  gameData = savegame
}
if (savegameTabs !== null) {
  unlockedTabs = savegameTabs
}

function fullReset() {
  //Dirty way to clone values without setting as a reference
  gameData = JSON.parse(JSON.stringify(defaultGameData))
  //reset unlocked tabs as well
  unlockedTabs.mundane = false;
  unlockedTabs.mundaneLeisure = false;
  unlockedTabs.occult = false;
  //hide tabs not unlocked
  document.getElementById("defaultOpen").click();
  document.getElementById("occultTabButton").style.display="none"
  document.getElementById("regularMundaneWrapper").style.display="none"
  document.getElementById("relaxation").style.display="none"
  document.getElementById("initialStateWrapper").style.display="inline"
  clearAllText()
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
  //MUNDANE TAB
  document.getElementById("wageText").innerHTML = "Wage: $" + gameData.wage
  document.getElementById("finances").innerHTML = "Finances: $" + gameData.finances
  document.getElementById("stress").innerHTML = "Stress: " + gameData.stressTotal
  //OCCULT TAB
  document.getElementById("vimGained").innerHTML = gameData.vim + " VIM"
  document.getElementById("vimPerClickUpgrade").innerHTML = "Improved Methods " 
  + gameData.vimPerClick + " (" + gameData.vimPerClickCost + " Vim)"
  document.getElementById("vigorGained").innerHTML = gameData.vigor + " VIGOR"
}