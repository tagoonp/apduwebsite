<?php
include "config.class.php";
include "database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(((!isset($_POST['email']))) || ((!isset($_POST['password'])))){
  disconnect($conn);
  die();
}

$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, base64_encode($_POST['password']));
$tb = $dbprefix."useraccount";

$strSQL = "SELECT * FROM $tb
           WHERE
            email = '$email' AND password = '$password'
            AND active_status = '1' AND delete_status = '0' AND allow_status = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);

  $tb = $dbprefix."log_login";
  $strSQL = "INSERT INTO log_login (log_ip, log_datetime, log_user) VALUES ('$ip', '$sysdatetime', '$email')";
  insert($conn, $strSQL, false);
}else{
  echo $strSQL;
}


disconnect($conn);
die();
?>
