$(document).ready(function(){
    $("#btn_signup").on('click', function(){

      var username = $("#username").val();
      var password = $("#password").val();
      var cpassword = $("#cpassword").val();
      var email = $("#email").val();

      $.ajax(
        {
          url: 'connect.php',
          method: 'POST',
          data: {
                  btn_signup: 1,
                  usernamePHP: username,
                  passwordPHP: password,
                  cpasswordPHP: cpassword,
                  emailPHP: email
               },
               dataType: 'json',

          success:function(r_response){
            $(".form-message").css("display", "block");

            if(r_response.status == 1){
              $("#signup-form")[0].reset();
              $(".form-message").html('<p>' + r_response.message + '</p>');  //1 paragraph == green, 2 == red
            }else{
              $(".form-message").css("display", "block");
              $(".form-message").html('<p>'+'</p>'+'<p>' + r_response.message  +  '</p>');
            }
          }
        } 
      ); 
    });
  });