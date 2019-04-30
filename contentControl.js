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
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
    }