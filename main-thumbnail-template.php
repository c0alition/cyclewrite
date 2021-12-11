<a href="view.php?entry=<?=$row["entry_id"]?>">
<div class="w3-container w3-padding w3-half">
<div class="w3-container">
<div class="w3-container w3-small w3-center" style="background-color:black; position:static; color:white;">
    <h5 style="color:white;"><?=$row["blog_title"]?></h5>
</div>
<div class="w3-third w3-left">
<div class="w3-container w3-padding-top main-blog-preview" style="background-image:url('uploads/<?=$row["is_gpx"]?>-preview.jpg');">
</div>
</div>

<div class="w3-container" style="height:195px; overflow:hidden;">
<pre onclick="window.location='/view.php?entry=<?=$row["entry_id"]?>'"><?=$blog_content_preview?></pre>
</div>
</div>
</div>
</a>

