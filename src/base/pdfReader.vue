<template>
<div class="pdf-reader">
  <div id="ww_videoPlay"></div>
</div>

</template>
<script>
import { GetDocumentInfo } from '@/api/rj-server.js'
export default {
  name: 'video1',
  props: {
    pdfDocId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },

  mounted () {
    this._GetDocumentInfo()
    $('body').click(function() {
      $('.wenku-imageview').remove()
    })

  },

  methods: {
    async initBaiduReader(docId, token, host){
      var option = {
        docId: docId,
        token: token,
        host: host,
        serverHost: 'https://doc.bj.baidubce.com',
        width: 600, //文档容器宽度
        zoom: false,              //是否显示放大缩小按钮
        zoomStepWidth: 200,
        pn: 1,  //定位到第几页，可选
        ready: function (handler) {  // 设置字体大小和颜色, 背景颜色（可设置白天黑夜模式）
          handler.setFontSize(1);
          handler.setBackgroundColor('#fff');
          handler.setFontColor('#000');

        },
        flip: function (data) {    // 翻页时回调函数, 可供客户进行统计等
          // $('.pfd').show();
        },
        fontSize: 'big',
        toolbarConf: {
          page: true, //上下翻页箭头图标
          pagenum: true, //几分之几页
          full: false, //是否显示全屏图标,点击后全屏
          copy: true, //是否可以复制文档内容
          position: 'center',// 设置 toolbar中翻页和放大图标的位置(值有left/center)
        } //文档顶部工具条配置对象,必选
      };
      new Document('ww_videoPlay', option);
    },

    // 文档播放
    async _GetDocumentInfo(){
      let params = {
        documentId: this.pdfDocId,
      }
      let data = await GetDocumentInfo(params)
      if(data.Code == 200){
        let dataList = JSON.parse(data.Data)
        this.initBaiduReader(dataList.docId, dataList.token, dataList.host)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.pdf-reader{

}
</style>
