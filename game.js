    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var shape = new Object();
    var board;
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

    var background = new Image();
    background.src = "pics/background.png";
    var ball = new Image();
    ball.src = "pics/ball.png";

    function Start() {
        lblScore.value = 0;
        lblTime.value = numOfsecs;
        lblLives.value = 3;
        time_elapsed = 0;
        score = 0;
        lives = 3;
        board = new Array();
        score = 0;
        pac_color = "yellow";
        var cnt = 100;
        var food_remain = 50;
        var pacman_remain = 1;
        start_time = new Date();
        for (var i = 0; i < 10; i++) {
            board[i] = new Array();
            //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
            for (var j = 0; j < 10; j++) {
                if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                    board[i][j] = 4;
                } else {
                    var randomNum = Math.random();
                    if (randomNum <= 1.0 * food_remain / cnt) {
                        food_remain--;
                        board[i][j] = 1;
                    } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                        shape.i = i;
                        shape.j = j;
                        pacman_remain--;
                        board[i][j] = 2;
                    } else {
                        board[i][j] = 0;
                    }
                    cnt--;
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
        interval = setInterval(UpdatePosition, 250);
    }


    function findRandomEmptyCell(board) {
        var i = Math.floor((Math.random() * 9) + 1);
        var j = Math.floor((Math.random() * 9) + 1);
        while (board[i][j] !== 0) {
            i = Math.floor((Math.random() * 9) + 1);
            j = Math.floor((Math.random() * 9) + 1);
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
        context.drawImage(background, 0, 0, 600, 480);
        context.shadowBlur = 10;
        context.shadowColor = "black";
        lblScore.value = score;
        lblTime.value = time_elapsed;
        lblLives.value = lives;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var center = new Object();
                center.x = i * 60 + 30;
                center.y = j * 46 + 30;
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
                else if (board[i][j] === 1) {
                    /*context.beginPath();
                    context.arc(center.x, center.y, 12, 0, 2 * Math.PI); // circle
                    context.fillStyle = "white"; //color of balls
                    context.fill();*/
                    context.drawImage(ball, center.x - 12, center.y - 12, 25, 25);
                } else if (board[i][j] === 4) {
                    context.beginPath();
                    context.rect(center.x - 30, center.y - 30, 50, 50);
                    context.fillStyle = "grey"; //color
                    context.fill();
                }
                /*else{
                    var sticky = new Image();
                    sticky.src = "pics/ghostorange.png";
                    context.drawImage(sticky, center.x, center.y, 30, 30);
                }*/
            }
        }
    }

    function UpdatePosition() {
        board[shape.i][shape.j] = 0;
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
        if (board[shape.i][shape.j] === 1) {
            score++;
        }
        board[shape.i][shape.j] = 2;
        var currentTime = new Date();
        time_elapsed = numOfsecs - (currentTime - start_time) / 1000;
        if (time_elapsed <= 50){
            window.clearInterval(interval);
            window.alert("Time is up! you loose!");
        }
        if (score >= 20 && time_elapsed <= 10) {
            pac_color = "green";
        }
        if (score === 50) {
            window.clearInterval(interval);
            window.alert("Game completed");
        } else {
            Draw();
        }
    }

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
        Start();
    }