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

function mundaneAlmanack() {
  gameData.stressTotal += 10
  gameData.almanackPages = gameData.almanackPages-1
  console.log(gameData.almanackPages)
  if (!gameData.unlockedRealization) {unlockRealization(5)}
  else {gameData.realization += 5}
  if (gameData.almanackPages == 0) {
    gameData.hasAlmanack = false
    addMessage("Closing the final page of the Almanack, you struggle to dismiss it as the writings of a madman any longer. It has put you on a path, one with a destination you can not yet see.")
    document.getElementById("almanack").style.display="none"
  }
  else if (gameData.almanackPages == 7) {
    addMessage("The Almanack talks of \"Ominous Lore\" and \"Mystic Signs\", most of which are incomprehensible. Some seem uncomfortably familiar.")
  }
  processDay()
}

function mundaneEsotericStudy() {
  gameData.esotericStudyClicks += 1
  gameData.stress += 2
  gameData.education -= 5
  gameData.realization += 5
  if (gameData.esotericStudyClicks >= 5) {
    gameData.esotericStudyFinished = true
    document.getElementById("esotericStudy").style.display="none"
    addMessage("This reservoir runs dry, no more secrets to offer which you have yet to master. You'll have to find more insights elsewhere.")
  }
  processDay()
}

function processDay() {
  gameData.days += 1
  gameData.daysToBill -= 1
  if (gameData.daysToBill == 0) {
    billsDue()
  }
  //time out day buttons
  var buttons = document.getElementsByClassName('DayButton')
  Array.from(buttons).forEach((b) => {
    b.disabled = true;
    setTimeout(function() {
        if (b.id == "leisureButton" || gameData.stressTotal < 100) {
          b.disabled = false;
        }
    }, 500);
  });
  checkUnlocks();
  checkAspects()
  randomEvents()
  updateDisplayValues()
}

function checkAspects() {
  if (gameData.stressTotal >= 100) {
    document.getElementById("stress").style.color = "red"
  }
  else if (gameData.stressTotal >= 50) {
    document.getElementById("stress").style.color = "orange"
  }
  else {
    document.getElementById("stress").style.color = "black"
  }
  
  if (gameData.finances < 0) {
    document.getElementById("finances").style.color = "red"
    if (!gameData.bankrupt) {
      gameData.bankrupt = true
      gameData.stressTotal += 10
      addMessage("Going into debt to cover costs is never a pleasant experience.")
    }
  }
  else {
    gameData.bankrupt = false
    document.getElementById("finances").style.color = "black"
  }
}

function billsDue() {
  gameData.daysToBill = 28
  gameData.finances -= gameData.bills
  updateDisplayValues()
}

function checkUnlocks() {
  if (gameData.days == 112) {
    //JAN 1ST, GET ALMANACK
    makePopup("A Chance Discovery", "January first, the start of a new year. Many are still recovering from last night's festivities, but you have less luxury in the spending of your time. Out walking today, you happen to stop for a moment on a bench. Sat next to you, unattended, some sort of strange magazine. \"POOR ROY'S ALMANACK\", it is entitled. Dated for the new year, the cover page is a scrawl of maddened promises, but something about it draws you in. No one else seems to have noticed it.","almanackModal")
    addPopupOption("Take It Home","No Going Back")
    gameData.hasAlmanack = true
    document.getElementById("almanack").style.display="inline"
  }
  if (!gameData.esotericStudyUnlocked && gameData.education >= 100) {
    addMessage("Once you've memorized the shibboleths and payed your dues to the academic foundations, entirely new avenues for learning may present themselves. A restricted library's doors are opened to you.")
    gameData.esotericStudyUnlocked = true
    document.getElementById("esotericStudy").style.display="inline"
  }
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
    addPopupOption("So Be It","Education Unlocked")
    gameData.job = 1
    gameData.wage = 9
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
  if (gameData.job == 2 && gameData.workClicks == 28 && gameData.wage < 20) {
    gameData.workClicks = 0
    makePopup("More Duties?", "You've been offered the opportunity to take operating responsibilities for a larger calling area. It would mean a raise, but the adjustment will be non-trivial.")
    addPopupOption("Accept More Responsibility","Wage +$1, Stress +15","acceptMoreResponsibility(1,15)")
    addPopupOption("Politely Decline","No Change")
  }
  if (gameData.job == 3 && gameData.education >= 80 && gameData.workClicks >= 28 && gameData.wage < 26) {
    gameData.workClicks = 0
    makePopup("Noticed Upstairs", "Mr. Melton seems to have taken note of your work ethic, as well as your qualifications. His interest shines down like a blessing. You find a memo on your desk this morning with the details of several of the company's larger accounts, if you would be so kind as to take over their management.")
    addPopupOption("Graciously Accept","Wage +$4, Stress +15","acceptMoreResponsibility(4, 15)")
    addPopupOption("Politely Decline","No Change")
  }
}

function randomEvents() {
  var modals = document.getElementsByClassName("modalClass")
  //Only check whether to pop a random event if there isn't already a modal today
  if (modals.length == 0) {
    //1 in 20 chance that an event actually happens, and never twice in a row
    if (getRandomIntInclusive(1,20) == 20 && gameData.eventLastDay == false) {
      gameData.eventLastDay = true
      //with high enough stress, use stress events instead
      if (gameData.stressTotal >= 50) {
        //can get realization from stress once
        if (!gameData.stressRealizationOccurred) {
          if (getRandomIntInclusive(1,2) == 2) {
            stressRealizationRandomEvent()
            gameData.stressRealizationOccurred = true
          }
          else {
            breakingPointRandomEvent()
          }
        }
        else {
          breakingPointRandomEvent()
        }
      }
      else {
        var eventNumber = getRandomIntInclusive(1,6)
        if (eventNumber == 1) {beggarRandomEvent()}
        else if (eventNumber == 2) {niceWeatherRandomEvent()}
        else if (eventNumber == 3) {findCashRandomEvent()}
        else if (eventNumber == 4) {badDreamsRandomEvent()}
        else if (eventNumber == 5) {goodDreamsRandomEvent()}
        else if (eventNumber == 6 && !gameData.dreamRealizationOccurred) {realizationDreamsRandomEvent();gameData.dreamRealizationOccurred=true;}
      }
    }
    else {gameData.eventLastDay = false}
  }
}

//RANDOM EVENT FUNCTIONS
function beggarRandomEvent() {
  makePopup("Accosted by a Beggar", "Going about your business, you find your path blocked by a particularly disorderly gentleman begging for money. He insists that it is very important.")
  addPopupOption("Pass Him Some Coins","-$5","changeMoney(-5)")
  addPopupOption("Ignore Him","+2 Stress","changeStress(2)")
}

function niceWeatherRandomEvent() {
  makePopup("A Nice Day", "Often, it seems as though our society is simply too busy to allow its drones to appreciate the \"little things\". Today the sun is shining, and somewhere in the distance birds sing. Perhaps, today, there is time.")
  addPopupOption("How Lovely...","-2 Stress","changeStress(-2)")
}

function findCashRandomEvent() {
  makePopup("A Fortunate Find", "Today, evidently, is your day. While taking a lunchtime walk, lady luck displays a rare good mood - a $20 bill flutters by, unclaimed. Might it be yours?")
  addPopupOption("Take The Bill","+$20","changeMoney(20)")
  addPopupOption("Let it Fly Past","No Change")
}

function badDreamsRandomEvent() {
  makePopup("Nightmares", "You've always been quite a vivid dreamer. Tonight, you wish you weren't. A chasing mass made of hands, brick walls into eternity. You wake in a cold sweat.")
  addPopupOption("Terror","+5 Stress","changeStress(5)")
}

function goodDreamsRandomEvent() {
  makePopup("Dreams of Power", "You've always been quite a vivid dreamer. Tonight, as you sleep, you wear a crown. Made of pearlescent bone, it fits you well, and comes accompanied with many other riches. Eventually, morning comes, but a fraction of the confidence remains.")
  addPopupOption("Maybe One Day","-5 Stress","changeStress(-5)")
}

function realizationDreamsRandomEvent() {
  makePopup("Dreams with Staying Power", "Tonight, as moonlight trickles through the windows, your dreams are especially vivid, incredibly so. You wander the streets of an ancient and ruined city, apparently entirely alone. Passing through the threshold into one of the vacant stone shells, a gold coin sits on a table, and you absentmindedly pocket it. A sudden roar from outside wakes you with a start, sitting up in your bed. In your hand, the coin remains.")
  addPopupOption("Difficult to Explain", "Realization", "changeRealization(10)")
}

//stress random events
function breakingPointRandomEvent() {
  makePopup("Breaking Point", "It feels as though you've been working yourself to the bone. You can feel the internal protest building, body and mind. Preventative action now, or corrective action later may cost a harsher price.")
  addPopupOption("Treat Yourself","-$20, -8 Stress","changeStress(-5);changeMoney(-20)")
  addPopupOption("Tough It Out","+4 Stress","changeStress(4)")
}

function stressRealizationRandomEvent() {
  makePopup("Breaking Through", "The pressures on your mind are great - incredibly unpleasant, though, pressure creates diamonds. Laying in bed and staring into the ceiling, puzzle pieces come together that you hadn't even realized existed. Things are not entirely as they seem, are they?")
  addPopupOption("No, Of Course Not", "Realization", "changeRealization(10)")
}

//Modal button functions
function acceptMoreResponsibility(wageAdd, stressAdd) {
  gameData.stressTotal += stressAdd
  gameData.wage += wageAdd
  closeModals()
  updateDisplayValues()
}

function changeMoney(amount) {
  gameData.finances += amount
  closeModals()
  updateDisplayValues()
}

function changeStress(amount) {
  gameData.stressTotal += amount
  if (gameData.stressTotal < 0) {gameData.stressTotal = 0}
  closeModals()
  updateDisplayValues()
}

function changeRealization(amount) {
  if (!gameData.unlockedRealization) {
    unlockRealization(amount)
    closeModals()
  }
  else {
    gameData.realization += amount
    closeModals()
    updateDisplayValues()
  }
}

//OCCULT UNLOCK PROCESS FUNCTIONS

function unlockRealization(amount = 0) {
  document.getElementById("realization").style.display="inline"
  gameData.unlockedRealization = true
  gameData.realization += amount
  updateDisplayValues()
}