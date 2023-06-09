$(function() {
	// 监听上传表单的提交事件
	$('#upload-form').submit(function(event) {
		event.preventDefault(); // 阻止表单默认提交行为
		var formData = new FormData(this); // 创建FormData对象
		$.ajax({
			url: 'convert.php', // 后台处理脚本的URL
			type: 'POST',
			data: formData,
			processData: false, // 不处理数据
			contentType: false, // 不设置Content-Type请求头
			xhr: function() {
				var xhr = new XMLHttpRequest();
				// 监听上传进度事件
				xhr.upload.addEventListener('progress', function(event) {
					if (event.lengthComputable) {
						var percent = Math.round(event.loaded / event.total * 100);
						$('#progress-bar').css('width', percent + '%');
						$('#progress-text').text('上传进度：' + percent + '%');
					}
				});
				return xhr;
			},
			success: function(data) {
				$('#result').html('<a href="' + data + '">下载序列图</a>');
			},
			error: function() {
				alert('上传失败，请重试！');
			},
			complete: function() {
				$('#progress-bar').css('width', '0%');
				$('#progress-text').text('');
			}
		});
	});
});