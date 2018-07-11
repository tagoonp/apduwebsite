<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb = $dbprefix."media";

$strSQL = "DELETE FROM $tb WHERE media_id = '".$_POST['id']."' ";
$result = delete($conn, $strSQL);

if($result){
  echo "Y";
}else{
  echo "N";
}

disconnect($conn);
die();
?>
