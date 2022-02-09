var defaultGameData = {
  finances: 0,
  wage: 8,
  bills: 100,
  stressTotal: 0,
  relaxation: 1,
  education: 0,
  study: 1,
  job: 0,
  workClicks: 0,
  workStressGain: 2,
  daysToBill: 28,
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
  job: 0,
  workClicks: 0,
  workStressGain: 2,
  daysToBill: 28,
  vim: 0,
  vimPerClick: 1,
  vimPerClickCost: 10,
  vigor: 0,
  vigorPerClick: 1,
  vigorCost: 100,
  gainVimClicks: 0
}

var defaultUnlockedTabs = {
  mundane: false,
  mundaneLeisure: false,
  mundaneClasses: false,
  mundaneAccoutrements: false,
  occult: false
}

var unlockedTabs = {
  mundane: false,
  mundaneLeisure: false,
  mundaneClasses: false,
  mundaneAccoutrements: false,
  occult: false
}

var defaultAccoutrementsPurchases = {
  radio: false,
  furnitureUnlock: false,
  furniture: false,
  bwTVUnlock: false,
  bwTV: false,
  fordFairlaneUnlock: false,
  fordFairlane: false,
  nightClassesUnlock: false
}

var accoutrementsPurchases = {
  radio: false,
  furnitureUnlock: false,
  furniture: false,
  bwTVUnlock: false,
  bwTV: false,
  fordFairlaneUnlock: false,
  fordFairlane: false,
  nightClassesUnlock: false
}

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("tendencySave", JSON.stringify(gameData))
  localStorage.setItem("tendencySaveUnlockTabs", JSON.stringify(unlockedTabs))
  localStorage.setItem("tendencySavePurchases", JSON.stringify(accoutrementsPurchases))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("tendencySave"))
var savegameTabs = JSON.parse(localStorage.getItem("tendencySaveUnlockTabs"))
var savegamePurchases = JSON.parse(localStorage.getItem("tendencySavePurchases"))
if (savegame !== null) {
  gameData = savegame
}
if (savegameTabs !== null) {
  unlockedTabs = savegameTabs
}
if (savegamePurchases !== null) {
  accoutrementsPurchases = savegamePurchases
}

function fullReset() {
  //Dirty way to clone values without setting as a reference
  gameData = JSON.parse(JSON.stringify(defaultGameData))
  //reset unlocked tabs as well
  unlockedTabs = JSON.parse(JSON.stringify(defaultUnlockedTabs))
  accoutrementsPurchases = JSON.parse(JSON.stringify(defaultAccoutrementsPurchases))
  //hide tabs not unlocked
  document.getElementById("defaultOpen").click();
  document.getElementById("occultTabButton").style.display="none"
  document.getElementById("regularMundaneWrapper").style.display="none"
  document.getElementById("relaxation").style.display="none"
  document.getElementById("initialStateWrapper").style.display="inline"
  document.getElementById("radioBuyButton").style.display="inline"
  hidebuttons = document.getElementsByClassName("unlockableAccoutrementsButton");
  for (i = 0; i < hidebuttons.length; i++) {hidebuttons[i].style.display="none"}
  document.getElementById("study").style.display="none"
  document.getElementById("institution").style.display="none"
  document.getElementById("education").style.display="none"
  document.getElementById("operatorJobButton").style.display="none"
  //reset styling changes if any
  document.getElementById("stress").style.color = "black"
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
  document.getElementById("relaxationText").innerHTML = "Relaxation: " + gameData.relaxation
  document.getElementById("finances").innerHTML = "Finances: $" + gameData.finances
  document.getElementById("stress").innerHTML = "Stress: " + gameData.stressTotal
  document.getElementById("daysRemainingSpan").innerHTML = gameData.daysToBill
  document.getElementById("studyText").innerHTML = "Study: " + gameData.study
  document.getElementById("education").innerHTML = "Education: " + gameData.education
  //OCCULT TAB
  document.getElementById("vimGained").innerHTML = gameData.vim + " VIM"
  document.getElementById("vimPerClickUpgrade").innerHTML = "Improved Methods " 
  + gameData.vimPerClick + " (" + gameData.vimPerClickCost + " Vim)"
  document.getElementById("vigorGained").innerHTML = gameData.vigor + " VIGOR"
  
  displayAccoutrements()
}

function displayAccoutrements() {
  let str = "Accoutrements: "
  let count = 0
  if (accoutrementsPurchases.radio) {
    count+=1
    str += "Radio"
  }
  if (accoutrementsPurchases.furniture) {
    if (count > 0) {str += ", "}
    count+=1
    str += "Furniture"
  }
  if (accoutrementsPurchases.bwTV) {
    if (count > 0) {str += ", "}
    count+=1
    str += "Television"
  }
  if (accoutrementsPurchases.fordFairlane) {
    if (count > 0) {str += "<br>"}
    count+=1
    str += "Transport: Ford Fairlane"
  }
  document.getElementById("accoutrementsList").innerHTML = str
}