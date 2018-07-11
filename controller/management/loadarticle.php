<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb1 = $dbprefix."content";
$tb2 = $dbprefix."useraccount";
$tb3 = $dbprefix."category";

$strSQL = "SELECT *
          FROM $tb1 a INNER JOIN $tb2 b ON a.content_useradd = b.uid
          INNER JOIN $tb3 c ON a.content_category = c.cat_id
          WHERE 1
          ORDER BY content_adddatetine DESC";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
