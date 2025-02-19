<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../w3.css">
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
</head>

<div class="w3-container" style="background-image:url('cyclewrite-login-background.jpg'); background-size:cover; height:100%;">
<header class="w3-container w3-theme w3-padding" onclick="window.location.href='/.'">
  <div class="w3-center">
  <h1>CYCLEWRITE.COM</h1>
  <h5>PLAN-CYCLE-EXPERIENCE-WRITE-REPEAT</h5>
  
  </div>
</header>

    
<div class="w3-padding w3-white w3-col s1 m3 l4" style="opacity:0"></div>
<div class="w3-padding w3-white w3-col s10 m6 l4 w3-card-2" style="opacity:0.85">
      
  <h2>Login</h2>
  <form class="w3-form" name="login" id="login" role="form" method="post" action="check_login.php">
    <div class="w3-input-group">
      <input type="hidden" class="w3-input" name="path" id="path">
      <input type="email" class="w3-input" name="email" id="email">
      <label>Email:</label>
    </div>
    <div class="w3-input-group">
      <input type="password" class="w3-input" name="password" id="password">
      <label>Password:</label>    
      <p font color="red"></p>
    </div>
    <input type="submit" class="btn btn-default" value="Login";>
    <h3 onclick="document.getElementById('login').submit();">Login</h3>
<input type="submit" style="display:none"/>
  </form>
    
</div>
    </div>   
    
</div>

</body> 
</html>