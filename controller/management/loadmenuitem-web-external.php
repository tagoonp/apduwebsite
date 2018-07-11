<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tb1 = $dbprefix."menu_item";
$tb2 = $dbprefix."menu_position";


// $level = mysqli_real_escape_string($conn, $_POST['level']);
$strSQL = "SELECT a.menu_id menu_id, a.menu_title title, a.menu_position, a.menu_target target, a.menu_alt, a.menu_type, a.menu_ext_link ext_link, a.menu_parent menu_parent_id,
          a.menu_level menu_level, a.menu_publish menu_publish, a.menu_status, c.menu_title parent_title, b.position_name position_name
          FROM $tb1 a INNER JOIN $tb2 b ON a.menu_position = b.mp_id
          LEFT JOIN $tb1 c ON a.menu_parent = c.menu_id
          WHERE a.menu_level = '1' AND a.menu_position = '2'
          ORDER BY a.menu_id";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
