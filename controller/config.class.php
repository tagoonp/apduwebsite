<?php
header("Access-Control-Allow-Origin: *");

date_default_timezone_set("Asia/Bangkok");


$host = 'localhost';
// $user = 'apdu';
$user = 'root';
$password = 'mandymorenn';
// $password = 'apdu0303';
$dbname = 'apdu2018';
// $dbname = 'medipe2018';
$dbprefix = 'e4s_';
$sysdate = date('Y-m-d');
$sysdatetime = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'];
//
// $domain = "http://apdu.medicine.psu.ac.th/2018/";
// $filedomain = "http://apdu.medicine.psu.ac.th/2018/";
$domain = "http://localhost/public_html/apdu/";
$filedomain = "http://localhost/public_html/apdu/";


$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
  echo "Can not connect";
  die();
}

if(mysqli_connect_errno()){
  echo mysqli_connect_error();
}

$conn->set_charset("utf8");

// Define other system value
// $sys_date = date('Y-m-d');
// $sys_datetime = date('Y-m-d H:i:s');
//
// $client_ip = $_SERVER['REMOTE_ADDR'];

?>
