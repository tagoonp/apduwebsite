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
$category = mysqli_real_escape_string($conn, $_POST['category']);
$alt = mysqli_real_escape_string($conn, $_POST['alt']);
$type = mysqli_real_escape_string($conn, $_POST['type']);
$figure = mysqli_real_escape_string($conn, $_POST['figure']);
$content = mysqli_real_escape_string($conn, $_POST['content']);
$id = mysqli_real_escape_string($conn, $_POST['id']);

$tb = $dbprefix."content";

// $strSQL = "INSERT INTO $tb
//           (content_category, content_title, content_type, content_figure, content_alt, content_useradd, content_html, content_adddatetine)
//           VALUES
//           ('$category', '$title', '$type', '$figure', '$alt', '$user_add', '$content', '$sysdatetime')
//           ";
$strSQL = "UPDATE $tb
          SET
          content_category = '$category',
          content_title = '$title',
          content_type = '$type',
          content_figure = '$figure',
          content_alt = '$alt',
          content_html = '$content'
          WHERE content_id = '$id'";
$result = update($conn, $strSQL);

if($result){

  // $newurl = $domain."content.html?".$result;
  // $strSQL = "UPDATE $tb SET content_url = '$newurl' WHERE content_id = '$result'";
  // $result = update($conn, $strSQL);

  echo "Y";
}else{
  echo "N";
}

disconnect($conn);
die();
?>
