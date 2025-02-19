<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
 <script>
    function validate_form(){
    var password = (document.getElementById('password')
    var password-c = (document.getElementById('password-c')
   if (password != password-c)
      {
      document.getElementById('valid-email').innerHTML="Passwords do not match.";
      return false;
       }
    }
    </script>
    
    </head>
<body>

<div class="container">
  <h2>Register</h2>
  <form name="registration" role="form" method="post" action="create_user.php" onclick="return validate_form()">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" name="email" id="email" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label><div id="valid-email"></div>
      <input type="password" class="form-control" name="password" id="password" placeholder="Enter password">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" name="password-c" id="password-c" placeholder="Confirm password">
    </div>

    <input type="submit" class="btn btn-default" value="Create Account">
  </form>
</div>
    


</body> 
</html>


