$.ajax({
  url: 'get_profile.php',
  type: 'GET',
  dataType: 'json',
  success: function(userData) {
    // Assuming the response is an array with a single user object
    var user = userData[0];

    // Populate the form fields with user data
    var usernameField = document.getElementById("username");
    var passwordField = document.getElementById("password");
    var emailField = document.getElementById("email");

    usernameField.value = user.username;
    passwordField.value = user.password;
    emailField.value = user.email;
  }
});
