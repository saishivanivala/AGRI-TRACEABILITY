session_user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {


    $('#passcheck').hide();
    $('#mobilecheck').hide();

    AjaxGet("https://mj9jyf4frj.execute-api.us-east-1.amazonaws.com/test?req_id="+session_user, 
        {"x-api-key":"WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4"},
        function (status, data) {

        if (status != "error") {
            console.log(data);
            // alert("data is " + data["result"][0]['party_name']);
            $("#name").val(data["result"][0]['party_name']);
            $("#mobile").val(data["result"][0]['mobile']);
            $("#type").val(data["result"][0]['party_type']); 
            $("#city").val(data["result"][0]['city']);
            $("#address").val(data["result"][0]['mobile']);
            $("#password").val(data["result"][0]['password']);
            $("#state").val(data["result"][0]['state']);
            $("#PIN").val(data["result"][0]['PIN']);
            $("#role").val(data["result"][0]['role']);

            // $('#mobile')

        }
        else {
            alert(errorThrown + "data is " + data);

        }
    });// AJAX GET
    
});// DOCUMENT READY


// --------------VALIDATION FUNCTIONS

    function validatePassword() {
        let passwrdValue = $('#password').val();
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

    function validateMobile() {
        let mobileValue = $('#mobile').val();
        if (mobileValue.length == '') {
            $('#mobilecheck').show();
            mobileError = false;
            return false;
        }

        if (mobileValue.length < 10) {
            $('#mobilecheck').show();
            $('#mobilecheck').html("**The mobile number should contain 10 numbers");
            mobileError = false;
            return false;
        }

        if (!(/^[0-9]+$/.test(mobileValue))) {
            $('#mobilecheck').show();
            $('#mobilecheck').html("**The mobile number should contain only numbers");
            mobileError = false;
            return false;
        }

        else {
            $('#mobilecheck').hide();
        }
    }


    // ----------------- ON CLICK FUNCTIONS-------------------

    $('#edit-details').click(function () {
        
        $('#name').removeAttr('readonly');
        $('#type').removeAttr('disabled');
        $('#mobile').removeAttr('readonly');
        $('#city').removeAttr('readonly');
        $('#address').removeAttr('readonly');
        $('#password').removeAttr('readonly');
        $('#PIN').removeAttr('readonly');
        $('#role').removeAttr('readonly');
        $('#state').removeAttr('readonly');
        $('#submit-details').removeAttr('disabled');

    });  //Edit button on click function

    $('#submit-details').click(function () {
        
        validatePassword();
        validateMobile();
        updated_data = {
            "party_name":$('#name').val(),
            "PIN":$('#PIN').val(),
            "address_L1":$('#address').val(),
            "address_L2":$('#address').val(),
            "city":$('#city').val(),
            "mobile":$('#mobile').val(),
            "party_type":$('#type').val(),
            "password":$('#password').val(),
            "req_id":session_user,
            "state":$('#state').val(),
            "role":$('#role').val()
            }

        AjaxPost('https://w2c5o43d6a.execute-api.us-east-1.amazonaws.com/update_party_details',
        {"x-api-key":"WLMG1xTS4474U4OZ9tdCR2Dspx1XJrGa2xvnP7A4"}, updated_data, 
        function (status, data) {
            if (status != "error") {
                console.log(data);
                alert("Data Updated")
                location.reload();
            }
            else {
              alert(errorThrown + "data is " + data);
            }
      
          });// AJAX POST

    }); // Submit details on click function




