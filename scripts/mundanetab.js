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

//Accoutrements purchases
function buyRadio() {
  if (gameData.finances >= 20) {
    gameData.finances -= 20
    accoutrementsPurchases.radio = true
    gameData.relaxation += 1
    document.getElementById("radioBuyButton").style.display="none"
    updateDisplayValues()
  }
}

function buyFurniture() {
  if (gameData.finances >= 60) {
    gameData.finances -= 60
    accoutrementsPurchases.furniture = true
    gameData.relaxation += 1
    document.getElementById("furnitureBuyButton").style.display="none"
    updateDisplayValues()
  }
}

function buybwTV() {
  if (gameData.finances >= 150) {
    gameData.finances -= 150
    accoutrementsPurchases.bwTV = true
    gameData.relaxation += 2
    document.getElementById("bwTVBuyButton").style.display="none"
    updateDisplayValues()
  }
}

function buycTV() {
  if (gameData.finances >= 930) {
    gameData.finances -= 930
    accoutrementsPurchases.cTV = true
    gameData.relaxation += 1
    document.getElementById("cTVBuyButton").style.display="none"
    updateDisplayValues()
  }
}

function buyFord() {
  if (gameData.finances >= 2345) {
    gameData.finances -= 2345
    gameData.bills += 15 
    accoutrementsPurchases.fordFairlane = true
    gameData.workStressGain = 1
    document.getElementById("FordFairlaneBuyButton").style.display="none"
    addMessage("Beyond the matter of pride, itself important, having a vehicle will make travel much more convenient.")
    updateDisplayValues()
  }
}

function buyNightClasses() {
  if (gameData.finances >= 80) {
    gameData.finances -= 80
    document.getElementById("study").style.display="block"
    document.getElementById("institution").style.display="inline"
    document.getElementById("education").style.display="inline"
    document.getElementById("nightclassBuyButton").style.display="none"
    unlockedTabs.mundaneClasses = true
    updateDisplayValues()
  }
}

function buyCommunityCollege() {
  if (gameData.finances >= 300 && gameData.education >= 30) {
    gameData.finances -= 300
    gameData.study += 1
    document.getElementById("communitycollegeBuyButton").style.display="none"
    accoutrementsPurchases.communityCollege = true
    updateDisplayValues()
  }
}

function getOperatorJob() {
  if (gameData.education >= 10) {
    gameData.job = 2
    gameData.wage = 15
    gameData.workClicks = 0
    document.getElementById("operatorJobButton").style.display="none"
    updateDisplayValues()
  }
}

function getAccountingJob() {
  if (gameData.education >= 50) {
    gameData.job = 3
    gameData.wage = 22
    gameData.workClicks = 0
    document.getElementById("accountingJobButton").style.display="none"
    updateDisplayValues()
  }
}

//Day activities
function mundaneWork() {
  gameData.finances += gameData.wage
  gameData.stressTotal += gameData.workStressGain
  processDay()
  gameData.workClicks+=1;
  if (gameData.workClicks == 1 && gameData.job == 0) {
    addMessage("Another eight hours lost, another eight dollars gained.")
  }
}

function mundaneLeisure() {
  gameData.stressTotal -= gameData.relaxation
  if (gameData.stressTotal < 0) {
    gameData.stressTotal = 0
  }
  processDay()
}

function mundaneClasses() {
  gameData.education += gameData.study
  gameData.stressTotal += 1
  processDay()
}

function processDay() {
  gameData.daysToBill -= 1
  if (gameData.daysToBill == 0) {
    billsDue()
  }
  //time out day buttons
  var buttons = document.getElementsByClassName('DayButton')
  Array.from(buttons).forEach((b) => {
    b.disabled = true;
    setTimeout(function() {
        b.disabled = false;
    }, 500);
  });
  checkUnlocks();
  checkStress()
  updateDisplayValues()
}

function checkStress() {
  if (gameData.stressTotal >= 50) {
    document.getElementById("stress").style.color = "red"
  }
  else {
    document.getElementById("stress").style.color = "black"
  }
}

function billsDue() {
  gameData.daysToBill = 28
  gameData.finances -= gameData.bills
  updateDisplayValues()
}

function checkUnlocks() {
  if (!unlockedTabs.mundaneLeisure) {
    if (gameData.stressTotal >= 10) {
      unlockedTabs.mundaneLeisure = true;
      document.getElementById("relaxation").style.display="inline"
      addMessage("\"All work and no play makes Jack a dull boy\", or something like that.")
    }
  }
  if (!accoutrementsPurchases.furnitureUnlock && gameData.finances >= 60) {
    accoutrementsPurchases.furnitureUnlock = true;
    document.getElementById("furnitureBuyButton").style.display="inline"
    addMessage("Consider a more comfortable abode. Perhaps a couch with surviving stuffing, and a coffee table with four legs?")
  }
  if (!accoutrementsPurchases.bwTVUnlock && gameData.finances >= 100) {
    accoutrementsPurchases.bwTVUnlock = true;
    document.getElementById("bwTVBuyButton").style.display="inline"
    addMessage("Sixteen inches of black and white beauty, so close to being yours.")
  }
  if (!accoutrementsPurchases.cTVUnlock && accoutrementsPurchases.bwTV && gameData.finances >= 300) {
    accoutrementsPurchases.cTVUnlock = true;
    document.getElementById("cTVBuyButton").style.display="inline"
    addMessage("Our windows into the world grow more advanced. Now, we have unlocked the chromatic. Perhaps one day even more realism will be possible.")
  }
  if (!accoutrementsPurchases.fordFairlaneUnlock && gameData.finances >= 500) {
    accoutrementsPurchases.fordFairlaneUnlock = true;
    document.getElementById("FordFairlaneBuyButton").style.display="inline"
    addMessage("One's own automobile is quintissential to the American Dream. You're not quite dreaming yet, but perhaps someday soon.")
  }
  if (gameData.job == 0 && gameData.workClicks >= 28) {
    makePopup("A Dead End","Your trial period at the grocery store finally ends and your gruff manager elevates you a pittance beyond the minimum wage. He grumbles that further raises will not be forthcoming. You'll have to make your own opportunities.")
    addPopupOption("So I Shall","Education Unlocked")
    gameData.job = 1
    gameData.wage = 9
    gameData.stressTotal -= 10
    if (gameData.stressTotal < 0) {gameData.stressTotal = 0}
    accoutrementsPurchases.nightClassesUnlock = true
    document.getElementById("nightclassBuyButton").style.display="inline"
    updateDisplayValues()
  }
  if (gameData.education == 15) {
    accoutrementsPurchases.communityCollegeUnlock = true
    addMessage("This place was a good start for expanding the walls of your mind, but as you grow it will come to stifle you. Find greater opportunities, greater capacity for greater knowledge.")
    document.getElementById("communitycollegeBuyButton").style.display="inline"
    updateDisplayValues()
  }
  if (gameData.job == 1 && gameData.education == 5 && document.getElementById("operatorJobButton").style.display == "none") {
    document.getElementById("operatorJobButton").style.display="inline"
    addMessage("An opportunity arrives - switchboard operators aren't prestigious, but they are paid.")
  }
  if (gameData.job < 3 && gameData.education == 30 && document.getElementById("accountingJobButton").style.display == "none") {
    accJobDisplay = true
    document.getElementById("accountingJobButton").style.display="inline"
    addMessage("Amidst suits and smoky offices, a bright future awaits those who might seize it.")
  }
  if (gameData.job == 2 && gameData.workClicks == 28) {
    gameData.workClicks = 0
    makePopup("More Duties?", "You've been offered the opportunity to take operating responsibilities for a larger calling area. It would mean a raise, but the adjustment will be non-trivial.")
    addPopupOption("Accept More Responsibility","Wage +$1, Stress +15","acceptMoreResponsibility()")
    addPopupOption("Politely Decline","No Change")
  }
}

//Modal button functions
function acceptMoreResponsibility() {
  gameData.stressTotal += 15
  gameData.wage += 1
  closeModals()
  updateDisplayValues()
}