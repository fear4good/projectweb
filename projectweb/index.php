<?php  

session_start();

if(isset($_SESSION['loggedin'])){
  header('Location: after-login/main');
  exit();
}

?>

<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="pre-login/login-style.css">
    <title>Welcome</title>
</head>
<body>
  <div class="container">
    <h2>Welcome</h2>
    <p>Login or Register</p>
          <button type="button" onclick="location.href='pre-login/login.html'">Login</button>
          <button type="button" onclick="location.href='pre-login/register.html'">Sign Up</button>
  </div>
</body>
</html>