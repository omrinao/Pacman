var globalVariable ={upKey};
var globalVariable ={downKey};
var globalVariable ={leftKey};
var globalVariable ={rightKey};

var upKey = 'ArrowUp';
var downKey = 'ArrowDown';
var leftKey = 'ArrowLeft';
var rightKey = 'ArrowRight';

var globalVariable ={numOfBalls};
var globalVariable ={numOfMons};
var globalVariable ={numOfMins : 1};

var globalVariable ={color5};
var globalVariable ={color10};
var globalVariable ={color25};

function getKey(key,event){
    if (key === 'up'){
        $("#upArrow").html(event.key);
        upKey = event.code;
    }else if (key === 'down'){
        $("#downArrow").html(event.key);
        downKey = event.code;
    }else if (key === 'left'){
        $("#leftArrow").html(event.key);
        leftKey = event.code;
    }else if (key === 'right'){
        $("#rightArrow").html(event.key);
        rightKey = event.code;
    }
}


function checkSettingsVal(){

    var validate = true;
    globalVariable.numOfBalls = $("#number_of_balls").val();

    if (numOfBalls < 50 || numOfBalls > 90){
        alert("Number of balls is illegal");
        validate = false;
    }

    var radios = document.getElementsByName('monsters');
    for (var i = 0, length = radios.length; i < length; i++)
    {
        if (radios[i].checked)
        {
            globalVariable.numOfMons = i + 1;
            break;
        }
    }

    if (!arrowsAreValid()){
        alert("Can not choose the same key for two different arrows.")
        validate = false;
    }

    globalVariable.color5 = $("#5pColor").val();
    globalVariable.color10 = $("#10pColor").val();
    globalVariable.color25 = $("#25pColor").val();

    globalVariable.numOfMins = document.getElementById("number_of_minutes").value;
    if(validate){
        globalVariable.upKey = upKey;
        globalVariable.downKey = downKey;
        globalVariable.leftKey = leftKey;
        globalVariable.rightKey = rightKey;
        display_game_page();
        getSettings();
    }
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

    var min = 1;
    var max = 3;
    globalVariable.numOfMons = Math.floor(Math.random() * max) + min;

    var min = 1;
    var max = 5;
    globalVariable.numOfMins = Math.floor(Math.random() * max) + min;

    var min = 50;
    var max = 90;
    globalVariable.numOfBalls = Math.floor(Math.random() * (max - min)) + min;

    color5 = getRandomColor();
    color10 = getRandomColor();
    color25 = getRandomColor();

    while (color5 === color10 || color5 === color25 || color10 === color25)
    {
        color5 = getRandomColor();
        color10 = getRandomColor();
        color25 = getRandomColor();
    }

    globalVariable.color5 = color5;
    globalVariable.color10 = color10;
    globalVariable.color25 = color25;
    globalVariable.upKey = 'ArrowUp';
    globalVariable.downKey = 'ArrowDown';
    globalVariable.leftKey = 'ArrowLeft';
    globalVariable.rightKey = 'ArrowRight';
    display_game_page();
    getSettings();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }