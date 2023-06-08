from flask import Flask, request, send_file
import subprocess
import os

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert():
    video_file = request.files['video']
    video_path = 'uploaded_video.mp4'
    image_path = 'sequence_images/'

    # Save the uploaded video file
    video_file.save(video_path)

    # Create directory for storing sequence images
    os.makedirs(image_path, exist_ok=True)

    # Convert video to sequence images
    subprocess.call(['ffmpeg', '-i', video_path, image_path + 'image-%03d.png'])

    # Pack the sequence images into a zip file
    subprocess.call(['zip', '-r', 'sequence_images.zip', image_path])

    # Clean up temporary files
    os.remove(video_path)
    for file in os.listdir(image_path):
        os.remove(image_path + file)
    os.rmdir(image_path)

    # Return the path to the zip file
    return 'sequence_images.zip'

if __name__ == '__main__':
    app.run()
