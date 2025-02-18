<?php	

include("config.php");
$i = "0";
function thumbnail_query_db()
    {
    global $db_host, $db_username, $db_password, $db_name, $tbl_name, $i;

    $db_connect = mysqli_connect("$db_host", "$db_username", "$db_password", "$db_name");
    $blog_lookup = "SELECT * FROM blog WHERE entry_id > '202' LIMIT 3";
    $result = mysqli_query($db_connect, $blog_lookup);
    while($row = mysqli_fetch_assoc($result))
    {
		include("thumbnail-template.php");
		$i++;
	}
    return $blog_entry_thumbnails;
    }

$blog_entry_thumbnails = thumbnail_query_db();


