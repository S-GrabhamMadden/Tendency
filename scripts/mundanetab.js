function unlockOccult() {
  unlockedTabs.occult = true;
  document.getElementById("occultTabButton").style.display="inline"
}

function unlockMundane() {
  unlockedTabs.mundane = true;
  document.getElementById("initialStateWrapper").style.display="none"
  document.getElementById("regularMundaneWrapper").style.display="inline"
  addMessage("Little room for flights of fancy. For now, drudgery or destitution.")
}

function mundaneWork() {
  gameData.finances += gameData.wage
  gameData.stressTotal += gameData.workStressGain
  updateDisplayValues()
  processDay()
  gameData.workClicks+=1;
  if (gameData.workClicks == 1) {
    addMessage("Another eight hours lost, another eight dollars gained.")
  }
}

function processDay() {
  //time out day buttons
  var buttons = document.getElementsByClassName('DayButton')
  Array.from(buttons).forEach((b) => {
    b.disabled = true;
    setTimeout(function() {
        b.disabled = false;
    }, 1000);
  });
  checkUnlocks();
}

function checkUnlocks() {
  if (!unlockedTabs.mundaneLeisure) {
    if (gameData.stressTotal >= 10) {
      unlockedTabs.mundaneLeisure = true;
      document.getElementById("relaxation").style.display="inline"
      addMessage("\"All work and no play makes Jack a dull boy\", or something like that.")
    }
  }
}