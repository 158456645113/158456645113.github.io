<?php
// 获取上传的视频文件
$videoFile = $_FILES["videoFile"]["tmp_name"];

// 转换视频并生成序列图
$sequenceDir = "sequence_" . time();
mkdir($sequenceDir);
exec("ffmpeg -i $videoFile -vf fps=1 $sequenceDir/image%d.jpg");

// 打包序列图文件夹为ZIP文件并下载
$zipFile = $sequenceDir . ".zip";
exec("zip -r $zipFile $sequenceDir");
header("Content-Type: application/zip");
header("Content-Disposition: attachment; filename=\"$zipFile\"");
readfile($zipFile);

// 删除序列图文件夹和ZIP文件
exec("rm -rf $sequenceDir $zipFile");
?>
