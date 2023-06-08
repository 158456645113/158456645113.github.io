<?php
$targetDirectory = "uploads/";
$targetFile = $targetDirectory . basename($_FILES["videoFile"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// 检查文件类型
if ($imageFileType != "mp4" && $imageFileType != "avi" && $imageFileType != "mov") {
  echo "只允许上传MP4、AVI或MOV格式的视频文件";
  $uploadOk = 0;
}

// 检查文件大小
if ($_FILES["videoFile"]["size"] > 50000000) {
  echo "文件大小超过限制";
  $uploadOk = 0;
}

// 检查上传状态
if ($uploadOk == 0) {
  echo "上传失败";
} else {
  if (move_uploaded_file($_FILES["videoFile"]["tmp_name"], $targetFile)) {
    // 调用后台Python脚本进行视频转换任务处理
    $pythonScript = "convert_video.py";
    $output = shell_exec("python " . $pythonScript . " " . $targetFile);

    // 返回生成的序列图文件名
    echo $output;
  } else {
    echo "上传失败";
  }
}
?>
