<html>
<head>
<link rel="stylesheet" href="w3.css">
<script type="text/javascript">
var gpxFile = "";
var albumFile = "";
var blogTitle = "";
var blogContent = "";

var isGpx = "";
var isAlbum = "";
var uploadBlog = "";

function processForms()
{
setGlobals();
checkUploadForms();
checkBlogForm();
document.getElementById('is-gpx').value = isGpx;
document.getElementById('is-album').value = isAlbum;
document.getElementById('upload-blog').value = uploadBlog;
document.getElementById('upload').submit();
}

function setGlobals()
{
gpxFile = document.getElementById('cover-photo').value;
albumFile = document.getElementById('album-file').value;
blogTitle = document.getElementById('blog-title').value;
blogContent = document.getElementById('blog-content').value;
}

function checkUploadForms()
{
if(gpxFile != "")
	{
	isGpx = "true";
	}
else{
	isGpx = "false";
	}
if(albumFile != "")
	{
	isAlbum = "true";
	}
else{
	isAlbum = "false";
	}
}

function checkBlogForm()
{
if(blogTitle != "")
	{
	uploadBlog = "true";
	if(blogContent == "")
		{
		alert("Please add content.");
		uploadBlog = "false";
		}
	}
else{
	uploadBlog = "false";
	}
}
	
</script>

<div class="w3-container">
<h2 onclick="window.location='/.'">CYCLEWRITE.COM</h2>
</div>
<div class="w3-container w3-half" style="height:100%">    
<form id="upload" action="uploads\upload.php" method="post" enctype="multipart/form-data">
<input type="hidden" id="is-gpx" name="is-gpx">
<input type="hidden" id="is-album" name="is-album">
<input type="hidden" id="upload-blog" name="upload-blog">
<div  class="w3-form w3-card-2">
  <div class="w3-input-group">      
    <input type="text" class="w3-input w3-dark" name="blog-title" id="blog-title">
    <label>Title</label>
  </div>
  <div class="w3-input-group">  
    <textarea class="w3-input w3-dark" style="height:460px" name="blog-content" id="blog-content" required></textarea>
    <label>Content</label>
  </div>
</div>
</div>
<div class="w3-container w3-half">
<div  class="w3-form w3-card-2">
  <div class="w3-input-group">      
    <input type="file" name="cover-photo" id="cover-photo">
    <label>Select your cover photo</label>
  </div>
  
  <div class="w3-input-group">  
    <input type="file" name="album-file[]" multiple="multiple" id="album-file">
    <label>Select your pictures</label>
  </div>
</div>
    </div>
<div class="w3-container w3-half w3-center">
<h3 onclick="processForms();">Write it!</h3>
</div>