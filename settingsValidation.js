var upKey = 38;
var downKey = 40;
var leftKey = 37;
var rightKey = 39;

var numOfBalls;
var numOfMons;
var numOfMins;

var color5;
var color10;
var color25;

function getKey(key,event){
    var code = event.which || event.keyCode;
    if (key === 'up'){
        $("#upArrow").html(event.key);
        upKey = code;
    }else if (key === 'down'){
        $("#downArrow").html(event.key);
        downKey = code;
    }else if (key === 'left'){
        $("#leftArrow").html(event.key);
        leftKey = code;
    }else if (key === 'right'){
        $("#rightArrow").html(event.key);
        rightKey = code;
    }
}


function checkSettingsVal(){

    numOfBalls = $("#number_of_balls").val();

    if (numOfBalls < 50 || numOfBalls > 90){
        alert("Number of balls is illegal");
    }

    var radios = document.getElementsByName('monsters');
    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            numOfMons = i + 1;
            break;
        }
    }

    if (!arrowsAreValid()){
        alert("Can not choose the same key for two different arrows.")
    }

    color5 = $("#5pColor").val();
    color10 = $("#10pColor").val();
    color25 = $("#25pColor").val();

    numOfMins = document.getElementById("number_of_minutes").value();
    //start the game.!
}

function arrowsAreValid(){
    if (upKey === downKey || upKey === leftKey || upKey === rightKey)
        return false;
    if (downKey == leftKey || downKey === rightKey)
        return false;
    if (leftKey === rightKey)
        return false;
    return true;
}


function getRandomSettings(){
    upKey = 38;
    downKey = 40;
    leftKey = 37;
    rightKey = 39;

    var min = 1;
    var max = 3;
    numOfMons = Math.floor(Math.random() * max) + min;

    var min = 1;
    var max = 5;
    numOfMins = Math.floor(Math.random() * max) + min;

    var min = 50;
    var max = 90;
    numOfBalls = Math.floor(Math.random() * max) + min;

    color5 = getRandomColor();
    color10 = getRandomColor();
    color25 = getRandomColor();

    while (color5 === color10 || color5 === color25 || color10 === color25)
    {
        color5 = getRandomColor();
        color10 = getRandomColor();
        color25 = getRandomColor();
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  