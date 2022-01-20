function unlockOccult() {
  unlockedTabs.occult = true;
  document.getElementById("occultTabButton").style.display="inline"
}

function unlockMundane() {
  unlockedTabs.mundane = true;
  document.getElementById("initialStateWrapper").style.display="none"
  document.getElementById("regularMundaneWrapper").style.display="inline"
  addMessage("Little room for flights of fancy. For now, drudgery.")
}