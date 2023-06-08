function convertVideo() {
  var videoFile = document.getElementById('videoFile').files[0];
  
  if (!videoFile) {
    alert('请先选择一个视频文件');
    return;
  }
  
  var progressBar = document.getElementById('progress');
  progressBar.style.width = '0%';
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/convert', true);
  
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
      var percentComplete = (event.loaded / event.total) * 100;
      progressBar.style.width = percentComplete + '%';
    }
  };
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var downloadLink = document.getElementById('downloadLink');
      downloadLink.href = response.imageUrl;
      downloadLink.download = response.fileName;
      downloadLink.innerHTML = '点击此处下载序列图';
      downloadLink.style.display = 'block';
    }
  };
  
  xhr.send(videoFile);
}
