<html>
<head>
<link rel="stylesheet" href="w3.css">
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">

</head>
<body>
    
<header class="w3-container w3-theme-dark w3-padding" id="myHeader">

<h3 class="w3-half">CYCLEWRITE.COM</h3>

                                                                                      
<i onclick="w3_open()" class="fa fa-bars w3-xlarge w3-opennav w3-right" ></i> 

    </header>
<?php
	session_start();
	$user_id= $_SESSION['user_id'];
    $db_host="localhost";
    $db_username="root";
    $db_password="";
    $db_name="cyclewrite";
    $tbl_name="blog";

function query_db()
    {
    global $db_host, $db_username, $db_password, $db_name, $tbl_name, $user_id;

    $db_connect = mysqli_connect("$db_host", "$db_username", "$db_password", "$db_name");
    $blog_lookup = "SELECT * FROM $tbl_name LIMIT 3";
    $result = mysqli_query($db_connect, $blog_lookup);
    $blog_record = mysqli_fetch_assoc($result);

    return $blog_record;
    }

function make_html($blog_record)
	{
	$ride_title = $blog_record["ride_title"];
	$ride_desc = $blog_record["ride_desc"];
	$blog_title = $blog_record["blog_title"];
	$blog_content = $blog_record["blog_content"];
    $is_gpx = $blog_record["is_gpx"];

    include("blog-template.php");
    }

$blog_record = query_db();
make_html($blog_record);
?>
</body>
</html>