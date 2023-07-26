// 获取视频元素
const video = document.getElementById('videoElement');

// 使用摄像头作为视频源
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing the camera', error);
  });

// 等待视频加载完毕后执行识别
video.addEventListener('loadeddata', () => {
  // 加载YOLOv3模型
  const model = new cv.YOLOv3();

  // 加载权重文件和配置文件
  model.loadWeights('yolov3.weights');
  model.loadConfig('yolov3.cfg');

  // 加载类别名称文件
  const classNames = fetch('yolov3.names')
    .then((response) => response.text())
    .then((data) => data.split('\n'))
    .catch((error) => {
      console.error('Error loading class names', error);
    });

  // 在每一帧上执行物体检测
  const detectObjects = () => {
    // 创建画布用于绘制检测结果
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 将视频帧绘制到画布上
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 执行物体检测
    const objects = model.detect(canvas);

    // 绘制物体检测结果
    for (const obj of objects) {
      const { classIndex, className, confidence, x, y, width, height } = obj;

      // 在画布上绘制边界框
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = 'red';
      context.rect(x, y, width, height);
      context.stroke();

      // 在边界框上方绘制类别和置信度
      context.fillStyle = 'red';
      context.fillText(`${className}: ${confidence.toFixed(2)}`, x, y > 10 ? y - 5 : 10);
    }

    // 显示绘制结果
    document.body.appendChild(canvas);

    // 继续下一帧的物体检测
    requestAnimationFrame(detectObjects);
  };

  // 开始执行物体检测
  classNames.then((names) => {
    model.setClassNames(names);
    detectObjects();
  });
});