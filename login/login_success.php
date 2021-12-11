
<?php
session_start();
if(!isset($_SESSION['user_id'])){
header("location:blog.php");
}

?>

<html>
<body>
Login Successful Eggs
</body>
</html>