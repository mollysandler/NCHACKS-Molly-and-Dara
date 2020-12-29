var BJFlavors = [
    "Jelly Donuts",
    "Peppermint Bark",
    "Oreo Truffles",
    "Sugar Cookies",
    "Candy Cane"
]
var TFlavors = [
    "Eggnog",
    "Hot Chocolate",
    "Vanilla Chai",
    "Apple Cider",
    "Peppermint Mocha"
]
var HDFlavors = [
    "Honey Glazed Ham",
    "Latkes",
    "Yule Log",
    "Fruitcake",
    "Brisket"
]

var currentWord = "";
var gameInSession = false;

var livesLeft = 6;
lives.textContent = "Lives Left: " + livesLeft;

var numRight = 0;
var numWrong = 0;

function buttonClicked(buttonValue) {
    if(!gameInSession) return;
    var element = document.getElementById(buttonValue);
    element.style.visibility = "hidden";

    var successfulFind = false;

    var letter = buttonValue.charAt(1);
    var word = currentWord.toLowerCase();
    for(var i = 0; i < currentWord.length; i++){
        if(word.charAt(i) == letter){
            choose.textContent = choose.textContent.slice(0, 2*i) + currentWord.charAt(i) + choose.textContent.slice(2*i + 1);
            successfulFind = true;
        }
    }

    if(!successfulFind){
        decreaseLives();
    }
}

function decreaseLives(){
    livesLeft--;
    lives.textContent = "Lives Left: " + livesLeft;
    numWrong++;
    hang();
    if(livesLeft <= 0){
        LoseGame();
    }

}

function NewGame(){
    gameInSession = false;
    choose.textContent = "";
    currentWord = "";
    var elements = document.getElementsByClassName("letter");
    for(var i = 0; i < elements.length; i++){
        elements[i].style.visibility = "visible";
    }
    answer.style.display = "none";
}

function QuitGame(){
    gameInSession = false;
}
QuitGame.onclick = QuitGame;

function LoseGame(){
    gameInSession = false;
    answer.style.display = "inline";
}

function clickActionBandJ() {
    NewGame();
    var wordBJ = BJFlavors[Math.floor(Math.random() * BJFlavors.length)];
    for (var i = 0; i < wordBJ.length; i++) {
        if (wordBJ.charAt(i) == " "){
            choose.innerHTML += "&nbsp&nbsp";
        }
        else{
            choose.textContent += "_ ";
        }
    }
    
    currentWord = wordBJ;
    answer.textContent = currentWord;
    gameInSession = true;
}

holidaydesserts.onclick = clickActionBandJ;


function clickActionTalenti() {
    NewGame();
    var wordT = TFlavors[Math.floor(Math.random() * TFlavors.length)];
    for (var i = 0; i < wordT.length; i++) {
        if (wordT.charAt(i) == " ") {
            choose.innerHTML += "&nbsp&nbsp";
        }
        else {
            choose.textContent += "_ ";
        }
    }
    currentWord = wordT;
    answer.textContent = currentWord;
    gameInSession = true;
}
holidaydrinks.onclick = clickActionTalenti;

function clickActionHaagen() {
    NewGame();
    var wordHD = HDFlavors[Math.floor(Math.random() * HDFlavors.length)];
    for (var i = 0; i < wordHD.length; i++) {
        if (wordHD.charAt(i) == " ") {
            choose.innerHTML += "&nbsp&nbsp";
        }
        else {
            choose.textContent += "_ ";
        }
    }
    currentWord = wordHD;
    answer.textContent = currentWord;
    gameInSession = true;
}
holidayfoods.onclick = clickActionHaagen;


var alphabet = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v']


function hang() {
  var ctx = document.getElementById("HangmanDrawing").getContext('2d');
    ctx.fillStyle = "darkslateblue";
    ctx.lineWidth=3;
    ctx.beginPath(); //vertical bar
      ctx.moveTo(50,270);
      ctx.lineTo(50,25);
      ctx.stroke();
    ctx.beginPath(); //horizontal bar
      ctx.moveTo(49,25);
      ctx.lineTo(175,25);
      ctx.stroke();
    ctx.beginPath(); //ground
      ctx.moveTo(35,270);
      ctx.lineTo(265,270);
      ctx.stroke();
  
    if (numWrong == 1) {
        ctx.beginPath(); //head
        ctx.arc(150, 50, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath(); //left eye
        ctx.arc(143, 45, 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath(); //right eye
        ctx.arc(157, 45, 3.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath(); //sad mouth
        ctx.arc(150, 62, 9, 0, Math.PI, true);
        ctx.stroke();
    }
    if (numWrong == 2) {
        ctx.beginPath(); //body
        ctx.moveTo(150, 70);
        ctx.lineTo(150, 140);
        ctx.stroke();
    }
    if (numWrong == 3) {
        ctx.fillStyle = "darkslateblue";
        ctx.beginPath(); //right arm
        ctx.moveTo(150, 85);
        ctx.lineTo(180, 110);
        ctx.stroke();
    }
    if (numWrong == 4) {
        ctx.beginPath(); //left arm
        ctx.moveTo(150, 85);
        ctx.lineTo(120, 110);
        ctx.stroke();
    }
    if (numWrong == 5) {
        ctx.beginPath(); //right leg
        ctx.moveTo(149, 138);
        ctx.lineTo(180, 180);
        ctx.stroke();
    }
    if (numWrong == 6) {
        ctx.beginPath(); //left leg
        ctx.moveTo(151, 138);
        ctx.lineTo(120, 180);
        ctx.stroke();
    }
}