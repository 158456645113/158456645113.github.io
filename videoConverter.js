function convertVideo() {
	// 获取用户选择的视频文件
	var videoFile = document.getElementById("videoFile").files[0];
	if (!videoFile) {
		alert("请选择要转换的视频文件！");
		return;
	}

	// 显示进度条
	var progressBar = document.getElementById("progressBar");
	progressBar.innerHTML = "转换中...";
	progressBar.style.width = "0%";

	// 创建XMLHttpRequest对象
	var xhr = new XMLHttpRequest();

	// 监听XMLHttpRequest对象的progress事件，更新进度条
	xhr.addEventListener("progress", function(event) {
		if (event.lengthComputable) {
			var percentComplete = event.loaded / event.total * 100;
			progressBar.style.width = percentComplete + "%";
		}
	});

	// 监听XMLHttpRequest对象的load事件，下载序列图打包文件
	xhr.addEventListener("load", function(event) {
		if (xhr.status === 200) {
			// 隐藏进度条
			progressBar.innerHTML = "转换完成！";
			progressBar.style.width = "100%";

			// 显示下载链接
			var downloadLink = document.getElementById("downloadLink");
			downloadLink.href = URL.createObjectURL(xhr.response);
			downloadLink.style.display = "block";
		} else {
			alert("转换失败！");
		}
	});

	// 发送XMLHttpRequest请求，转换视频并下载序列图打包文件
	xhr.open("POST", "videoConverter.php");
	xhr.responseType = "blob";
	var formData = new FormData();
	formData.append("videoFile", videoFile);
	xhr.send(formData);
}
