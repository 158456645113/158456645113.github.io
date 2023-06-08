function uploadVideo(event) {
    event.preventDefault();
    
    var form = document.getElementById('uploadForm');
    var formData = new FormData(form);
    
    var request = new XMLHttpRequest();
    request.open('POST', 'convert.php');
    
    request.upload.addEventListener('progress', function(event) {
        var progress = Math.round((event.loaded / event.total) * 100);
        document.getElementById('progress').innerHTML = '上传进度: ' + progress + '%';
    });
    
    request.addEventListener('load', function(event) {
        if (request.status == 200) {
            var response = JSON.parse(request.responseText);
            if (response.success) {
                document.getElementById('result').innerHTML = '转换完成! <a href="' + response.zipUrl + '">下载序列图</a>';
            } else {
                document.getElementById('
