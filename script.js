const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const convertBtn = document.getElementById('convert-btn');
const downloadBtn = document.getElementById('download-btn');

let frames = [];

// 获取视频帧
function getFrames() {
    const ctx = canvas.getContext('2d');
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    let currentTime = 0;
    const interval = 0.1; // 每隔0.1秒获取一帧
    const duration = video.duration;
    while (currentTime < duration) {
        video.currentTime = currentTime;
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        const dataURL = canvas.toDataURL('image/png');
        frames.push(dataURL);
        currentTime += interval;
    }
}

// 下载序列图
function downloadSequence() {
    const zip = new JSZip();
    const folder = zip.folder('sequence');
    frames.forEach((frame, index) => {
        const filename = `frame${index}.png`;
        const data = frame.split(',')[1];
        folder.file(filename, data, { base64: true });
    });
    zip.generateAsync({ type: 'blob' }).then((blob) => {
        const url = URL.createObjectURL(blob);
        downloadBtn.href = url;
        downloadBtn.style.display = 'block';
    });
}

// 绑定事件
video.addEventListener('loadedmetadata', () => {
    convertBtn.disabled = false;
});

convertBtn.addEventListener('click', () => {
    convertBtn.disabled = true;
    getFrames();
    downloadSequence();
});
