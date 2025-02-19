<?php	
$quantity = $_GET['q'];
function generate_thumbnail($quantity) {
    include("config.php");
    $q = "SELECT * FROM entry ORDER BY upload_date DESC LIMIT" . $quantity;
    function thumbnail_lookup($h, $u, $p, $d, $q) {
        $entry_thumbnail = [];
        $c = mysqli_connect($h, $u, $p, $d);
        if (!$c) {exit("Something went not right: " . mysqli_connect_error());}
        $q = mysqli_query($c, $q);
        while($row = mysqli_fetch_assoc($q)) {
            $url = $row["url"]; 
            $title = $row["title"].                     
            $desc = $row["desc"];                        //get meta description
            $snippet=substr($desc,0,350) . '...';        //trim it to 350 characters...
            include("entry-thumbnail-template.php");     //generate thumbnail
        }
        mysqli_close($c); 
        }
    thumbnail_lookup();
}
?>