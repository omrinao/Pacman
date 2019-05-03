var userNames = ["a"];
var passwords = ["a"];
var emails = [];
var userNameConnected;

$(function (e) {
    $("#register_user").click(function(){

        
        $("#user_name_error").hide();
        $("#user_password_error").hide();
        $("#first_name_error").hide();
        $("#last_name_error").hide();
        $("#email_error").hide();
        $("#BD_error").hide();

        var userNameValid = isUserNameValid();
        var userPasswordValid = isPasswordValid();
        var fNameValid = isFNameValid();
        var lNameValid = isLNameValid();
        var emailValid = isEmailValid();
        var birthDayValid = isBDValid();
        
        if (userNameValid && userPasswordValid && fNameValid && lNameValid && emailValid && birthDayValid){
            alert("registration successful! please login to start a game!");
            addUser();
            display_login_page();
            document.getElementById("register_form").reset();
        }
    });
});

    function isUserNameValid(){

        var userName = $("#user_name").val();
        if (userName === ''){
            $("#user_name_error").html("User name must be filled.")
                $("#user_name_error").show();
                return false;
        }
        for(let i = 0; i < userNames.length; i++)
        {
            if (userNames[i].localeCompare(userName) === 0){
                $("#user_name_error").html("User name is already taken, please choose another one.")
                $("#user_name_error").show();
                return false;
            }
        }
        $("#user_name_error").hide();
        return true;
    }


    function isPasswordValid(){
        var password = $("#user_password").val();
        if (password.length < 8){
            $("#user_password_error").html("At least 8 characters.")
            $("#user_password_error").show();
            return false;
        } else {
            if (!(/\d+/.test(password) && (/[a-zA-Z]/.test(password)))){
                $("#user_password_error").html("At least 1 letter and 1 digit.")
                $("#user_password_error").show();
                return false;
            }
            else {
                $("#user_password_error").hide();
                return true;
            }
        }   
    }




    function isFNameValid(){
        var pattern = /^[A-Za-z]+$/;
        var fName = $("#user_first_name").val();
        if (pattern.test(fName) && fName !== ''){
            $("#first_name_error").hide();
            return true;
        } else {
            $("#first_name_error").html("Should contain only characters.");
            $("#first_name_error").show();
            return false;
        }

    }

    function isLNameValid(){
        var pattern = /^[A-Za-z]+$/;
        var fName = $("#user_last_name").val();
        if (pattern.test(fName) && fName !== ''){
            $("#last_name_error").hide();
            return true;
        } else {
            $("#last_name_error").html("Should contain only characters.");
            $("#last_name_error").show();
            return false;
        }

    }

    function isEmailValid(){
        var pattern = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
        var email = $("#user_email").val();
        if (isEmailExists(email)){
            $("#email_error").html("email already exists.");
            $("#email_error").show();
            return false;
        } else {
            if (pattern.test(email) && email !== ''){
                $("#email_error").hide();
                return true;
                
            }else{
                $("#email_error").html("Invalid email.");
                $("#email_error").show();
                return false;
            }
        }
    }

    function isEmailExists(email){
        for(let i = 0; i < emails.length; i++)
        {
            if (emails[i].localeCompare(email) === 0)
                return true;
        }
        return false;
    }

function isBDValid(){
    var date = new Date();
    var BD = $("#birth_date").val();
    var BD = new Date(BD);
    if (date < BD){
        $("#BD_error").html("Invalid date.");
        $("#BD_error").show();
        return false;
    }
    else{
        $("#BD_error").hide();
        return true;
    }
}
    
function addUser(){
    var userName = document.getElementById("user_name").value;
    var password = document.getElementById("user_password").value;
    var email = document.getElementById("user_email").value;
    userNames.push(userName);
    passwords.push(password);
    emails.push(email);
}


function tryLogin(){
    var userName = document.getElementById("user_name_login").value;
    var password = document.getElementById("user_password_login").value;
    var nameIndex = userNames.indexOf(userName);
    var passwordIndex = passwords.indexOf(password);
    if (nameIndex > -1 && passwordIndex > -1 && passwordIndex === nameIndex){
        alert("You are logged in!")
        display_settings_page();
        document.getElementById("user_name_login").value = "";
        document.getElementById("user_password_login").value = "";
        userNameConnected = userName;
        document.getElementById("userNameConnectedLabel").textContent = "Hello, " + userNameConnected;
        document.getElementById("userNameConnectedLabel").style.display = "block";
        document.getElementById("logOut").textContent = "Log Out";
        document.getElementById("logOut").style.display = "block";
        document.getElementById("settings_menu").style.display = "block";
        document.getElementById("login_menu").style.display = "none";
        document.getElementById("register_menu").style.display = "none";
        document.getElementById("register_btn").style.display = "none";
        document.getElementById("login_btn").style.display = "none";
    }
    else{
        alert("User name or password in correct, please try again");
        event.preventDefault();
    }

}

function tryLogout(){
    document.getElementById("userNameConnectedLabel").style.display = "none";
    document.getElementById("logOut").style.display = "none";
    document.getElementById("login_menu").style.display = "initial";
    document.getElementById("register_menu").style.display = "initial";
    document.getElementById("settings_menu").style.display = "none";
    document.getElementById("register_btn").style.display = "initial";
    document.getElementById("login_btn").style.display = "initial";
    display_welcome();
}