<?php
include "config.class.php";
include "database.fnc.php";
// You need to add server side validation and better error handling here
$data = array();
$tb = $dbprefix."media";

echo "string";

if(isset($_GET['files']))
{
    $error = false;
    $files = array();

    $path = "../media/upload/original";
    // $path = "/media";
    // $path = "https://wisniorproject.com/psunurseelder/media/upload/original";

    // if(!is_dir($path)){
    //   mkdir($path);
    // }

    $uploaddir = $path."/";

    foreach($_FILES as $file){

        $tempFile = $file['tmp_name'];
        $filename = 'file-'.date('H-i-s').'-'.randomStrong(6);

        $array = explode('.', $file['name']);
        $extension = end($array);

        // $fullpart = $uploaddir.$filename;
        $fullpart = $filedomain."media/upload/original/".$filename.'.'.$extension;
        // if(move_uploaded_file($file['tmp_name'], $uploaddir.basename($file['name'])))
        if(move_uploaded_file($file['tmp_name'], $uploaddir.$filename.'.'.$extension))
        {
            $files[] = $uploaddir.$file['name'];

            $strSQL = "INSERT INTO $tb (media_file_name, media_file_fullpart, media_extension, media_datetime)
                        VALUES ('$filename', '$fullpart', '$extension', '".date('Y-m-d H:i:s')."')";
            $result = insert($conn, $strSQL, false);
            //
            // $strSQL = "INSERT INTO log_research (log_activity, log_detail, log_datetime, id_rs, log_by) VALUES ('Reviewer upload file',  '$filename', '".date('Y-m-d H:i:s')."', '$id_rs','Reviewer : $id_reviewer')";
            // mysqli_query($conn, $strSQL);

            $data = array('success 1' => 'Form was submitted and uploaded', 'formData' => $_POST);

        }
        else
        {
            $error = true;
        }
    }

    $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
}
else
{
    $data = array('success 2' => 'Form was submitted', 'formData' => $_POST);
}

echo json_encode($data);
?>
