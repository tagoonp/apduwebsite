<?php
include "config.class.php";
include "database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if((!isset($_POST['fullname'])) || ((!isset($_POST['email']))) || ((!isset($_POST['password'])))){
  disconnect($conn);
  die();
}

$ufullname = mysqli_real_escape_string($conn, $_POST['fullname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, base64_encode($_POST['password']));

// echo "string2";

$tb = $dbprefix."useraccount";

$strSQL = "SELECT * FROM $tb
           WHERE
            email = '$email'
            AND active_status = '1' AND delete_status = '0'";
$result = select($conn, $strSQL);

if($result){
  if(sizeof($result) > 0){
    echo "D";
  }
}

$uid = base64_encode(randomStrong(20));

$strSQL = "INSERT INTO $tb (uid, email, password, fullname, regdate)
          VALUES ('$uid','$email','$password','$ufullname','$sysdatetime')";
$result = insert($conn, $strSQL, false);
if($result){
  echo "Y";
}else{
  echo $strSQL;
}

disconnect($conn);
die();
?>
