
 
<?php
// submit.php

// 检查是否是POST请求
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 检查name字段是否存在且不为空
    if (isset($_POST["name"]) && !empty($_POST["name"])) {
        // 获取表单数据
        $name = $_POST["name"];

        // 打印接收到的数据
        echo "接收到的姓名: " . htmlspecialchars($name);
    } else {
        // 如果name字段不存在或为空，打印错误信息
        echo "姓名字段为空或未提供。";
    }
} else {
    // 如果不是POST请求，打印错误信息
    echo "无效的请求方法。";
}
?>
 
