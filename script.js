function uploadFile() {
  var fileInput = document.getElementById("videoFile");
  var file = fileInput.files[0];
  var formData = new FormData();
  formData.append("videoFile", file);

  $.ajax({
    url: "upload.php",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = (evt.loaded / evt.total) * 100;
          $("#progress").text("上传进度: " + percentComplete.toFixed(2) + "%");
        }
      }, false);
      return xhr;
    },
    success: function (response) {
      $("#progress").text("转换完成");
      $("#result").html('<a href="' + response + '">下载序列图</a>');
    },
    error: function () {
      $("#progress").text("上传出错");
    }
  });
}
