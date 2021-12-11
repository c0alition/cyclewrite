<?php	

include("config.php");
$i = "0";
function query_db()
    {
    global $db_host, $db_username, $db_password, $db_name, $tbl_name, $i;

    $db_connect = mysqli_connect("$db_host", "$db_username", "$db_password", "$db_name");
    $blog_lookup = "SELECT * FROM blog ORDER BY RAND() LIMIT 4";
    $result = mysqli_query($db_connect, $blog_lookup);
    while($row = mysqli_fetch_assoc($result))
    {
		$blog_content_full = $row["blog_content"];
		$blog_content_preview=substr($blog_content_full,0,350) . '...';
		include("main-thumbnail-template.php");
		$i++;
	}
    }

$blog_entry_thumbnails = query_db();

?>