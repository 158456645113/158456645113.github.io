<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $videoFile = $_FILES['videoFile'];

    // 创建一个临时目录用于存放生成的图片序列
    $tempDir = 'temp/' . uniqid();

    // 创建临时目录
    mkdir($tempDir);

    // 获取视频的关键帧图片
    $ffmpegCommand = "ffmpeg -i " . $videoFile['tmp_name'] . " -vf 'select=eq(pict_type\,I)' -vsync vfr " . $tempDir . "/%03d.jpg";
    exec($ffmpegCommand);

    // 将生成的图片序列打包为 ZIP 文件
    $zipFile = 'sequence.zip';
    $zipCommand = "zip -j -r " . $zipFile . " " . $tempDir;
    exec($zipCommand);

    // 删除临时目录及其内容
    $deleteCommand = "rm -rf " . $tempDir;
    exec($deleteCommand);

    // 返回 ZIP 文件的相对路径
    echo json_encode(['success' => true, 'zipUrl' => $zipFile]);
}
?>
