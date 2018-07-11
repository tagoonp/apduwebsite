<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if((!isset($_POST['user_add']))){
  disconnect($conn);
  die();
}

$user_add = mysqli_real_escape_string($conn, $_POST['user_add']);
$title = mysqli_real_escape_string($conn, $_POST['title']);
$position_id = mysqli_real_escape_string($conn, $_POST['position_id']);
$alt = mysqli_real_escape_string($conn, $_POST['alt']);
$type = mysqli_real_escape_string($conn, $_POST['type']);
$url = mysqli_real_escape_string($conn, $_POST['url']);
$parent = mysqli_real_escape_string($conn, $_POST['parent']);
$target = mysqli_real_escape_string($conn, $_POST['target']);


$tb = $dbprefix."menu_item";

$level = '1';
if($parent != ''){
  $strSQL = "SELECT menu_level FROM $tb WHERE menu_parent = '$parent' LIMIT 1";
  $result = select($conn, $strSQL);
  if($result){
    $level = $result[0]['menu_level'] + 1;
  }
}

$strSQL = "INSERT INTO $tb
          (menu_title, menu_target, menu_position, menu_alt, menu_type, menu_ext_link, menu_parent, menu_level, menu_useradd, menu_adddatetime)
          VALUES
          ('$title', '$target', '$position_id', '$alt', '$type', '$url', '$parent', '$level', '$user_add', '$sysdatetime')
          ";
$result = insert($conn, $strSQL, false);

if($result){
  echo "Y";
}else{
  echo "N";
}

disconnect($conn);
die();
?>
