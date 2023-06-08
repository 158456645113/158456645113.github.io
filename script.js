function convertVideo() {
  var fileInput = document.getElementById('videoFile');
  var file = fileInput.files[0];

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/convert', true);

  var formData = new FormData();
  formData.append('video', file);

  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var percent = Math.round((e.loaded / e.total) * 100);
      document.getElementById('progress').innerHTML = '转换进度：' + percent + '%';
    }
  };

  xhr.onload = function() {
    if (xhr.status === 200) {
      document.getElementById('result').innerHTML = '转换完成：<a href="' + xhr.responseText + '">下载序列图</a>';
    } else {
      document.getElementById('result').innerHTML = '转换失败';
    }
  };

  xhr.send(formData);
}
