$(document).ready(function() {

  const responseContainer = $("#response-message");
  responseContainer.removeClass("success-message error-message");

  // Change Username Form Submission
  $("#change-username-form").submit(function(event) {
    event.preventDefault();
    const newUsername = $("#new-username").val();
    responseContainer.removeClass("success-message error-message");
    $.ajax({
      url: "update_username.php",
      method: "POST",
      data: { new_username: newUsername },
      dataType: "json",
      success: function(response) {
        if (response.success) {
          $("#response-message").html("<p class='success-message'>" + response.message + "</p>");
        } else {

          $("#response-message").html("<p class='error-message'>" + response.message + "</p>");
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        $("#response-message").html("<p class='error-message'>Error updating username: " + textStatus + errorThrown + "</p>");
      }
    });
  });

  // Change Password Form Submission
  $("#change-password-form").submit(function(event) {
    event.preventDefault();
    const currentPassword = $("#current-password").val();
    const newPassword = $("#new-password").val();
    responseContainer.removeClass("success-message error-message");

    $.ajax({
      url: "update_password.php",
      method: "POST",
      data: { "current_password": currentPassword, 
              "new_password": newPassword },
      cache: "false",
      dataType: 'json',
      success: function(response) {
        if (response.success) {
          $("#response-message").html("<p class='success-message'>" + response.message + "</p>");
          alert('Correct Password. You are gonna get logged out');
          window.location.href = "logout.php";
        } else {
          $("#response-message").html("<p class='error-message'>" + response.message + "</p>");
        }
      },
      error: function(textStatus, errorThrown) {
        $("#response-message").html("<p class='error-message'>Error updating password: " + textStatus + errorThrown + "</p>");
      }
    });
  });

  // Change Email Form Submission
  $("#change-email-form").submit(function(event) {
    event.preventDefault();
    const newEmail = $("#new-email").val();
    responseContainer.removeClass("success-message error-message");


    $.ajax({
      url: "update_email.php",
      method: "POST",
      data: { new_email: newEmail },
      dataType: "json",
      success: function(response) {
        if (response.success) {
          $("#response-message").html("<p class='success-message'>" + response.message + "</p>");
        } else {
          $("#response-message").html("<p class='error-message'>" + response.message + "</p>");
        }
      },
      error: function(textStatus, errorThrown) {
        $("#response-message").html("<p class='error-message'>Error updating email: " + textStatus + errorThrown + "</p>");
      }
    });
  });

});  