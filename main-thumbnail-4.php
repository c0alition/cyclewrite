<?php	
include("config.php");
$q = $_GET['q'];
function directory_name_from_title($title) {
    $title = preg_replace('/[^a-zA-Z0-9\s]/', '', $title); 
    $title = preg_replace('/\s+/', '-', $title); 
    $title = strtolower($title); 
    return $title;
}
function generate_thumbnail($q) {
    include("config.php");
    $q = "SELECT * FROM entry ORDER BY upload_date DESC LIMIT " . $q;
    function thumbnail_lookup($h, $u, $p, $d, $q) {
        $entry_thumbnail = [];
        $c = mysqli_connect($h, $u, $p, $d);
        if (!$c) {exit("Something went not right: " . mysqli_connect_error());}
        $q = mysqli_query($c, $q);
        while($row = mysqli_fetch_assoc($q)) {
            $title = $row["title"].                     
            $desc = $row["description"]; 
            $url = directory_name_from_title($title);                           
            include("entry-thumbnail-template.php");            
        }
        mysqli_close($c); 
        }
    thumbnail_lookup($h, $u, $p, $d, $q);
}
generate_thumbnail($q);
?>