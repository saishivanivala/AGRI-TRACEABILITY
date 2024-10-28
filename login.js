// Document is ready

//SIGN UP
$(document).ready(function () {

    // Validate Username
    $('#usercheck').hide();
    let usernameError = true;
    $('#signup-username').keyup(function () {
        validateUsername();
    });

    function validateUsername() {
        let usernameValue = $('#signup-username').val();
        if (usernameValue == '') {
            $('#usercheck').show();
            usernameError = false;
            return false;
        }
        else if ((usernameValue.length < 3)) {
            $('#usercheck').show();
            $('#usercheck').html("**The username should contain atleast 3 characters");
            usernameError = false;
            return false;
        }
        else {
            $('#usercheck').hide();
        }
    }

    // Validate Password
    $('#passcheck').hide();
    let passwordError = true;
    $('#signup-password').keyup(function () {
        validatePassword();
    });

    function validatePassword() {
        let passwrdValue = $('#signup-password').val();
        if (passwrdValue.length == '') {
            $('#passcheck').show();
            passwordError = false;
            return false;
        }

        if (passwrdValue.length < 8) {
            $('#passcheck').show();
            $('#passcheck').html("**The password should contain atleast 8 characters");
            passwordError = false;
            return false;
        }
        else {
            $('#passcheck').hide();
        }
    }

    // Validate Confirm Password
    $('#conpasscheck').hide();
    let confirmPasswordError = true;
    $('#confirm-password').keyup(function () {
        validateConfirmPasswrd();
    });
    function validateConfirmPasswrd() {
        let confirmPasswordValue =
            $('#confirm-password').val();
        let passwrdValue =
            $('#signup-password').val();
        if (passwrdValue != confirmPasswordValue) {
            $('#conpasscheck').show();
            $('#conpasscheck').html("**Password didn't Match");
            // $('#conpasscheck').css("color", "red");
            confirmPasswordError = false;
            return false;
        } else {
            $('#conpasscheck').hide();
        }
    }

    // Submit button
    $('#signup-submitbtn').click(function () {
        validateUsername();
        validatePassword();
        validateConfirmPasswrd();
        //validateEmail();
        $.ajax({
            url: 'http://localhost:5000/create_user',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "username": $('#signup-username').val(), "email": $('#email').val(), "password": $('#signup-password').val(), }),
            // processData: false,
            success: function (data, textStatus, jQxhr) {
                alert("User created");
                // window.location
                console.log(data)
            },
            error: function (jqXhr, textStatus, errorThrown, data) {
                alert(errorThrown + "data is " + data);
            }
        });

    });

    // validate - login username 
    $('#login-usernamecheck').hide();
    $('#login-username').keyup(function () {
        validateLoginUsername();
    });

    function validateLoginUsername() {
        let usernameValue = $('#login-username').val();
        if (usernameValue == '') {
            $('#login-usernamecheck').show();
            usernameError = false;
            return false;
        }
        else {
            $('#login-usernamecheck').hide();
        }
    }

    // validate - login password 
    $('#login-passwordcheck').hide();
    $('#login-password').keyup(function () {
        validateLoginPassword();
    });

    function validateLoginPassword() {
        let usernameValue = $('#login-password').val();
        if (usernameValue == '') {
            $('#login-passwordcheck').show();
            usernameError = false;
            return false;
        }
        else {
            $('#login-passwordcheck').hide();
        }
    } 

    $('#login-submitbtn').click(function () {
        validateLoginUsername();
        validateLoginPassword();
        data = { "mobile": $('#login-username').val(), "password": $('#login-password').val() }
        AjaxPost('https://mj9jyf4frj.execute-api.us-east-1.amazonaws.com/login',
            { "x-api-key": "WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4" }, data,
            function (status, data) {
                if (status != "error") {
                    console.log(data);
                    var stringified = JSON.stringify(data);
                    var parsedObj = JSON.parse(stringified);
                    if (parsedObj.status == 200) {
                        sessionStorage.setItem('user', JSON.stringify(data.userObject[0]['id']))
                        window.location = 'file:///Users/apple/Desktop/AGRI-TRACEABILITY/homepage.html';
                    }
                    else {
                        alert("Incorrect Username or Password")
                    }

                }
                else {
                    alert(errorThrown + "data is " + data);
                }

            });// AJAX POST

    }); // login-submit

});

// 4 ajax calls

//  jquery validator module
// form validator


