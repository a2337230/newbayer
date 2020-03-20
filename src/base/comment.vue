<template>
  <div class="comment-con">
    <div class="comment" v-if="commentList&&commentList.length>0">
      <div v-for="(item, index) in commentList" class="comment-item">
        <div class="comment-pad">
          <div class="comment-top">
            <img :src="item.HeadImg ? 'https://img.xlxt.net/' + item.HeadImg : defaultImg" class="portrait">
            <div class="comment-right">
              <span class="name">{{ item.Name }}</span>
              <div class="comment-t">
                <span class="time">{{ getDate(item.AddTime.replace('T',' ').split('.')[0]) }}</span>
                <p class="comment-praise">
                  <span>{{ item.LikeNum }}</span>
                  <!-- <span class="isZan"> -->
                    <span class="click-btn" @click="reviewLike(item,index)" >
                      <img :src="item.IsLike==false? noZan : zan" :id="'like'+item.ArticleCommentID" class="t-portaise" />
                    </span>
                  <!-- </span> -->
                  <span @click="replyComment(item,index)" class="reply-sty">回复</span>
                </p>
              </div>
            </div>
          </div>
          <p class="comment-content">{{ item.Content|codeForamt }}</p>
          <div class="comment-reply" v-if="item.ReviewReply&&item.ReviewReply.length>0">
            <div v-for="(sitem,sindex) in item.ReviewReply" v-if="sindex<=2 || item.showAll" class="comment-item">
              <div class="comment-top">
                <img :src="sitem.HeadImg ? 'https://img.xlxt.net/' + sitem.HeadImg : defaultImg" class="portrait">
                <div class="comment-right">
                  <span class="name">{{ sitem.Name }}</span>
                  <div class="comment-t">
                    <span class="time">{{ getDate(sitem.AddTime.replace('T',' ').split('.')[0]) }}</span>
                    <p class="comment-praise">
                      <span>{{ sitem.LikeNum }}</span>
                      <!-- <span class="isZan"> -->
                        <span class="click-btn" @click="replayLike(item, sitem,index,sindex)">
                         <img :src="sitem.IsLike==false? noZan : zan" class="m-portaise" />
                        </span>
                      <!-- </span> -->
                    </p>
                  </div>
                </div>
              </div>
              <p class="comment-content">{{ sitem.Content|codeForamt }}</p>
              <div v-if="!item.showAll&&item.ReviewReply.length>3&&sindex==2" @click="showAll(index)" class="comment-all">
                <span>展开更多回复内容</span>
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from '@/base/Scroll.vue'
import { AddReviewLike } from '@/api/rj-server.js'
import Util from '@/common/js/util.js'
let Base64 = require('js-base64').Base64;
  export default {
    props: {
      commentList: {
        type: Array,
        default: []
      }
    },
    components: {
      Scroll
    },
    data() {
      return {
        zan: require('./../assets/course/dianzan.png'),
        noZan: require('./../assets/course/dianzan-no.png'),
        defaultImg: require('./../assets/avatar.png')
      }
    },
    methods: {
      // 评论转换时间格式
      getDate(dateTimeStamp){
        var second = 1000
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var year = month * 12;

        if(dateTimeStamp==undefined){
          return false;
        }else{
          dateTimeStamp = dateTimeStamp.replace(/\-/g, "/");
          var sTime = new Date(dateTimeStamp).getTime();//把时间pretime的值转为时间戳
          var now = new Date().getTime();//获取当前时间的时间戳
          var diffValue = now - sTime;
          if(diffValue < 0){
            console.log("结束日期不能小于开始日期！");
            return dateTimeStamp
          }
          var yearC = diffValue/year;
          var monthC = diffValue/month;
          var weekC = diffValue/(7*day);
          var dayC = diffValue/day;
          var hourC = diffValue/hour;
          var minC = diffValue/minute;
          var secondC = diffValue/second;
          if(yearC>1){
            return Util.jsonDateFormatAllTime6(sTime)
          }
          // else if(monthC>=1){
          //    return parseInt(monthC)  + "个月前"
          // }
          // else if(weekC>=1){
          //   return parseInt(weekC) + "周前"
          // }
          else if(dayC>1){
            return Util.jsonDateFormatAllTime5(sTime)
          }
          else if(hourC>1){
            return parseInt(hourC) + "小时之前"
          }
          else if(minC>1){
            return parseInt(minC) + "分钟之前"
          }else if(secondC>1){
            return parseInt(secondC) + "秒之前"
          }else{
            return '刚刚'
          }
        }
      },

      showAll(index) {
        this.$set( this.commentList[index],'showAll',true);
      },

      // 点赞
      reviewLike(item,index){
        // likeAnimate.init(event.x, event.y)
        // console.log(event)
        this.$emit('reviewLike',item,index)
      },

      // 回复点赞
      replayLike(item,sitem,index,sindex) {
        this.$emit('replayLike',item,sitem,index,sindex)
      },

      // 回复
      replyComment(item,index) {
        this.$emit('replyComment',item,index)
      },

    },
    filters: {
      codeForamt(val) {
        // return unescape(String(val));
        return unescape(val.replace(/\\/g, "%"));
      }
    },
    watch: {
     // commentList() {
     //   console.log("ddddd", this.commentList);
     //    this.commentList.forEach((item) => {
     //      item.Content = unescape(item.Content).replace(/%/g,"\\").toLowerCase()
     //      if (item.ReviewReply.length != 0) {
     //        item.ReviewReply.forEach((sitem) => {
     //          sitem.Content = unescape(sitem.Content).replace(/%/g,"\\").toLowerCase()
     //       })
     //      }
     //   })
     // }
    },
    mounted() {
      // this.commentList.forEach((item) => {
      //  item.Content = Base64.decode(item.Content)
      //  if (item.ReviewReply.length != 0) {
      //    item.ReviewReply.forEach((sitem) => {
      //      sitem.Content = Base64.decode(sitem.Content)
      //    })
      //  }
      // })
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/css/index.scss';
  .comment-con{
    .comment{
      padding: .3rem;
      width: 100%;
      color: #333333;
      .comment-item{
        padding-top: .3rem;
        .comment-top{
          display: flex;
          padding-left: .27rem;
          .portrait{
            width: .8rem;
            height: .8rem;
            border-radius: .5rem;
          }
          .comment-right{
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-left: .24rem;
            justify-content: space-between;
            .name{
              font-size: .28rem;
              font-weight: bold;
              line-height: .4rem;
            }
            .comment-t{
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              .time{
                font-size: .24rem;
                color: #999999;
              }
              img{
                width: .3rem;
                height: .33rem;
              }
              .comment-praise{
                color: $paColor;
                font-size: .26rem;
                display: flex;
                align-items: flex-end;
                .isZan {
                  position: relative;
                  display: inline-block;
                  margin: 0 .37rem 0 .15rem;
                }
                .t-portaise{
                  margin: 0 .37rem 0 .15rem;
                }
                .m-portaise{
                  margin-left: .19rem;
                }
                .reply-sty{
                  margin-bottom: 0.03rem;
                }
              }
            }
          }
        }
        .comment-content{
          padding: .3rem 0;
          padding-left: .27rem;
          font-size: .28rem;
          line-height: .4rem;
          white-space:normal;
          word-break:break-all;
        }
        .comment-reply{
          width: 100%;
          background: #fff;
          .comment-item{
            background: #F9F9F9;
            padding: .18rem .24rem 0 .24rem;
            .portrait{
              width: .6rem;
              height: .6rem;
              border-radius: .5rem;
            }
            .comment-right{
              .name{
                font-size: .26rem;
                font-weight: 400;
              }
              .time{
                font-size: .2rem;
              }
            }
          }
          .comment-item:not(:first-child){
            margin-top: .2rem;
          }
          .comment-content{
            font-size: .24rem;
          }
          .comment-all{
            width: 100%;
            display: flex;
            justify-content: center;
            color: #999999;
            font-size: .24rem;
            line-height: .33rem;
            padding-bottom: .08rem;
          }

        }
      }
    }
    .divider{
      width: 100%;
      height: 1px;
      background: #D9D9D9;
    }
    .input-con{
      position: fixed;
      bottom: 0;
      background: #979797;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .15rem .64rem;
      input {
        outline: none;
        width: 100%;
        max-width: 100%;
        height: .68rem;
        background: #fff;
        border: 0;
        font-size: .30rem;
        color: #848484;
        line-height: .42rem;
        text-align: center;
      }
    }
  }
</style>
