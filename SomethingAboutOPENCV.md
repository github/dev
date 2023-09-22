# 1 OpenCV VideoCapture.get()参数详解

| 序号                     | 参数                      | 说明                                                         |
| ------------------------ | ------------------------- | ------------------------------------------------------------ |
| cv2.VideoCapture.get(0)  | cv2.CAP_PROP_POS_MSEC     | 视频文件的当前位置（播放）以毫秒为单位                       |
| cv2.VideoCapture.get(1)  | CV_CAP_PROP_POS_FRAMES    | 下一个要解码/捕获的帧的基于0的索引                           |
| cv2.VideoCapture.get(2)  | CV_CAP_PROP_POS_AVI_RATIO | 视频文件的相对位置（播放）：0=电影开始，1=影片的结尾。       |
| cv2.VideoCapture.get(3)  | CV_CAP_PROP_FRAME_WIDTH   | 在视频流的帧的宽度                                           |
| cv2.VideoCapture.get(4)  | CV_CAP_PROP_FRAME_HEIGHT  | 在视频流的帧的高度                                           |
| cv2.VideoCapture.get(5)  | CV_CAP_PROP_FPS           | 帧速率                                                       |
| cv2.VideoCapture.get(6)  | CV_CAP_PROP_FOURCC        | 编解码的4字-字符代码                                         |
| cv2.VideoCapture.get(7)  | CV_CAP_PROP_FRAME_COUNT   | 视频文件中的帧数                                             |
| cv2.VideoCapture.get(8)  | CV_CAP_PROP_FORMAT        | 返回对象的格式                                               |
| cv2.VideoCapture.get(9)  | CV_CAP_PROP_MODE          | 返回后端特定的值，该值指示当前捕获模式                       |
| cv2.VideoCapture.get(10) | CV_CAP_PROP_BRIGHTNESS    | 图像的亮度(仅适用于照相机)                                   |
| cv2.VideoCapture.get(11) | CV_CAP_PROP_CONTRAST      | 图像的对比度(仅适用于照相机)                                 |
| cv2.VideoCapture.get(12) | CV_CAP_PROP_SATURATION    | 图像的饱和度(仅适用于照相机)                                 |
| cv2.VideoCapture.get(13) | CV_CAP_PROP_HUE           | 图像的色调（仅适用于相机）                                   |
| cv2.VideoCapture.get(14) | CV_CAP_PROP_GAIN          | 图像增益(仅适用于照相机)（Gain在摄影中表示白平衡提升）       |
| cv2.VideoCapture.get(15) | CV_CAP_PROP_EXPOSURE      | 曝光(仅适用于照相机)                                         |
| cv2.VideoCapture.get(16) | CV_CAP_PROP_CONVERT_RGB   | 指示是否应将图像转换为RGB布尔标志                            |
| cv2.VideoCapture.get(17) | CV_CAP_PROP_WHITE_BALANCE | 白平衡 目前不支持                                            |
| cv2.VideoCapture.get(18) | CV_CAP_PROP_RECTIFICATION | 立体摄像机的矫正标注（目前只有DC1394 v.2.x后端支持这个功能） |

# 2 OpenCV VideoCapture.set()参数详解

| 序号                     | 参数                       | 说明                                                         |
| ------------------------ | -------------------------- | ------------------------------------------------------------ |
| cv2.VideoCapture.set(0)  | cv2.CAP_PROP_POS_MSEC      | 视频文件的当前位置（播放）以毫秒为单位                       |
| cv2.VideoCapture.set(1)  | cv2.CAP_PROP_POS_FRAMES    | 下一个要解码/捕获的帧的基于0的索引                           |
| cv2.VideoCapture.set(2)  | cv2.CAP_PROP_POS_AVI_RATIO | 视频文件的相对位置（播放）：0=电影开始，1=影片的结尾。       |
| cv2.VideoCapture.set(3)  | cv2.CAP_PROP_FRAME_WIDTH   | 在视频流的帧的宽度                                           |
| cv2.VideoCapture.set(4)  | cv2.CAP_PROP_FRAME_HEIGHT  | 在视频流的帧的高度                                           |
| cv2.VideoCapture.set(5)  | cv2.CAP_PROP_FPS           | 帧速率                                                       |
| cv2.VideoCapture.set(6)  | cv2.CAP_PROP_FOURCC        | 编解码的4字-字符代码                                         |
| cv2.VideoCapture.set(7)  | cv2.CAP_PROP_FRAME_COUNT   | 视频文件中的帧数                                             |
| cv2.VideoCapture.set(8)  | cv2.CAP_PROP_FORMAT        | 返回对象的格式                                               |
| cv2.VideoCapture.set(9)  | cv2.CAP_PROP_MODE          | 返回后端特定的值，该值指示当前捕获模式                       |
| cv2.VideoCapture.set(10) | cv2.CAP_PROP_BRIGHTNESS    | 图像的亮度(仅适用于照相机)                                   |
| cv2.VideoCapture.set(11) | cv2.CAP_PROP_CONTRAST      | 图像的对比度(仅适用于照相机)                                 |
| cv2.VideoCapture.set(12) | cv2.CAP_PROP_SATURATION    | 图像的饱和度(仅适用于照相机)                                 |
| cv2.VideoCapture.set(13) | cv2.CAP_PROP_HUE           | 图像的色调（仅适用于相机）                                   |
| cv2.VideoCapture.set(14) | cv2.CAP_PROP_GAIN          | 图像增益(仅适用于照相机)（Gain在摄影中表示白平衡提升）       |
| cv2.VideoCapture.set(15) | cv2.CAP_PROP_EXPOSURE      | 曝光(仅适用于照相机)                                         |
| cv2.VideoCapture.set(16) | cv2.CAP_PROP_CONVERT_RGB   | 指示是否应将图像转换为RGB布尔标志                            |
| cv2.VideoCapture.set(17) | cv2.CAP_PROP_WHITE_BALANCE | 白平衡 目前不支持                                            |
| cv2.VideoCapture.set(18) | cv2.CAP_PROP_RECTIFICATION | 立体摄像机的矫正标注（目前只有DC1394 v.2.x后端支持这个功能） |

# 3 OPENCV VideoWriter() 参数详解

```python
fourcc = cv2.VideoWriter_fourcc('M', 'P', '4', 'V')#VideoWriter_fourcc为视频编解码器

#编码参数：
# cv2.VideoWriter_fourcc('M', 'P', '4', 'V') MPEG-4编码 .mp4 要限制结果视频的大小，这是一个很好的选择。
# cv2.VideoWriter_fourcc('X','2','6','4') MPEG-4编码 .mp4 想限制结果视频的大小，这可能是最好的选择。
# cv2.VideoWriter_fourcc('I', '4', '2', '0'),该参数是YUV编码类型，文件名后缀为.avi 广泛兼容，但会产生大文件
# cv2.VideoWriter_fourcc('P', 'I', 'M', 'I'),该参数是MPEG-1编码类型，文件名后缀为.avi
# cv2.VideoWriter_fourcc('X', 'V', 'I', 'D'),该参数是MPEG-4编码类型，文件名后缀为.avi 要限制结果视频的大小，这是一个很好的选择。
# cv2.VideoWriter_fourcc('T', 'H', 'E', 'O'),该参数是Ogg Vorbis,文件名后缀为.ogv
# cv2.VideoWriter_fourcc('F', 'L', 'V', '1'),该参数是Flash视频，文件名后缀为.flv
videoWriter = cv2.VideoWriter('video.mp4', fourcc, video_fps, (video_width, video_height))
```

