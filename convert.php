<?php
if(isset($_FILES['file'])) {
    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    $file_ext = strtolower(end(explode('.', $_FILES['file']['name'])));
    
    $extensions = array("jpeg","jpg","png");
    
    if(in_array($file_ext, $extensions) === false){
        echo "文件扩展名不允许，请上传 JPEG 或 PNG 文件。";
    }
    
    if($file_size > 2097152) {
        echo "文件大小不能超过 2 MB。";
    }
    
    $upload_path = "uploads/";
    $upload_file = $upload_path . $file_name;
    
    if(move_uploaded_file($file_tmp, $upload_file)) {
        echo "文件上传成功。";
    } else {
        echo "文件上传失败。";
    }
}
?>

<form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit" value="上传">
</form>
