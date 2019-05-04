    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var shape = new Object();

    var board;
    var ballsBoard;
    var boardForSecondTry;
    var score;
    var pac_color;
    var start_time;
    var time_elapsed;
    var interval;
    var direction;
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;

    var numOfBalls;
    var numOfMons;
    var numOfsecs;

    var color5;
    var color10;
    var color25;
    var numOfcolor5;
    var numOfcolor10;
    var numOfcolor25;
    var wallPos;
    var firstDraw;
    var mySound;

    var background = new Image();
    background.src = "pics/background.png";

    var monstarsArr = new Array();
    monstarsArr[0] = new Image();
    monstarsArr[0].src = "pics/ghostorange.png";

    monstarsArr[1] = new Image();
    monstarsArr[1].src = "pics/ghostpink.png";

    monstarsArr[2] = new Image();
    monstarsArr[2].src = "pics/ghostthelet.png";

    function Start() {
        time_elapsed = 0;
        lives = 3;
        score = 0;
        var numOfMonstaresToCreate = numOfMons;
        board = new Array();
        ballsBoard = new Array();
        boardForSecondTry = new Array();
        pac_color = "yellow";
        var cnt = 182;
        var food_remain = numOfBalls;
        var pacman_remain = 1;
        mySound = document.createElement('audio');
        mySound.src="sources/GameSong.mp3";
        mySound.play();
        wallPos = new Array();
        initWalls();
        start_time = new Date();
        for (var i = 0; i < 14; i++) {
            board[i] = new Array();
            ballsBoard[i] = new Array();
            boardForSecondTry[i] = new Array();
            //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
            for (var j = 0; j < 13; j++) {
                if (wallPos[i][j] === 1) {
                    boardForSecondTry[i][j] = board[i][j] = 4;
                } else {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {
                        food_remain--;
                        ballsBoard[i][j] = board[i][j] = 1;
                    } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                        shape.i = i;
                        shape.j = j;
                        pacman_remain--;
                       ballsBoard[i][j] = board[i][j] = 2;
                    } else {
                        ballsBoard[i][j] = board[i][j] = 0;
                    }
                    cnt--;
                }
                //5,6,7 are the monstars.
                if (i === 0 && j ===0 && numOfMonstaresToCreate > 0){
                    ballsBoard[i][j] = board[i][j] = 5;
                    monstarsArr[0].i = i;
                    monstarsArr[0].j = j;
                    numOfMonstaresToCreate--;
                }
                if (i === 9 && j === 9 && numOfMonstaresToCreate > 0){
                    ballsBoard[i][j] = board[i][j] = 6;
                    monstarsArr[2].i = i;
                    monstarsArr[2].j = j;
                    numOfMonstaresToCreate--;
                }
                if (i === 0 && j=== 9 && numOfMonstaresToCreate > 0){
                    ballsBoard[i][j] = board[i][j] = 7;
                    monstarsArr[1].i = i;
                    monstarsArr[1].j = j;
                    numOfMonstaresToCreate--;
                }
            }
        }
        while (food_remain > 0) {
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 1;
            food_remain--;
        }
        keysDown = {};
        addEventListener("keydown", function (e) {
            keysDown[e.code] = true;
        }, false);
        addEventListener("keyup", function (e) {
            keysDown[e.code] = false;
        }, false);
        interval = setInterval(UpdatePosition, 500);
    }


    function findRandomEmptyCell(board) {
        var i = Math.floor((Math.random() * 13) + 1);
        var j = Math.floor((Math.random() * 14) + 1);
        while (board[i][j] !== 0) {
            i = Math.floor((Math.random() * 13) + 1);
            j = Math.floor((Math.random() * 14) + 1);
        }
        return [i, j];
    }

    /**
     * @return {number}
     */
    function GetKeyPressed() {
        if (keysDown[upKey]) {
            return 1;
        }
        if (keysDown[downKey]) {
            return 2;
        }
        if (keysDown[leftKey]) {
            return 3;
        }
        if (keysDown[rightKey]) {
            return 4;
        }
    }

    function Draw() {
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.shadowBlur = 10;
        context.shadowColor = "black";
        
        context.font = "bold 20px cursive";
        context.fillText("Score: " + score,30,50);
        context.fillText("Time Left: " + time_elapsed,30,90);
        context.fillText("Lives: " + lives,30,130);
        for (var i = 0; i < 14; i++) {
            for (var j = 0; j < 13; j++) {
                var center = new Object();
                center.x = i * 50 + 320;
                center.y = j * 40 + 20;
                if (board[i][j] === 5){
                    context.drawImage(monstarsArr[0], center.x - 12, center.y - 12, 25, 25);
                }
                if (board[i][j] === 6){
                    context.drawImage(monstarsArr[1], center.x - 12, center.y - 12, 25, 25);
                }
                if (board[i][j] === 7){
                    context.drawImage(monstarsArr[2], center.x - 12, center.y - 12, 25, 25);
                }
                if (board[i][j] === 2 && direction === "right") {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0.1 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 2, center.y - 9, 3, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } 
                else if (board[i][j] === 2 && direction === "left") {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.9 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 2, center.y - 9, 3, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if (board[i][j] === 2 && direction === "up") {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 1.60 * Math.PI, 1.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 9, center.y - 2, 3, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if (board[i][j] === 2 && direction === "down") {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0.60 * Math.PI, 0.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 9, center.y - 2, 3, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if (board[i][j] === 2) {
                    context.beginPath();
                    context.arc(center.x, center.y, 15, 0.1 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 2, center.y - 9, 3, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                } 
                else if (board[i][j] === 1) {
                    context.beginPath();
                    context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
                    if (firstDraw == 0){
                        ballsBoard[i][j] = drawBall(); //color of balls
                        context.fillStyle = ballsBoard[i][j]; 
                        boardForSecondTry[i][j] = board[i][j];
                    }
                    else{
                        context.fillStyle = ballsBoard[i][j];
                    }
                    context.fill();
                }
                else if (board[i][j] === 4) {
                    context.beginPath();
                    context.rect(center.x - 25, center.y - 20, 50, 40);
                    context.fillStyle = "grey"; //color
                    context.fill();
                }
            }
        }
        firstDraw = 1;
    }

    function UpdatePosition() {
        board[shape.i][shape.j] = 0;
        boardForSecondTry[shape.i][shape.j] = 0;
        var x = GetKeyPressed();
        if (x === 1) {
            if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
                shape.j--;
                direction = "up";
            }
        }
        if (x === 2) {
            if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
                shape.j++;
                direction = "down";
            }
        }
        if (x === 3) {
            if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
                shape.i--;
                direction = "left";
            }
        }
        if (x === 4) {
            if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
                shape.i++;
                direction = "right";
            }
        }
        //updating score
        if (board[shape.i][shape.j] === 1 && ballsBoard[shape.i][shape.j] === color5) {
            score+=5;
        }
        else if (board[shape.i][shape.j] === 1 && ballsBoard[shape.i][shape.j] === color10) {
            score+=10;
        }
        else if (board[shape.i][shape.j] === 1 && ballsBoard[shape.i][shape.j] === color25) {
            score+=25;
        }
        board[shape.i][shape.j] = 2;
        boardForSecondTry[shape.i][shape.j] = 2;
        //j is for row.
        //i is for col.
        for (var num = 0; num < numOfMons; num++){
            var tmpI = monstarsArr[num].i;
            var tmpJ = monstarsArr[num].j;
            board[monstarsArr[num].i][monstarsArr[num].j] = boardForSecondTry[tmpI][tmpJ];
            var direc =  getDirectionForMons(shape.j ,shape.i,monstarsArr[num].j,monstarsArr[num].i,num);
            if (direc === 'up' && monstarsArr[num].j > 0 && board[monstarsArr[num].i][monstarsArr[num].j - 1] !== 4 && monsterInPos(monstarsArr[num].i,monstarsArr[num].j-1)){
                monstarsArr[num].j--;
            }
            else if (direc === 'down' && monstarsArr[num].j < 9 && board[monstarsArr[num].i][monstarsArr[num].j + 1] !== 4 && monsterInPos(monstarsArr[num].i,monstarsArr[num].j+1)){
                monstarsArr[num].j++;
            }
            else if (direc === 'left' && monstarsArr[num].i > 0 && board[monstarsArr[num].i - 1][monstarsArr[num].j] !== 4 && monsterInPos(monstarsArr[num].i - 1,monstarsArr[num].j)){
                monstarsArr[num].i--;
                
            }
            else if (direc === 'right' && monstarsArr[num].i < 9 && board[monstarsArr[num].i + 1][monstarsArr[num].j] !== 4 && monsterInPos(monstarsArr[num].i + 1,monstarsArr[num].j)){
                monstarsArr[num].i++;
            }

            if (num === 0){
                board[monstarsArr[num].i][monstarsArr[num].j] = 5;
            } else if (num === 1){
                board[monstarsArr[num].i][monstarsArr[num].j] = 6;
            }else if (num === 2){
                board[monstarsArr[num].i][monstarsArr[num].j] = 7;
            }

            if (mostaerCatchPack()){
                lives--;
                score = score - 10;
                if (lives === 0){
                    window.clearInterval(interval);
                    display_end_game("You Lost!" + "\n" + "Your score is: " + score);
                }
                else{
                    alert("nice try! have another one!");
                    drawCurrBoardAsNew();
                }
            }

        }
        
        

        var currentTime = new Date();
        time_elapsed = (numOfsecs - (currentTime - start_time) / 1000).toFixed(1);
        if (time_elapsed <= 0 && score >= 150){
            time_elapsed = 0;
            window.clearInterval(interval);
            display_end_game("We have a WINNER!!!" + "\n" + "Your score is: " + score);
        }
        else if (time_elapsed <= 0 && score < 150){
            time_elapsed = 0;
            window.clearInterval(interval);
            display_end_game("You can do better..." + "\n" + "Your score is: " + score);
        }
        else if (score >= 20 && time_elapsed <= 10) {
            pac_color = "green";
        }
        else if (score === 350) {
            window.clearInterval(interval);
            display_end_game("Game Completed!" + "\n" + "Your score is: " + score);
        } 
        else if (lives === 0){
            window.clearInterval(interval);
            display_end_game("You Lost!" + "\n" + "Your score is: " + score);
        }
        else {
            Draw();
        }
    }

    function display_end_game(message){
        // Get the modal
        if (document.getElementById("game").style.display != "none"){
            var modal = document.getElementById("myGame");
            // Get the <span> element that closes the modal
            var spanGame = document.getElementsByClassName("closeGame")[0];
            var playAgain = document.getElementById("play_again");
            var returnHome = document.getElementById("return_home");
            mySound.src = "";
            modal.style.display = "block";
            document.getElementById("gameEnd").style.display = "block";
            document.getElementById("endGameMessage").innerText = message;
            // When the user clicks on <span> (x), close the modal
            spanGame.onclick = function() {
                modal.style.display = "none";
                display_welcome();
            }

            playAgain.onclick = function() {
                modal.style.display = "none";
                checkSettingsVal();
            }
            returnHome.onclick = function() {
                modal.style.display = "none";
                display_welcome();
            }

            // Handle ESC key (key code 27)
            document.addEventListener('keyup', function(e) {
                if (e.keyCode == 27) {
                    modal.style.display = "none";
                }
            });

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    display_welcome();
                }
            }
        }
    }


    /**
     * this function gets the user's settings and starts the game.
     */
    function getSettings(){
        upKey = globalVariable.upKey;
        downKey = globalVariable.downKey;
        leftKey = globalVariable.leftKey;
        rightKey = globalVariable.rightKey;

        numOfBalls = globalVariable.numOfBalls;
        numOfMons = globalVariable.numOfMons;
        numOfsecs = globalVariable.numOfMins * 60;

        color5 = globalVariable.color5;
        color10 = globalVariable.color10;
        color25 = globalVariable.color25;
        numOfcolor5 = numOfBalls * 0.6;
        numOfcolor10 = numOfBalls * 0.3;
        numOfcolor25 = numOfBalls * 0.1;
        firstDraw = 0;

        Start();
    }


    /**
     * this function calculate the best direction for a monster to go after the pacman
     * @param {} pacRow 
     * @param {*} pacCol 
     * @param {*} monRow 
     * @param {*} monCol 
     * @param {*} num 
     */
    function getDirectionForMons(pacRow,pacCol,monRow,monCol,num){


        var firstV = pacRow - (monRow - 1);
        var secondV = pacCol - monCol;
        var afterUp = Math.pow(firstV,2) + Math.pow(secondV,2);
        afterUp = Math.sqrt(afterUp);

        firstV = pacRow - (monRow + 1);
        secondV = pacCol - monCol;
        var afterDown = Math.pow(firstV,2) + Math.pow(secondV,2);
        afterDown = Math.sqrt(afterDown);

        firstV = pacRow - monRow;
        secondV = pacCol - (monCol - 1);
        var afterLeft = Math.pow(firstV,2) + Math.pow(secondV,2);
        afterLeft = Math.sqrt(afterLeft);

        firstV = pacRow - monRow;
        secondV = pacCol - (monCol + 1);
        var afterRight = Math.pow(firstV,2) + Math.pow(secondV,2);
        afterRight = Math.sqrt(afterRight);

        
        var direction = getMinDistance(afterUp,afterDown,afterLeft,afterRight,num);

        if (direction === 'up' && monstarsArr[num].j > 0 && board[monstarsArr[num].i][monstarsArr[num].j - 1] !== 4){
            return 'up';
        }
        if (direction === 'down' && monstarsArr[num].j < 9  && board[monstarsArr[num].i][monstarsArr[num].j + 1] !== 4){
            return 'down';
        }
        if (direction === 'left' && monstarsArr[num].i > 0 && board[monstarsArr[num].i - 1][monstarsArr[num].j] !== 4){
            return 'left';
        }
        if (direction === 'right' && monstarsArr[num].i < 9 && board[monstarsArr[num].i + 1][monstarsArr[num].j] !== 4){
            return 'right';
        }
        return getRandomMove(num);
    }


    /**
     * this function returns a random move to a given monster
     * @param {} num 
     */
    function getRandomMove(num){
        var randomNum = Math.random();
        if (randomNum <= 0.25 && monstarsArr[num].j > 0 && board[monstarsArr[num].i][monstarsArr[num].j - 1] !== 4)
            return 'up';
        if (randomNum <= 0.5 && monstarsArr[num].i > 0 && board[monstarsArr[num].i - 1][monstarsArr[num].j] !== 4)
            return 'left';
        if (randomNum <= 0.75 && monstarsArr[num].j < 9  && board[monstarsArr[num].i][monstarsArr[num].j + 1] !== 4)
            return 'down';
        if (monstarsArr[num].i < 9 && board[monstarsArr[num].i + 1][monstarsArr[num].j] !== 4)
            return 'right';
    }


    /**
     * this function return the minimum distance between a monster and the pacman
     * @param {} afterUp 
     * @param {*} afterDown 
     * @param {*} afterLeft 
     * @param {*} afterRight 
     */
    function getMinDistance(afterUp,afterDown,afterLeft,afterRight){
        if (afterUp < afterDown && afterUp < afterLeft && afterUp < afterRight){
            return 'up';
        }else if (afterDown < afterLeft && afterDown < afterRight){
            return 'down';
        }else if (afterLeft < afterRight){
            return 'left';
        } else {
            return 'right';
        }
    }


    /**
     * this function returns the color of the ball we want to draw
     */
    function drawBall(){
        var rand = Math.random();

        if (rand <= 0.1 && numOfcolor5 > 0){
            numOfcolor5--;
            return color5;
        }
        else if (rand > 0.1 && rand <= 0.4 && numOfcolor10 > 0){
            numOfcolor10--;
            return color10;
        }
        else if (rand > 0.4 && numOfcolor25 > 0){
            numOfcolor25--;
            return color25;
        }
        else if (numOfcolor25 > 0){
            numOfcolor25--;
            return color25;
        }
        else if (numOfcolor10 > 0){
            numOfcolor10--;
            return color10;
        }
        else if (numOfcolor5 > 0){
            numOfcolor5--;
            return color5;
        }
        else{
            return color5;
        }
    }

    function monsterInPos(checkI,checkJ){
        if (board[checkI][checkJ] !== 5 && board[checkI][checkJ] !== 6 && board[checkI][checkJ] !== 7)
            return true;
        else
            return false;
    }

    function mostaerCatchPack(){
        for (var num = 0 ; num < monstarsArr.length; num++){
            if (shape.i === monstarsArr[num].i && shape.j === monstarsArr[num].j){
                return true;
            }
        }
        return false;
    }

    function drawCurrBoardAsNew(){
        context.clearRect(0, 0, canvas.width, canvas.height); //clean board
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.shadowBlur = 10;
        context.shadowColor = "black";
        
        context.font = "bold 20px cursive";
        context.fillText("Score: " + score,30,50);
        context.fillText("Time Left: " + time_elapsed,30,90);
        context.fillText("Lives: " + lives,30,130);
        var numOfMonstaresToCreate = numOfMons;
        for (var i = 0; i < 14; i++) {
            for (var j = 0; j < 13; j++) {
                if (i === 0 && j === 0 && numOfMonstaresToCreate > 0){
                    board[i][j] = ballsBoard[i][j] = 5;
                    numOfMonstaresToCreate--;
                    monstarsArr[0].i = i;
                    monstarsArr[0].j = j;
                    boardForSecondTry[i][j] = 5;
                }else if (i === 9 && j === 9 && numOfMonstaresToCreate > 0){
                    ballsBoard[i][j] = board[i][j] = 6;
                    monstarsArr[2].i = i;
                    monstarsArr[2].j = j;
                    numOfMonstaresToCreate--;
                    boardForSecondTry[i][j] = 6;
                }else if (i === 0 && j=== 9 && numOfMonstaresToCreate > 0){
                    ballsBoard[i][j] = board[i][j] = 7;
                    monstarsArr[1].i = i;
                    monstarsArr[1].j = j;
                    numOfMonstaresToCreate--;
                    boardForSecondTry[i][j] = 7;
                }else if (boardForSecondTry[i][j] === 2 || boardForSecondTry[i][j] === 5 || boardForSecondTry[i][j] === 6 || boardForSecondTry[i][j] ===7){
                    board[i][j] = boardForSecondTry[i][j] = 0;
                } else {
                    board[i][j] = boardForSecondTry[i][j];
                }
            }
        }
        getNewRrandomPosForPac();
        Draw();
    }

    function getNewRrandomPosForPac(){
        var randomI;
        var randomJ;
        var foundNewPos = false;
        while (!foundNewPos){
            randomI = Math.random();
            randomJ =  Math.random();
            randomI = ((randomI * 14)| 0);
            randomJ = ((randomJ * 13)| 0);
            if (board[randomI][randomJ] !== 4  && board[randomI][randomJ] !== 5 &&
                board[randomI][randomJ] !== 6 && board[randomI][randomJ] !== 7 &&
                board[randomI][randomJ] !== 1){
                    shape.i = randomI;
                    shape.j = randomJ;
                    board[randomI][randomJ] = 2;
            }
            foundNewPos = true;
        }
    }

    function initWalls(){
        for(var i = 0; i < 14; i++){
            wallPos[i] = new Array();
        }
        wallPos[1][2] = 1;

        wallPos[1][2] = 1;
        wallPos[1][4] = 1;
        wallPos[1][5] = 1;
        wallPos[1][6] = 1;
        wallPos[1][8] = 1;
        wallPos[1][9] = 1;
        wallPos[1][11] = 1;

        wallPos[2][9] = 1;
        wallPos[2][11] = 1;

        wallPos[3][3] = 1;
        wallPos[3][4] = 1;
        wallPos[3][11] = 1;

        wallPos[4][1] = 1;
        wallPos[4][3] = 1;
        wallPos[4][4] = 1;
        wallPos[4][6] = 1;
        wallPos[4][7] = 1;
        wallPos[4][9] = 1;
        wallPos[4][10] = 1;
        wallPos[4][11] = 1;

        wallPos[5][1] = 1;
        wallPos[5][7] = 1;

        wallPos[6][1] = 1;
        wallPos[6][4] = 1;
        wallPos[6][5] = 1;
        wallPos[6][7] = 1;
        wallPos[6][9] = 1;
        wallPos[6][10] = 1;

        wallPos[7][1] = 1;
        wallPos[7][4] = 1;
        wallPos[7][7] = 1;
        wallPos[7][9] = 1;
        wallPos[7][10] = 1;

        wallPos[8][1] = 1;
        wallPos[8][4] = 1;

        wallPos[9][1] = 1;
        wallPos[9][2] = 1;
        wallPos[9][4] = 1;
        wallPos[9][6] = 1;
        wallPos[9][7] = 1;
        wallPos[9][8] = 1;
        wallPos[9][9] = 1;

        wallPos[10][2] = 1;
        wallPos[10][11] = 1;

        wallPos[11][2] = 1;
        wallPos[11][4] = 1;
        wallPos[11][5] = 1;
        wallPos[11][7] = 1;
        wallPos[11][8] = 1;
        wallPos[11][9] = 1;
        wallPos[11][11] = 1;

        wallPos[12][11] = 1;

        for (var i = 0; i < 14; i++){
            for (var j = 0; j < 13;j++){
                if (wallPos[i][j] === null){
                    wallPos[i][j] === 0;
                }
            }
        }
    }