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

function gainVim() {
  gameData.vim += gameData.vimPerClick
  updateDisplayValues()
}

function vigorToVim() {
  gameData.vim += gameData.vigor
  updateDisplayValues()
}

function buyVimPerClick() {
  if (gameData.vim >= gameData.vimPerClickCost) {
    gameData.vim -= gameData.vimPerClickCost
    gameData.vimPerClick += 1
    gameData.vimPerClickCost *= 2
    updateDisplayValues()
  }
}

function gainVigor() {
  if (gameData.vim >= gameData.vigorCost) {
    gameData.vim -= gameData.vigorCost
    gameData.vigor += gameData.vigorPerClick
    updateDisplayValues()
  }
}

var mainGameLoop = window.setInterval(function() {vigorToVim()}, 1000)


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

function updateDisplayValues() {
  document.getElementById("vimGained").innerHTML = gameData.vim + " VIM"
  document.getElementById("vimPerClickUpgrade").innerHTML = "Improved Methods " 
  + gameData.vimPerClick + " (" + gameData.vimPerClickCost + " Vim)"
  document.getElementById("vigorGained").innerHTML = gameData.vigor + " VIGOR"
}