    function displayNone(){
        let Welcome = document.getElementById("welcome");
        Welcome.style.display = "none";
        
        let Login = document.getElementById("login_page");
        Login.style.display = "none";

        let Register = document.getElementById("register_page");
        Register.style.display = "none";
    }

    function display_welcome(){
        var x = document.getElementById("welcome");
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
        else
        {
            x.style.display = "none";
        }
    }

    function display_register_page(){
        var x = document.getElementById("register_page");
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
        else
        {
            x.style.display = "none";
        }
    }

    function display_login_page(){
        var x = document.getElementById("login_page");
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
        else
        {
            x.style.display = "none";
        }

    function display_settings_page(){
        var x = document.getElementById("setting_page");
        if (x.style.display === "none")
        {
            displayNone();
            x.style.display = "block";
        }
        else
        {
            x.style.display = "none";
        }
    }
}