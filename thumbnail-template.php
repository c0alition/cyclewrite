<a href="view.php?entry=<?=$row["entry_id"]?>">
<div class="w3-third w3-left" style="height:400px;">
 <div class="w3-container w3-padding-top blog-preview" style="background-image:url('<?=$row["is_gpx"]?>-cover.jpg');"><br>
  <div class="w3-container w3-small w3-right blog-preview-label">
    <h5 style="color:white;"><?=$row["blog_title"]?></h5>
    <p class="w3-tiny" style="color:white;">By: <?=$row["author"]?></p>
  </div><br>
 </div>
</div>
</a>