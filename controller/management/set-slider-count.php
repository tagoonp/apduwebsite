<?php
include "../config.class.php";
include "../database.fnc.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if((!isset($_POST['slider_id']))){
  disconnect($conn);
  die();
}

$slide_id = mysqli_real_escape_string($conn, $_POST['slider_id']);

$tb = $dbprefix."slider";

$strSQL = "SELECT slider_click FROM $tb WHERE slider_id = '$slide_id'";
$result = select($conn, $strSQL);

if($result){

  if(sizeof($result) > 0){
    $old_value = $result[0]['slider_click'];
    $new_value = $result[0]['slider_click'] + 1;

    $strSQL = "UPDATE $tb SET slider_click = '$new_value' WHERE slider_id = '$slide_id'";
    update($conn, $strSQL);

    // echo $new_value;
    // echo $strSQL;
  }



}else{
  // echo $strSQL;
}

disconnect($conn);
die();
?>
