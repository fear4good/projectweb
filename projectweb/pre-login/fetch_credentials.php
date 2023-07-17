<?php

include "../connect.php";

if(isset($_SESSION['loggedin'])){
    header("../after-login/main.php");
}

if(isset($_POST['btn_signup'])){
  
  $r_response = array(
      'status' => 0,
      'message' => ''
  );

  $r_username = $db->real_escape_string($_POST['usernamePHP']);
  $r_password = $db->real_escape_string($_POST['passwordPHP']);
  $r_cpassword = $db->real_escape_string($_POST['cpasswordPHP']);
  $r_email = $db->real_escape_string($_POST['emailPHP']);

  if(empty($r_username)){
      $r_response['message'] .= "Username is missing. ";
  }else{
      $select = $db->query("SELECT id FROM users WHERE username = '$r_username'");
      if($select->num_rows >0){
          $r_response['message'] .= "Username already exists. ";
      }
  }

  if(empty($r_password)){
      $r_response['message'] .= "Password is missing. ";
  }else if(strlen($r_password)<8){
      $r_response['message'] .= "Password must be at least 8 characters. ";
  }else if(!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,30}$/', $r_password)){
      $r_response['message'] .= "Password must contain on Upper case, one Lower Case and a symbol(@#\-_$%^&+=§!\?). ";
  }
  
  if(empty($r_cpassword)){
      $r_response['message'] .= "Confirm Password is missing. ";
  }else if($r_cpassword != $r_password){
      $r_response['message'] .= "Passwords don't match. ";
  }

  if(empty($r_email)){
      $r_response['message'] .= "Email is missing. ";
  }else if(!filter_var($r_email, FILTER_VALIDATE_EMAIL)){
      $r_response['message'] .= "Please enter a valid E-mail. ";
  }
  
  if(empty($r_response['message'])){
      if($db->query("INSERT INTO users (username, password, email) VALUES ('$r_username', '$r_password', '$r_email')") === true){
          $r_response['status'] = 1;
          $r_response['message'] = "Successful Sign Up!";
      }else{
          $r_response['message'] = "Error Inserting, ". $db->error;
      }
  }

  echo json_encode($r_response);
  $db->close();
}

if(isset($_POST['btn_login'])){
    $l_response = array(
        'status' => 0,
        'message' => ''
    );

    $l_username = $db->real_escape_string($_POST['usernamePHP']);
    $l_password = $db->real_escape_string($_POST['passwordPHP']);
    
    if(empty($l_username)){
        $l_response['message'] .= "Username is missing. ";
    }else{
        $select = $db->query("SELECT id FROM users WHERE username = '$l_username'");
        if($select->num_rows == 0){
            $l_response['message'] .= "Username doesn't exists. ";
        }
    }

    if(empty($l_password)){
        $l_response['message'] .= "Password is missing. ";
    }

    if(empty($l_response['message'])){
        $select = $db->query("SELECT id FROM users WHERE username = '$l_username' AND password = '$l_password'");
        if($select->num_rows > 0){
            $l_response['status'] = 1;
            $_SESSION['loggedin'] = '1';
            $_SESSION['username'] = $l_username;
        }
    }
    echo json_encode($l_response);
    $db->close();
}
?>