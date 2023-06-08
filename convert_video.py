import sys
import subprocess

def convert_video(input_file):
  # 定义输出文件名
  output_file = "sequence.jpg"

  # 执行视频转换命令
  command = ["ffmpeg", "-i", input_file, "-vf", "fps=1", output_file]
  try:
    subprocess.check_output(command, stderr=subprocess.STDOUT)
    print(output_file)  # 将生成的序列图文件名打印出来，供PHP文件使用
  except subprocess.CalledProcessError as e:
    print("视频转换失败:", e.output)

# 获取命令行参数（视频文件名）
input_file = sys.argv[1]

# 执行视频转换操作
convert_video(input_file)
