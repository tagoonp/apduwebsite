<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb1 = $dbprefix."content";
$tb2 = $dbprefix."useraccount";

$cat_id = mysqli_real_escape_string($conn, $_POST['cat_id']);

$strSQL = "SELECT *
          FROM $tb1 a INNER JOIN $tb2 b ON a.content_useradd = b.uid
          WHERE a.content_category = '$cat_id' AND a.content_publish = '1' ORDER BY content_adddatetine DESC LIMIT 7";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}else{
  // echo $strSQL;
}
disconnect($conn);
die();
?>
