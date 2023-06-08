<?php
$targetDir = "uploads/";
$targetFile = $targetDir . basename($_FILES["video"]["name"]);
$uploadOk = 1;
$videoFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// 允许的视频文件类型
$allowedTypes = array("mp4", "avi", "mov");

// 检查文件类型
if (!in_array($videoFileType, $allowedTypes)) {
  echo "仅支持上传 MP4、AVI 或 MOV 格式的视频文件";
  $uploadOk = 0;
}

// 检查上传错误
if ($_FILES["video"]["error"] > 0) {
  echo "文件上传发生错误";
  $uploadOk = 0;
}

// 检查文件大小
if ($_FILES["video"]["size"] > 50000000) { // 限制文件大小为 50MB
  echo "文件大小超过限制";
  $uploadOk = 0;
}

// 如果文件符合要求，则移动到指定目录
if ($uploadOk == 1) {
  if (move_uploaded_file($_FILES["video"]["tmp_name"], $targetFile)) {
    // 进行视频转换和序列图生成的代码
    // ...

    // 返回序列图的下载链接
    $result = "sequence_images.zip";
    echo $result;
  } else {
    echo "文件上传失败";
  }
}
?>
