<?php	

session_start();
$user_id= $_SESSION['user_id'];
include("header.php");
include("config.php");


function query_db()
    {
    global $db_host, $db_username, $db_password, $db_name, $tbl_name, $user_id;

    $db_connect = mysqli_connect("$db_host", "$db_username", "$db_password", "$db_name");
    $blog_lookup = "SELECT * FROM blog WHERE entry_id = $_GET[entry]";
    $result = mysqli_query($db_connect, $blog_lookup);
    $blog_entry = mysqli_fetch_assoc($result);

    return $blog_entry;
    }

function display_blog_entry($blog_entry)
	{
	$blog_title = $blog_entry["blog_title"];
	$blog_content = $blog_entry["blog_content"];
	$author = $blog_entry["author"];
	$cover_photo = $blog_entry["is_gpx"] . "-cover.jpg";
    include("blog-template.php");
    }

$blog_entry = query_db();
display_blog_entry($blog_entry);
?>