<template>
  <div class="upload-img" :class="{hide: !hide}" :id="loadId">
    <!-- 上传图片 -->
    <!-- 显示上传框 -->
    <div class="show" v-if="hide">
      <span>×</span>
      <p>上传</p>
      <!-- 上传成功显示图片 -->
      <img :src="imagePreviewUrl" alt="" v-show="imagePreviewUrl">
    </div>
  </div>
</template>
<script>
import plupload from "plupload"
export default {
  name: 'upload-img',
  props: {
    // 外部组件传入的图片
    defaultImg: {
      type: String,
      default: ''
    },
    hide: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: 10
    },
    filterImg: {
      type: Boolean,
      default: false
    },
    // aliossHost: {
    //   type: String,
    //   default: 'https://img.meinianuniversity.com'
    // },
    // serverHost: {
    //   type: String,
    //   default: 'https://lms.meinianuniversity.com/AliyunOSS/GetOssSignature'
    // },
    aliossBucketFloder: {
      type: String,
      default: 'AppUpLoad'
    }
  },
  data() {
    return {
      // 父级ID
      loadId: 'uploadImg' + parseInt(Math.random() * 9999),
      imagePreviewUrl: '',
      // 图片上传配置-------上线之前需要修改
      // aliossHost: 'https://img.meinianuniversity.com',
      // serverHost: 'https://lms.meinianuniversity.com/AliyunOSS/GetOssSignature',
      // aliossBucketFloder: 'AppUpLoad'
    }
  },
  mounted () {
    this.initialUploader()
    // 如果有默认图片 显示默认图片
    if (this.defaultImg) {
      this.imagePreviewUrl = this.defaultImg
    }
  },
  methods: {
    initialUploader () {
      var vm = this;
      vm.uploader = new plupload.Uploader({
        browse_button: vm.loadId,
        url: vm.aliossHost,
        multi_selection: true, // single file
        filters: {
          mime_types:vm.mime_types,
          max_file_size: `1000mb`,
          prevent_duplicates: false //不允许选取重复文件
        },
        resize:{
          width: vm.width,
          height:vm.height,
          crop: true,
          quality: 150,
          preserve_headers: true
        },
        init: {
          FilesAdded: function(up, files) {
            if (up.files.length > 1) {
              up.removeFile(up.files[0]);
            }
            // 限制上传大小
            let size = files[0].size / 1024 / 1024
            if (size > vm.size) {
              vm.$emit('FilesSize', `上传图片过大`)
              return
            }
            // 限制上传格式
            if (!this.filterImg) {
              let reg = /\.(png|jpg|gif|jpeg|webp)$/
              if (!reg.test(files[0].name)) {
                vm.$emit('FilesTypeError', `请上传格式错误`)
              }
            }
            vm.fileName = files[0].name;
            var Num = files[0].name.split(".");
            var type = Num[Num.length-1];
            vm.imageUrl = vm.jsonDateFormat() + "/" + Date.parse(new Date()) + Math.floor(Math.random() * 100000) + "." + type;
            vm.set_upload_param(up);
            vm.$emit('FilesAdded',true)
          },
          FileUploaded: function(up, file, info) {
            if (info.status == 200) {
              // 全路径
              vm.imagePreviewUrl = vm.aliossHost + '/' + vm.aliossBucketFloder +'/' + vm.imageUrl; //上传成功后更新地址
              // 不带域名的地址
              vm.imageUrl = '/' + vm.aliossBucketFloder +'/' + vm.imageUrl
              // 输出给父组件
              vm.$emit('FileImgPath', vm.imageUrl, vm.imagePreviewUrl)
            } else {
              vm.$emit('FileUpError', '上传失败');
            }
          }
        }
      });
      vm.uploader.init();
    },
    set_upload_param(up,index) {
      var new_multipart_params;
      var vm = this;
      $.ajax({
        type: "get",
        url: vm.serverHost,
        data:{dir:vm.aliossBucketFloder},
        async:false,
        success:function(res){
          if(res.Code==200){
            vm.index = index;
            var rdata = res.Data;
            new_multipart_params = {
              'key' : vm.aliossBucketFloder + "/" + vm.imageUrl,
              'policy' : rdata.policy,
              'OSSAccessKeyId' : rdata.accessid,
              'success_action_status' : "200",
              'signature' : rdata.signature
            };
            up.setOption({
              'url': rdata.host,
              'multipart_params': new_multipart_params
            });
            up.start();
          }
        }
      });
    },
    jsonDateFormat() {
      var date = new Date();
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
      var dd = date.getDate().toString();
      return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]);
    }
  }
}
</script>
<style lang="css">
.upload-img {
  width: 1.8rem;
  height: 1.3rem;
  border: 1px dashed #848484;
  border-radius: .2rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #848484;
}
.hide {
  width: 100%;
  height: 100%;
  border: 0;
}
.upload-img span {
  font-size: .66rem;
  transform: rotate(45deg);
  font-weight: lighter;
}
.upload-img p {
  font-size: .2rem;
  line-height: .4rem;
  position: relative;
  top: -0.15rem;
}
.upload-img img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
