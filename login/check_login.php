<?php

    include("./config.php");
    $tbl_name="users";
	$user_id="";

function form_data()
    {
    $email=$_POST['email'];
    $password=$_POST['password'];
    $email = stripslashes($email);
    $password = stripslashes($password);
    $email = mysql_real_escape_string($email);
    $password = mysql_real_escape_string($password);
    $email = strtolower($email);
    $credentials = array($email, $password);
    return $credentials;
    }

function query_db($login_info)
    {
    global $db_host, $db_username, $db_password, $db_name, $tbl_name, $user_id;

    $db_connect = mysqli_connect($db_host, $db_username, $db_password, $db_name);
    $email_login_lookup = "SELECT * FROM $tbl_name WHERE email = '$login_info[0]'";
    $result = mysqli_query($db_connect, $email_login_lookup);
    $user_record = mysqli_fetch_assoc($result);
    $stored_password = $user_record["password"];
    $user_id = $user_record["id"];


    $stored_credentials = array($user_id, $stored_password);
    return $stored_credentials;

    }

function check_password($login_info, $user_record)
    {
	global $user_id;
    if(password_verify($login_info[1], $user_record[1])){
        session_start();
        $_SESSION['user_id'] = $user_id;
        header("location:../admin.php");


    }else{
       header("location:./login.php");
    }
    }
//$db_info = connect();

$login_info = form_data();
$user_record = query_db($login_info);
check_password($login_info, $user_record);

?>