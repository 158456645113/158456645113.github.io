from flask import Flask, request, send_file, jsonify
import cv2
import os
import zipfile

app = Flask(__name__)

progress = 0


@app.route('/')
def index():
    return '''
 <!doctype html>
 <title>Upload Video</title>
 <h1>Upload Video</h1>
 <form method=post enctype=multipart/form-data>
 <input type=file name=video>
 <input type=submit value=Upload>
 </form>
 <div id="progress"></div>
 <script>
 // 定时请求转换进度
 setInterval(function() {
 fetch('/progress')
 .then(response => response.json())
 .then(data => {
 document.getElementById('progress').innerHTML = `转换进度：${data.progress}%`;
 });
 }, 1000);
 </script>
 '''


@app.route('/', methods=['POST'])
def upload_video():
    video = request.files['video']
    video.save('uploaded_video.mp4')

    # Convert video to sequence of images
    vidcap = cv2.VideoCapture('uploaded_video.mp4')
    success, image = vidcap.read()
    count = 0
    total_frames = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    global progress
    while success:
        cv2.imwrite("img/frame%d.jpg" % count, image)
        success, image = vidcap.read()
        count += 1
        progress = int((count / total_frames) * 100)

    # Create zip file of images
    with zipfile.ZipFile('img/images.zip', 'w') as myzip:
        for i in range(count):
            myzip.write('frame%d.jpg' % i)

    # Delete images
    for i in range(count):
        os.remove('img/frame%d.jpg' % i)

        return send_file('images.zip', as_attachment=True)


@app.route('/progress')
def get_progress():
    return jsonify({'progress': progress})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
    
