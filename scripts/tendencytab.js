function gainVim() {
  gameData.vim += gameData.vimPerClick
  updateDisplayValues()
  gameData.gainVimClicks+=1;
  if (gameData.gainVimClicks == 1) {
    addMessage("There's a little Vim in everything. The art is in squeezing it out.")
  }
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

var vimGainLoop = window.setInterval(function() {vigorToVim()}, 1000)