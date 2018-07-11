<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb = $dbprefix."category";

$strSQL = "SELECT * FROM $tb WHERE cat_status = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}
disconnect($conn);
die();
?>
