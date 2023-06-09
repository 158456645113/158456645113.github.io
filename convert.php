<?php
if ($_FILES['video-file']['error'] != UPLOAD_ERR_OK) {
	exit('上传失败，请重试！');
}

$videoPath = $_FILES['video-file']['tmp_name'];
$framesPath = 'frames'; // 存放序列图的目录
if (!file_exists($framesPath)) {
	mkdir($framesPath);
}

// 使用FFmpeg将视频转换为序列图
$cmd = "ffmpeg -i $videoPath -vf fps=1 $framesPath/frame-%03d.jpg";
exec($cmd);

// 打包序列图为ZIP文件
$zipPath = 'frames.zip';
$zip = new ZipArchive();
if ($zip->open($zipPath, ZipArchive::CREATE) !== TRUE) {
	exit('打包失败，请重试！');
}
$files = scandir($framesPath);
foreach ($files as $file) {
	if ($file != '.' && $file != '..') {
		$zip->addFile("$framesPath/$file", $file);
	}
}
$zip->close();

// 输出ZIP文件的下载链接
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="frames.zip"');
header('Content-Length: ' . filesize($zipPath));
readfile($zipPath);

// 删除临时文件
unlink($videoPath);
unlink($zipPath);
$files = scandir($framesPath);
foreach ($files as $file) {
	if ($file != '.' && $file != '..') {
		unlink("$framesPath/$file");
	}
}
rmdir($framesPath);