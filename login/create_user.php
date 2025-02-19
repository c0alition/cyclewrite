<?php



function create_user()
    {
    include("config.php");
    $tbl_name="users";

    mysql_connect("$db_host", "$db_username", "$db_password")or die("Cannot Connect");
    mysql_select_db("$db_name")or die("Database Unavailable");

    $email=$_POST['email'];
    $password=$_POST['password'];

    $email = stripslashes($email);
    $password = stripslashes($password);
    $email = mysql_real_escape_string($email);
    $password = mysql_real_escape_string($password);
    $email = strtolower($email);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql="INSERT INTO  $tbl_name (email, password) VALUES ('$email', '$hashed_password')";
    mysql_query($sql);
    }

create_user();
header('Location: login.php');


