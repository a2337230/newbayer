<template>
  <div class="video-box">
    <div class="prism-player" id="J_prismPlayer"></div>
  </div>

</template>
<script>
import { VideoPlay } from '../api/rf-sever'
import { UpdateStudyCourseProgress } from '../api/rj-server.js'
import moment from 'moment'
export default {
  name: 'video1',
  props: {
    VideoId: {
      type: String,
      default: ''
    },
    VideoImg: {
      type: String,
      default: '',
    },
    data: {
      type: String,
      default: ''
    },
    timeLength: {
      type: Number,
      default: 0
    },
    coursewareID: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      player: '',
      // 默认图片
      defaultVideoImg: require('./../assets/cover.png'),
      // 是否关闭
      isClose: false,
      player: '',
      // 兼容IOS
      x5_type:'',
      // cover_img: require('./../assets/cover.png'),
      timeOut: null,
      playtime: 0
    }
  },
  created () {
    var ua = navigator.userAgent.toLowerCase();
    let ios = ua.indexOf("native_app_ios") > -1
    if (ios) {
      this.x5_type = 'h5'
    }
  },
  mounted () {
    this.playVideo()
  },
  beforeDestroy () {
    this.isClose = true
  },
  methods: {
    async playVideo() {
      let data = JSON.parse(this.data)
        let _this = this
        if (data.PlayAuth) {
          _this.player = new Aliplayer({
            id: 'J_prismPlayer',
            width: '100%',
            height: '100%',
            autoplay:false,
            preload: false,
            vid: _this.VideoId,
            playauth: data.PlayAuth,
            useH5Prism:true,
            x5_fullscreen:false,
            playsinline:true,
            x5_type: _this.x5_type, // 不启用同层播放，设置为h5 则为启用
            qualitySort: true,
            controlBarVisibility:'click',
            showBarTime:3000,//配合click使用
            cover: _this.VideoImg ? _this.VideoImg :  _this.defaultVideoImg,

          }, function (player) {
            $('.prism-fullscreen-btn').css('visibility','hidden')
              // 首次初始化设置结束时间
              let timeLength = moment(_this.timeLength * 1000).format('mm:ss')
              $('.duration')[0].innerText = timeLength
              // 设置默认封面
              $("#J_prismPlayer video").attr("poster", _this.VideoImg ? _this.VideoImg :  _this.defaultVideoImg)
              var userAgent = navigator.userAgent
              // 判断华为手机
              let huawei = navigator.appVersion.toLowerCase()
              // alert(huawei.includes('huawei'))
              var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
              if(huawei.includes('huawei')) {
                $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
              }
              // if(navigator.userAgent.toLowerCase().indexOf("iphone")) {
              //     $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
              // }
              setTimeout(()=> {
                $('.prism-cover').css({
                  'backgroundSize': 'cover',
                })
              }, 1000)
              player.on('play', function () {
                $('.prism-fullscreen-btn').css('visibility','visible')
                $('.prism-cover').css({
                  'border-radius': '.2rem'
                })
              });
             player.on("ended", function () {
                _this.playtime = _this.player.getCurrentTime()
                _this.$emit('getStudyTime', _this.playtime, _this.coursewareID, 'end')
              });
          })
        }
    },

  },

  // 回退当前页面调进度接口
  beforeDestroy(){
    if(this.player){
      this.playtime = this.player.getCurrentTime()
    }
    if(Number(this.playtime)>0){
      this.$emit('getStudyTime',this.playtime, this.coursewareID)
    }

  }


}
</script>
<style lang="scss" scoped>
.video-box {
  width: 100%;
  height: 100%;
}
.video-box video:not([controls]) {
  display: block;
}
.video-box /deep/ .prism-player  {
  width: 100%;
  border-radius: .2rem !important;
}
.video-box /deep/ .prism-big-play-btn {
  left: 50% !important;
  // top: 50% !important;
  margin-left: -30px;
}
.video-box /deep/ .prism-player video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  object-position: 50% 50% !important;
  // border-radius: .2rem !important;
 }
.video-box /deep/ .prism-cover {
  background-size: cover;
  border-radius: .2rem !important;
}
.video-box /deep/ .prism-player video.center {
  object-position: 50% 50% !important;
 }
.video-box /deep/ .prism-controlbar-bg{
  border-radius: 0 0 .2rem .2rem;
}
.video-box /deep/ .prism-marker-text {
  background: transparent !important;
}
.video-box /deep/ .prism-setting-audio{
  display: none;
}
.video-box /deep/ .prism-setting-cc{
  display: none;
}
.video-box /deep/ .prism-cc-btn{
  display: none;
}
</style>

