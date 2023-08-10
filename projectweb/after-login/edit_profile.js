$(document).ready(function() {
  // Change Username Form Submission
  $("#change-username-form").submit(function(event) {
    event.preventDefault();
    const newUsername = $("#new-username").val();

     // Send AJAX request to update the username using update_username.php
    $.ajax({
      url: "update_username.php",
      method: "POST",
      data: { new_username: newUsername },
      dataType: "json",
      success: function(response) {
        // Handle the response (show a success message, update UI, etc.)
        if (response.success) {
          console.log(response.message);
        } else {
          console.error("Error updating username:", response.message);
        }
      },
      error: function(response) {
        console.error("Error updating username:", response);
      }
    });
  });
  // Change Password Form Submission
  $("#change-password-form").submit(function(event) {
    event.preventDefault();
    const currentPassword = $("#current-password").val();
    const newPassword = $("#new-password").val();

    // Send AJAX request to update the password using update_password.php
    $.ajax({
      url: "update_password.php",
      method: "POST",
      data: { current_password: currentPassword, new_password: newPassword },
      dataType: "json",
      success: function(response) {
        // Handle the response (show a success message, update UI, etc.)
        console.log(response.message);
      },
      error: function(error) {
        console.error("Error updating password:", error);
      }
    });
  });

  // Change Email Form Submission
  $("#change-email-form").submit(function(event) {
    event.preventDefault();
    const newEmail = $("#new-email").val();

    // Send AJAX request to update the email using update_email.php
    $.ajax({
      url: "update_email.php",
      method: "POST",
      data: { new_email: newEmail },
      dataType: "json",
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.error("Error updating email:", error);
      }
    });
  });
});