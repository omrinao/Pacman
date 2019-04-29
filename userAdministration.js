var userNames = ["a"];
var passwords = ["a"];


$((function(event){
    $('#register_user').click(function(){
        var userName = $('user_name').val();
        var password = $('user_password').val();
        var firstName = $('user_first_name').val();
        var lastName = $('user_last_name').val();
        var email = $('user_email').val();

        allValid = false;
        if (!checkForEmptyFields(userName,password,firstName,lastName,email))
            alert('You have to fill all the fields please');
        else
            if (isUserNameExists(userName))
                alert('User name is already exists, choose another one');
            else
                if (!isPasswordValid(password))
                    alert('Password is not valid, password need to be at least 8 character with one letter and one digit.')
                else
                    if (!isNameValid(firstName) || !isNameValid(lastName)){
                        if (!isNameValid(firstName))
                            alert('first name is not valid, please enter only letter')
                        else
                            alert('Last name is not valid, please enter only letter')
                    }
                    else
                        if (!isEmailValid(email))
                            alert('email is not valid')
                        else
                            allValid = true;
        if (!allValid){
            event.preventDefalut();
        }
        else{
            addUser(userName,password);
            alert('Account created! \nLogin to start a game!');
            display_login_page();
        }
    });
}));

function tryLonin(){
    var userName = document.getElementsByTagName('user_name');
    var password = document.getElementsByTagName('user_password');
    var nameIndex = userNames.indexOf(userName);
    var passwordIndex = passwords.indexOf(password);
    if (nameIndex > -1 && passwordIndex > -1 && passwordIndex === nameIndex){
        alert("You are logged in!")
        display_settings_page();
    }
    else{
        alert("User name or password in correct, please try again");
        event.preventDefault();
    }

}
function isPasswordValid(password){
    if (/\d+/.test(password) && (/[a-zA-Z]/.test(password)) && password.length > 7)
        return true;
    else
        return false;
}

function checkForEmptyFields(userName,password,firstName,lastName,email){
    if (trim(userName).lenth === 0 ||
        trim(password).lenth === 0 ||
        trim(firstName).lenth === 0 ||
        trim(lastName).lenth === 0 ||
        trim(email).lenth === 0)

        return false;
    else
        return true;
}

function isUserNameExists(userName){
    for(let i = 0; i < userNames.length; i++)
    {
        if (userNames[i].localeCompare(userName))
            return true;
    }
    return false;
}

function isNameValid(name){
    var validNameInput = /^[A-Za-z]+$/;
    if (validNameInput.test(name))
        return true;
    else
        return false;
}

function isEmailValid(email){
    var validEmail = /\S+@\S+\.\S+/;
    if (validEmail.test(email))
        return true;
    else
        return false;
}

function addUser(userNmae, password){
    userNames.push(userNmae);
    passwords.push(password);
}