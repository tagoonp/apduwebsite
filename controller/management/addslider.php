<?php
include "../config.class.php";
include "../database.fnc.php";

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

if((!isset($_POST['user_add']))){
  disconnect($conn);
  die();
}

$user_add = mysqli_real_escape_string($conn, $_POST['user_add']);
$figure = mysqli_real_escape_string($conn, $_POST['figure']);
$alt = mysqli_real_escape_string($conn, $_POST['alt']);
$url = mysqli_real_escape_string($conn, $_POST['url_link']);
$target = mysqli_real_escape_string($conn, $_POST['target']);


if($url != ''){
  $url2 = explode(':::', $url);
  if(sizeof($url2) > 1){
    $url = $url2[1];
  }
}

$tb = $dbprefix."slider";

$strSQL = "INSERT INTO $tb
          (slider_fig_url, slider_fig_link, slider_fig_target, slider_add_datetime, slider_alt)
          VALUES
          ('$figure', '$url', '$target', '$sysdatetime', '$alt')
          ";
$result = insert($conn, $strSQL, true);

if($result){
  echo "Y";
}else{
  echo "N";
  echo $strSQL;
}

disconnect($conn);
die();
?>
