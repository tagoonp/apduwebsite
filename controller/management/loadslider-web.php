<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb = $dbprefix."slider";

$strSQL = "SELECT * FROM $tb WHERE 1";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}
disconnect($conn);
die();
?>
