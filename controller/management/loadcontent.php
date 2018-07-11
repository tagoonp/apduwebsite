<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb1 = $dbprefix."content";
$tb2 = $dbprefix."useraccount";

$id = mysqli_real_escape_string($conn, $_POST['id']);
$url = mysqli_real_escape_string($conn, $_POST['url']);

$strSQL = "SELECT *
          FROM $tb1 a INNER JOIN $tb2 b ON a.content_useradd = b.uid
          WHERE a.content_id = '$id' AND a.content_url = '$url' AND a.content_publish = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);

  $newread = $result[0]['content_read'] + 1;

  $strSQL = "UPDATE $tb1 SET content_read = '$newread' WHERE content_id = '$id' ";
  update($conn, $strSQL);
}
disconnect($conn);
die();
?>
