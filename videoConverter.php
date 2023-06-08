<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $videoFile = $_FILES['videoFile'];

    // 执行视频转换和序列图生成的逻辑
    // ...

    // 假设生成了一个序列图文件名为 sequence.jpg
    $sequenceFile = 'sequence.jpg';

    // 返回序列图文件的相对路径
    echo $sequenceFile;
}
?>
