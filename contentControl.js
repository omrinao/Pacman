    function displayNone(){
        let Welcome = document.getElementById("welcome");
        Welcome.style.display = "none";
        
        let Login = document.getElementById("login_page");
        Login.style.display = "none";

        let Register = document.getElementById("register_page");
        Register.style.display = "none";

        let Settings = document.getElementById("setting_page");
        Settings.style.display = "none";

        let Play = document.getElementById("game");
        Play.style.display = "none";
        document.getElementById("gameEnd").style.display = "none";

        let About = document.getElementById("myModal");
        About.style.display = "none";

        document.getElementById("footerid").style.display = "block";
        window.clearInterval(interval);
    }

    function cleanInputs(){
        document.getElementById("user_name").value = "";
        document.getElementById("user_password").value = "";
        document.getElementById("user_first_name").value = "";
        document.getElementById("user_last_name").value = "";
        document.getElementById("user_email").value = "";
        document.getElementById("birth_date").value = "";
        document.getElementById("user_name_login").value = "";
        document.getElementById("user_password_login").value = "";
        document.getElementById("user_name_error").style.display = "none";
        document.getElementById("user_password_error").style.display = "none";
        document.getElementById("first_name_error").style.display = "none";
        document.getElementById("last_name_error").style.display = "none";
        document.getElementById("email_error").style.display = "none";
        document.getElementById("BD_error").style.display = "none";
        document.getElementById("upArrow").innerHTML = "Up Arrow";
        document.getElementById("downArrow").innerHTML = "Down Arrow";
        document.getElementById("leftArrow").innerHTML = "Left Arrow";
        document.getElementById("rightArrow").innerHTML = "Right Arrow";
        if (mySound != null && mySound.src != null){
            mySound.src = "";
        }
    }

    function display_welcome(){
        var x = document.getElementById("welcome");
        cleanInputs();
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
    }
    

    function display_register_page(){
        var x = document.getElementById("register_page");
        cleanInputs();
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
    }

    function display_login_page(){
        var x = document.getElementById("login_page");
        cleanInputs();
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
    }

    function display_settings_page(){
        var x = document.getElementById("setting_page");
        cleanInputs();
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
    }

    function display_about_page(){
        // Get the modal
        var modal = document.getElementById('myModal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        var aboutMessage = "This site was built by: Avi Giz & Omri Naor" + "</hr>" + "<br>" + "<br>" +
         "We used the basic jQuery library to check the integrity of the input cells for registration and connection to the site by using basic functions and valid input formats, such as a password containing 8 characters and one letter, a valid email format, first name and last name that do not contain digits."
         + "<br>" + "<br>" + "The difficulty we encountered during the course of the work was dealing with dynamic code, which changes every input from the user and requires synchronization with several objects participating in the game.";
        var para = document.getElementById("aboutContent").innerHTML = aboutMessage;
        

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
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
        }
        }
    }


    function display_game_page(){
        var x = document.getElementById("game");
        cleanInputs();
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
            document.getElementById("settings_menu").style.display = "block";
            document.getElementById("restart_menu").style.display = "block";
            document.getElementById("footerid").style.display = "none";
        }
    }