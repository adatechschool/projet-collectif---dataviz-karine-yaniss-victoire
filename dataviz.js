// tout copier 
// variables générales
let hasDrunk = false  
let lastDrink = [0,0]
let message = document.getElementById("messages")
let nextDrink = 0 
let timeLate = 0 
let today
let h
let m
let s 
// Variables SVG
let leaf1 = Snap("#leaf1")
let leaf2 = Snap("#leaf2")
let leaf3 = Snap("#leaf3")
let leaf4 = Snap("#leaf4")

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
    updatePlante();
  }

// création du message adaptable + remise à zéro du hasDrunk à la fin de chaque heure 
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

// indiquer que l'utilisateur à bû et sauvegarder l'heure de la dernière boisson 
function drink(){
    hasDrunk = true
    growPlant()
    lastDrink = [h, m]
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

// feuilles qui tombent toutes les 15 minutes 

function updatePlante(){
    if (m == 15 && s == 0){
        animPlante(leaf1)
    }
    if (m == 30 && s == 0){
        animPlante(leaf2)
    }
    if (m == 45 && s == 0){
        animPlante(leaf3)
    }
    if (m == 59 && s == 0){
        animPlante(leaf4)
    }
}

// Création Animation
function animPlante(leaf){
    leaf.animate({transform: "t5 250 r120"}, 2000)
}

function growPlant(){
    leaf1.animate({transform: "t0 0"}, 2000)
    leaf2.animate({transform: "t0 0"}, 2000)
    leaf3.animate({transform: "t0 0"}, 2000)
    leaf4.animate({transform: "t0 0"}, 2000)
}

startTime();