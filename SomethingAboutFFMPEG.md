# **ffmpeg**

- **场效应视频直接去除场效应**：
  ```shell
  ffmpeg -i original.mov -deinterlace -r 25 -c:v libx264 -b 226304k -preset slow -crf 0 -x264opts keyint=123:min-keyint=20 -pix_fmt yuv420p a.mp4
  ffmpeg -i original.mov -vf yadif -c:v libx264 -preset slow -crf 10 -x264opts keyint=123:min-keyint=20 -pix_fmt yuv420p a.mp4
  ```

- **多线程编解码** ：
  ```shell
  ffmpeg -threads n -thread_type n -i input.mp4 -y output.mp4
  ```

- **图片生成视频**：
  ```shell
  ffmpeg -y -framerate 25 -i step3.1_SR_zhudan_1012_USM_cgn/%5d.png \
  -c:v libx264 -preset slow -crf 10 -x264opts keyint=123:min-keyint=20 -pix_fmt yuv420p -c:a copy \
  -metadata title="BOE Test Video" -metadata copyright="BOE Technology Group Co., Ltd., All rights reserved" -metadata year="2019" -f mp4 output.mp4
  ```

- **mp4转成ts**：

  ```shell
  ffmpeg -y -i input.mp4 -vcodec libx264 -c:a copy -bsf:v h264_mp4toannexb output.ts
  ffmpeg -y -i input.mp4 -vcodec libx265 -c:a copy -bsf:v hevc_mp4toannexb output.ts
  ```

- **视频缩放**：
  ```shell
  ffmpeg -i input.mp4 -vf scale=1920x1080:flags=lanczos output.mp4 // flags指定缩放算法
  ffmpeg -i ori_cai.mp4 -vf scale=1920:1920/a ori_bic.mp4 // 指定宽度640px，视频高度等比例
  ```

- **截取一段视频**：
  ```shell
  //step1 转为帧内编码：
  ffmpeg -i output.mp4 -strict -2 -qscale 0 -intra keyoutput.mp4
  //step2 截取视频：
  ffmpeg -ss 00:00:00 -t 00:00:30 -i keyoutput.mp4 -c:v copy -c:a copy split.mp4
  ```

- **视频裁剪**：
  ```shell
  ffmpeg -i ruima.mp4 -vf crop=width:height:left:top ruima_zuo.mp4
  //示例（裁剪视频右半边）：
  ffmpeg -i ori.mp4 -strict 2 -vf crop=iw/2:ih:iw/2:0 ori_you.mp4
  ```

- **视频添加logo**：
  ```shell
  ffmpeg -i input.mp4 -i logo.png -filter_complex overlay=left:top 3.mp4
  ```

- **合并视频**：
  - 方法一：
  ```shell
  MP4Box -cat 1.mp4 -cat 2.mp4 output.mp4
  ```
  - 方法二：
  ```shell
  ffmpeg -i input1.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate1.ts 
  ffmpeg -i input2.mp4 -c copy -bsf:v h264_mp4toannexb -f mpegts intermediate2.ts 
  ffmpeg -i "concat:intermediate1.ts|intermediate2.ts" -c copy -bsf:a aac_adtstoasc output.mp4
  ```
  - 方法三：
  ```shell
  ffmpeg -i 1.mp4 -sameq 1.mpg
  ffmpeg -i 2.mp4 -sameq 2.mpg 
  cat 1.mpg 2.mpg | ffmpeg -f mpeg -i - -sameq -vcodec mpeg4 output.mp4
  ```

- **视频拼接**：

  - 左右拼接：
  ```shell
  ffmpeg -i 1.mp4 -i 2.mp4 -filter_complex "nullsrc=size=widthxheight [base]; [0:v] setpts=PTS-STARTPTS, scale=sub_widthxheight [left]; [1:v] setpts=PTS-STARTPTS, scale=sub_widthxheight [right]; [base][left] overlay=shortest=1 [tmp1]; [tmp1][right] overlay=shortest=1:x=sub_width" -c:v libx264 output.mp4
  ```
  - 上下拼接：
  ```shell
  ffmpeg -i 1.mp4 -i 2.mp4 -filter_complex "nullsrc=size=widthxheight [base]; [0:v] setpts=PTS-STARTPTS, scale=widthxsub_height [upper]; [1:v] setpts=PTS-STARTPTS, scale=widthxsub_height [lower]; [base][upper] overlay=shortest=1 [tmp1]; [tmp1][lower] overlay=shortest=1:y=sub_height" -c:v libx264 output.mp4
  ```
  - 上下左右拼接：
  ```shell
  ffmpeg -i 1.mp4 -i 2.mp4 -i 3.mp4 -i 4.mp4 -filter_complex "nullsrc=size=widthxheight [base]; [0:v] setpts=PTS-STARTPTS, scale=sub_widthxsub_height [upperleft]; [1:v] setpts=PTS-STARTPTS, scale=sub_widthxsub_height [upperright]; [2:v] setpts=PTS-STARTPTS, scale=sub_widthxsub_height [lowerleft]; [3:v] setpts=PTS-STARTPTS, scale=sub_widthxsub_height [lowerright]; [base][upperleft] overlay=shortest=1 [tmp1]; [tmp1][upperright] overlay=shortest=1:x=sub_width [tmp2]; [tmp2][lowerleft] overlay=shortest=1:y=sub_height [tmp3]; [tmp3][lowerright] overlay=shortest=1:x=sub_width:y=sub_height" -c:v libx264 output.mp4
  ```

- **提取音频**：
  ```shell
  ffmpeg -i input.mp4 -vn -acodec aac -b:a 128 -y input.aac
  ```

- **添加音频**：
  ```shell
  ffmpeg -i video.mp4 -i audio.aac -c:v copy -c:a copy -y output.mp4
  ```

- **视频分奇偶场** ： 
  ```shell
  ffmpeg -i yangpian.mp4 -filter_complex "[0]field=top[t];[0]field=bottom[b];[t][b]interleave" -r 50 ALL/%d.png
  ```

- **生成有场效应视频** ：
  ```shell
  ffmpeg -y -framerate 50 -i output/%5d.png -vf tinterlace -c:v libx264 -flags +ilme+ildct -preset slow -crf 10 -x264opts tff=1:keyint=123:min-keyint=20 -an -pix_fmt yuv420p -metadata title="BOE Test Video" -metadata copyright="BOE Technology Group Co., Ltd., All rights reserved" -metadata year="2019" -f mp4 BOE_interlace.mp4
  ```

- **生成无场效应视频** ：
  ```shell
  ffmpeg -y -framerate 50 -i video_fields/%5d.png -vf tinterlace,yadif=1:-1:0,mcdeint=medium:1:10 -c:v libx264 -preset slow -crf 10 -x264opts keyint=123:min-keyint=20 -an -pix_fmt yuv420p -metadata title="BOE Test Video" -metadata copyright="BOE Technology Group Co., Ltd., All rights reserved" -metadata year="2019" -f mp4 BOE_deinterlace.mp4
  ```

- **视频生成无损失图片** ：
  ```shell
  ffmpeg -i input.mov -r 25 frames/%5d.png -q 0
  ```

- **视频水平镜像**：
  ```shell
  ffmpeg -i bic.mp4 -vf hflip bic_2.mp4
  ```

- **两遍式压缩**: 
  ```shell
  ffmpeg -y -i input -c:v libx264 -preset medium -b:v 555k -pass 1 -an -f mp4 /dev/null && ffmpeg -y -i input -c:v libx264 -preset medium -b:v 555k -pass 2 -c:a libfdkaac -b:a 128k -f mp4 output.mp4
  ```

- **从第0帧开始截取30帧**：
  ```shell
  ffmpeg -i input.yuv -c:v rawvideo -filter:v select="between(n\, 0\, 29)" out.yuv
  ```

- **计算PSNR和SSIM**: 
  ```shell
  ffmpeg -i src.mp4 -i dst.mp4 -lavfi psnr="stats_file=psnr.log" -f null -  //  ffmpeg -i src.mp4 -i dst.mp4 -lavfi ssim="stats_file=ssim.log" -f null -
  ```
  
- **提取关键帧**：
  ```shell
  ffmpeg -i video_name.mp4 -vf select='eq(pict_type\,I)' -vsync 2 -s 1920*1080 -f image2 keyframe-%02d.jpeg
  ```

- **垂直翻转**：
  ```shell
  ffmpeg -i fan.mp4 -vf vflip -y -vcodec libx264 vflip.mp4
  ```

- **水平翻转**：
  ```shell
  ffmpeg -i fan.mp4 -vf hflip -y -vcodec libx264 hflip.mp4
  ```

- **旋转60°**：
  ```shell
  ffmpeg -i fan.mp4 -vf rotate=PI/3 -vcodec libx264 -y rotate60.mp4
  ```
  
- **逆时针旋转90°**：
  ```shell
  ffmpeg -i fan.mp4 -vf transpose=2 -vcodec libx264 -y transpose2.mp4 // 1 - 顺时针 2 - 逆时针
  ```

- **视频加黑边**：
  ```shell
  ffmpeg -i test.ts -vf "scale=620:476,pad=720:576:50:50:black" test.mp4
  // scale:将视频缩小到620*476，给即将添加的黑边预留像素  pad: "宽"、"高"、"X坐标"和"Y坐标"，宽和高指的是输入视频尺寸（包含加黑边的尺寸），XY指的是视频所在位置
  ```

- **设置视频DAR SAR**：
  ```shell
  ffmpeg -t 10 -i input.mp4 -vf scale=720x1280,setsar=sar=9/16,setdar=dar=16/9 -f mp4 out.mp4 -y
  ```
  
- **生成GIF保留画质**：
  ```shell
  ffmpeg -i input.mp4 -vf 'split[s0][s1];[s0]palettegen=stats_mode=single[p];[s1][p]paletteuse=new=1' out.gif -y
  ffmpeg -i input.mp4 -vf 'split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse' out.gif -y
  ```

- **视频截取图片**：
  ```shell
  ffmpeg -i test.mp4 -r 30 -ss 00:00:20 -vframes 10 image-%3d.jpg
  ```

- **生成YUV420P BT709视频**：
  ```shell
  ffmpeg -i input.mp4 -vcodec libx264 -b:v 10M -pix_fmt yuv420p -color_primaries 1 -color_trc 1 -colorspace 1 -f mp4 output.mp4
  ```

- **ffmpeg转换颜色空间**：
  ```shell
  ffmpeg -i input.mp4 -vf "scale=in_color_matrix=bt601:out_color_matrix=bt709" output.mp4
  ```

------

# ffplay

- **同时播放多个视频**：
  ```shell
  ffplay video1.mp4 -loop -autoexit 100 & ffplay video2.mp4 -loop 100 -autoexit & //同时后台运行ffplay -loop 循环100次 -autoexit 播完自动退出
  ```

------

# ffprobe

- **读取视频总帧数**: 
  ```shell
  ffprobe -select_streams v:0 -show_entries stream=nb_frames -of default=nokey=1:noprint_wrappers=1
  ```
- **定位关键帧**：
  ```shell
  ffprobe -i text.mp4 -select_streams v -show_frames -show_entries frame=pict_type -of csv | grep -n I | cut -d ':' -f 1 > frame_index.txt
  ```
- **获取视频总时长**：
  ```shell
  ffprobe -v quiet -of csv=p=0 -show_entries format=duration input.mp4
  ```
- **获取当前目录下所有视频总时长**：
  ```shell
  find . -maxdepth 1 -iname '*.mp4' -exec ffprobe -v quiet -of csv=p=0 -show_entries format=duration {} \; | paste -sd+ -| bc
  ```
