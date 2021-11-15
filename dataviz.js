// tout copier 
// variables générales
let hasDrunk = true  
let lastDrink = [0,0]
let message = document.getElementById("messages")
let nextDrink = 0 
let timeLate = 0 
let today
let h
let m
let s

// heure 
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
function startTime() {
    // add a zero in front of numbers<10
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('heure').innerHTML = h + ":" + m + ":" + s;
    t = setTimeout(function() {
      startTime()
    }, 500);

    getMessage();
  }

// création du message adaptable 
function getMessage(){
    if (m >= 00 && m <= 01 && hasDrunk == false){
        message.innerHTML = "C'est l'heure de boire !"
    }
    else if (hasDrunk) {
        nextDrink = getNextDrink()
        message.innerHTML = "il faudra boire dans " + nextDrink + " minutes"
    }
    else {
        timeLate = getTimeLate()
        message.innerHTML = "vous auriez dû boire il y a " + timeLate + " minutes"
    } 
    if (m == 59 && s == 59) {
        hasDrunk = false 
    }
}

// déterminer si l'utilisateur à bû ou non et sauvegarder l'heure de la dernière boisson 
function drink(){
    hasDrunk = true
    lastDrink = [h, m]
    // ajouter modif plante 
}

// calculer le temps depuis lequel on aurait dû boire (en minutes)
function getTimeLate(){
    let hLate = h - (lastDrink[0] + 1)
    return hLate + " h " + m + " min"
 // heure actuelle - dernière heure à laquelle on aurait dû boire 
 // (c'est à dire l'heure ronde suivant lastDrink)
}

// calculer dans combien de temps il faudra boire (en minutes)
function getNextDrink(){
    return (60 - m)
}

startTime();