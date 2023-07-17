$(document).ready(function(){
    $("#btn_login").on("click", function(){
  
      var username = $("#username").val();
      var password = $("#password").val();
  
      $.ajax(
        {
          url: 'fetch_credentials.php',
          method: 'POST',
          data: {
                  btn_login: 1,
                  usernamePHP: username,
                  passwordPHP: password,
               },
               dataType: 'json',
               cache: 'false',
  
          success:function(l_response){
            $(".form-message").css("display", "block");
  
            if(l_response.status == 1){
              window.location.href = "../after-login/main.php";
            }else{
              $(".form-message").css("display", "block");
              $(".form-message").html('<p>'+'</p>'+'<p>' + l_response.message  +  '</p>');
            }
          }
        } 
      ); 
    });
  });