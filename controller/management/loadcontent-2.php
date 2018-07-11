<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb1 = $dbprefix."content";
$tb2 = $dbprefix."useraccount";

$id = mysqli_real_escape_string($conn, $_POST['id']);

$strSQL = "SELECT *
          FROM $tb1 a INNER JOIN $tb2 b ON a.content_useradd = b.uid
          WHERE a.content_id = '$id' ";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}
disconnect($conn);
die();
?>
