<?php

/*ini_set('display_errors',1);
error_reporting(E_ALL); */
session_start();
$user_id= "1";


include("../config.php");
$is_gpx=$_POST['is-gpx'];
$is_album=$_POST['is-album'];
$upload_blog=$_POST['upload-blog'];
$blog_title=$_POST['blog-title'];
$blog_content=$_POST['blog-content'];
$cover_direct_file_name="";
$entry_id="";
$file_name_complete="";

function upload($upload_directory)
{
global $user_id, $is_gpx, $is_album, $upload_blog, $author, $cover_directory_file_name;

if ($is_gpx == "true")
    {
    $cover_directory_file_name = "uploads/" . $user_id . "/" . cover_upload($upload_directory);
    }
if ($is_album == "true")
    {
    album_upload($upload_directory);
    }
if ($upload_blog == "true")
    {
    blog_upload($upload_directory, $author, $cover_directory_file_name);
    }
}

//makes user directory and root media subdirectories 1/album/ 
function user_directory()
{
global $user_id;
if (!is_dir($user_id . "/"))
    {
    mkdir($user_id . "/");
    }
    
if (!is_dir($user_id . "/album/"))
    {
    mkdir($user_id . "/album/");
    }
    
}

//returns subdirectories for media based on month and day DEC 25 = 12/25/ 
function date_as_directory()
{
$date = getdate();
$month = $date['mon'];
$day = $date['mday'];
$upload_directory = $month . "/" . $day . "/";
if (!is_dir($month . "/"))
    {
    mkdir($month . "/");
    }

if (!is_dir($upload_directory))
    {
    mkdir($upload_directory);
    }
    return $upload_directory;
}


//upload for cover photo
function cover_upload($upload_directory)
{
global $user_id, $file_name_complete;
$date = getdate();
$month = $date['mon'];
$day = $date['mday'];
$file_name_complete = "uploads/" . $user_id . "/album/" . $upload_directory . $month . $day . $user_id;
$file_name = $month . $day . $user_id . "-cover.jpg";
	
$cover_directory_file_name = "album/" . $upload_directory . $file_name;
if (!file_exists($cover_directory_file_name))
    {
    if (move_uploaded_file($_FILES["cover-photo"]["tmp_name"], $cover_directory_file_name))
        {
        echo "The file ". basename( $_FILES["cover-photo"]["name"]). " has been uploaded.";
        }
    else{
        echo "Something went wrong out back...";
        }
    }
	
return $cover_directory_file_name;
}

//picture processing upload, and replace $blog_entry data with file names and their directories
function album_upload($upload_directory)
{
global $user_id, $blog_content;

$date = getdate();
$month = $date['mon'];
$day = $date['mday'];
$file_name = $month . $day . $user_id; 
$directory_file_name = "album/" . $upload_directory . $file_name;

$i = 0;	
foreach ($_FILES["album-file"]["name"] as $f => $name){

if (!file_exists($directory_file_name))
	
    {
    if (move_uploaded_file($_FILES["album-file"]["tmp_name"][$f], $directory_file_name . "-" . $i . ".jpg"))
        {
        echo "The file ". basename( $_FILES["album-file"]["name"][$f]). " has been uploaded.";
        }
    else{
        echo "Something went wrong out back..." ;
        }
    }
$src_tag="</pre><div class='w3-container'><img class='entry-img' src='uploads/" . $user_id . "/" . $directory_file_name . "-" . $i . ".jpg'></div><pre>";
$picture_str = "pic" . $i;
$blog_content = str_replace($picture_str, $src_tag, $blog_content);
$i++;


}
}

function query_db()
{
global $db_host, $db_username, $db_password, $db_name, $user_id;

$db_connect = mysqli_connect("$db_host", "$db_username", "$db_password", "$db_name");
$users_lookup = "SELECT firstname, lastname FROM users WHERE id = '$user_id'";
$result = mysqli_query($db_connect, $users_lookup);
$users_record = mysqli_fetch_assoc($result);
$firstname = $users_record["firstname"];
$lastname = $users_record["lastname"];
$author = $firstname . " " . $lastname;    
return $author;

}

function blog_upload($upload_directory, $author)
{
global $db_host, $db_username, $db_password, $db_name, $user_id, $blog_title, $blog_content, $file_name_complete, $entry_id;
$upload_directory_mod = $upload_directory . $month . $day . $user_id;
$tbl_name="blog";

$db_connect = mysqli_connect("$db_host", "$db_username", "$db_password", "$db_name");	
$blog_content = mysqli_real_escape_string($db_connect, $blog_content);
$make_blog_entry = "INSERT INTO  $tbl_name (blog_title, blog_content, author, user_id, is_gpx, is_album) VALUES ('$blog_title', '$blog_content', '$author', '$user_id', '$file_name_complete', '$upload_directory')";
$blog_entry_upload = mysqli_query($db_connect, $make_blog_entry);
$entry_id = mysqli_insert_id($db_connect);

}


user_directory();
chdir($user_id . "/gpx/");
$upload_directory = date_as_directory();
chdir("../album");
date_as_directory();
//changes back into user directory
chdir("../");
$author = query_db();
upload($upload_directory, $author);
header("location:../entry.php?id=" . $entry_id);
//header("location:../index.php");


?>