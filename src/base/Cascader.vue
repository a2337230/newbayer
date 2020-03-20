<template>
  <div class="cascader">
    <div class="navigation-container">
      <ul class="navigation" ref="navigation">
        <li class="nav-item" @click="isAll">全部</li>
        <li class="nav-item" :class="{navCurrent:  item.ClassifyID}" v-for="(item, index) in currentType" :key="item.ClassifyID" @click="tabClick(item, index)">{{item.Name}}</li>
      </ul>
    </div>
    <!-- 选择下级分类 -->
    <div class="nav-class">
      <p @click="openClass">请选择下级分类 <span :class="{isOpen: isOpen}"><img src="./../assets/button1.png"></span></p>
    </div>
    <div class="nav-options" :class="{isOpen: isOpen}">
      <div class="option">
        <ul class="data-container" v-if="currentArray.length>0">
          <li v-for="(item, index) in currentArray" :class="{current : currentId==item.ClassifyID}" :key="item.ClassifyID"  @click="currentOption(item, index)">{{ item.Name }}</li>
        </ul>
        <div v-else class="no-list">
          <span>暂无分类</span>
        </div>
      </div>
      <div class="nav-btn-group">
        <button @click="submitOption">确认选择</button>
        <button @click="nextOption" :class="{btnCurrent: isNextClick}">继续筛选下一级</button>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { nextTick } from 'q'
import { GetAllCourseClassify, GetChildByInfoParentID, GetClassChildByInfoParentID} from '@/api/rj-server.js'
export default {
  props: {
    // navTypeList: {
    //   type: Array,
    //   default: []
    // },
    navCourseType: {
      type: String,
      default: ''
    },
    navTypeId: {
      type: Number,
      default: 0
    },

  },
  name: 'Cascader',
  data () {
    return {
      isOpen: false,
      // 选中分类
      currentType: [],
      // 分类层级
      currentArray: [],
      // 下一级是否可点击
      isNextClick: false,
      // tab滚动
      scroll: '',
      // 确定选中分类
      submitType: [],
      submitData: [],
      paramID: 0,
      tempID: -1,
      currentId: 0,
      topNav: false
    }
  },

  created () {

  },

  mounted () {
    // 内部课程
    if(this.navCourseType == 'internal'){
      this._GetChildByInfoParentID()
    }else{
      this.paramID = this.navTypeId
      this._GetAllCourseClassify()
    }
    this.scroll = new BScroll('.navigation-container', {
      probeType: this.probeType,
      click: true,
      scrollY:false,
      scrollX:true
    })
  },

  methods: {
    // 企业课程分类
    async _GetAllCourseClassify(){
      let params = {
        parentId: this.paramID
        // name: ''
      }
      let data = await GetClassChildByInfoParentID(params)
      if(data.Code == 200){
        if(data.Data.length>0){
          // this.currentArray = data.Data
          //数组数据格式转化
          this.currentArray = data.Data.map((item) => {
            return {
              AppUserID: item.AppUserID,
              ClassifyID: item.CommonTypeID,
              ChildNum: item.ChildNum,
              Name: item.Name,
              ParentID: item.ParentID,
              Sort: item.Sort
            }
          })
          if(this.topNav){
            // 点击定位元素到可见区域
            this.$nextTick( ()=>{
              let container = $('.data-container')[0]
              let top = $('.data-container li')[0]
              let temp = $('.data-container .current')[0]
              let topHeight = $(top).offset().top
              let height = $(temp).offset().top
              container.scrollTo(0, height - topHeight)
            })
          }
        }
      }
    },

    // 内部课程分类(内部课程单独接口)
      async _GetChildByInfoParentID(){
        let params = {
          ParentID: this.paramID
        }
        let data = await GetChildByInfoParentID(params)
        if(data.Code == 200){
          //数组数据格式转化
          this.currentArray = data.Data.map((item) => {
            return {
              AppUserID: item.AppUserID,
              ClassifyID: item.CourseTypeID,
              ChildNum: item.ChildNum,
              Name: item.Name,
              ParentID: item.ParentID,
              Sort: item.Sort
            }
          })
        }
      },

    // 打开分类
    openClass () {
      // 获取容器
      this.isOpen = !this.isOpen
    },

    // 选择分类
    currentOption (val, index) {
      this.topNav = false
      if(val.ParentID != this.tempID){
        this.currentType.push(val)
      }else{
        this.currentType.pop()
        this.currentType.push(val)
      }
      this.tempID = val.ParentID
      this.currentId = val.ClassifyID
      if(val.ChildNum > 0){
        this.isNextClick = true
        this.paramID = val.ClassifyID
      }else{
        this.isNextClick = false
      }
    },

    // 筛选下一级
    nextOption () {
      if(this.topNav){
        this.paramID = this.currentId
        // this._GetAllCourseClassify()
        if(this.navCourseType == 'internal'){
          this._GetChildByInfoParentID()
        }else{
          this._GetAllCourseClassify()
        }
      }else{
        // this._GetAllCourseClassify()
        if(this.navCourseType == 'internal'){
          this._GetChildByInfoParentID()
        }else{
          this._GetAllCourseClassify()
        }
      }
    },

    // 点击全部
    isAll () {
      if (!this.isOpen) {
        this.$emit('getCourseTypeID', this.navTypeId, 'all')
      }
      let option = document.querySelector('.option')
      this.currentId = 0
      this.currentType = []
      this.paramID = this.navTypeId
      // this._GetAllCourseClassify()
      if(this.navCourseType == 'internal'){
        this._GetChildByInfoParentID()
      }else{
        this._GetAllCourseClassify()
      }
    },

    // 点击子项
    tabClick (val, index) {
      this.topNav = true
      this.currentType.splice(index + 1)
      this.currentId = val.ClassifyID
      this.paramID = val.ParentID
      this.tempID = val.ParentID
      if(val.ChildNum > 0){
        this.isNextClick = true
        // this._GetAllCourseClassify()
        if(this.navCourseType == 'internal'){
          this._GetChildByInfoParentID()
        }else{
          this._GetAllCourseClassify()
        }
      }else{
        this.isNextClick = false
      }
      this.$emit('getCourseTypeID', this.currentId)
    },

    submitOption () {
      this.$emit('getCourseTypeID', this.currentId)
      this.isOpen = false
    }
  },

  watch: {
    currentType (val) {
      let container = document.querySelector('.navigation-container')
      let navigation = document.querySelector('.navigation')
      this.$nextTick(() => {
        let item = navigation.querySelectorAll('.nav-item')
        let w = item[item.length - 1].offsetLeft + item[item.length - 1].clientWidth + item[0].offsetLeft
        navigation.style.width = w + 'px'
        this.scroll.refresh()
        let l = navigation.clientWidth - container.clientWidth
        if (l > 0) {
          this.scroll.scrollTo(-l,0,200)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'common/css/index.scss';

.cascader {
  width: 100vw;
  position: relative;
  z-index: 5;
  // overflow: hidden;
  .navigation-container {
    width: 100vw;
    background-color: #fff;
    position: relative;
    z-index: 5;
  }
  .navigation {
    height: .86rem;
    display: flex;
    align-items: center;
    .nav-item {
      white-space: nowrap;
      margin-left: .33rem;
      position: relative;
      color: #848484;
      font-size: .3rem;
      &:not(:first-child) {
        &::before {
          content: '';
          position: absolute;
          width: .33rem;
          height: 100%;
          background: url('./../assets/right1.png') no-repeat center center;
          background-size: .13rem .24rem;
          left: -.33rem;
        }
      }
    }
    .navCurrent {
      // color: #2F54EB;
    }
  }
  .nav-class {
    height: .8rem;
    line-height: .8rem;
    box-shadow:0px 2px 2px 0px rgba(246,246,246,1);
    border-top: 1px solid #eaeaea;
    background-color: #fff;
    position: relative;
    z-index: 5;
    margin-top: -1px;
    p {
      text-align: center;
      color: #a9a9a9;
      font-size: .3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        width: .3rem;
        height: .3rem;
        margin-left: .11rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(-180deg);
        transition: .2s;
        img {
          width: 0.25rem;
          height: 0.14rem;
          vertical-align: middle;
        }
      }
      .isOpen {
        transform: rotate(0);
      }
    }
  }
  .nav-options {
    width: 100vw;
    position: absolute;
    top: -3rem;
    height: 4.31rem;
    background-color: #fff;
    transition: .1s;
    box-shadow:0px 10px 5px 0px rgba(215,210,210,0.28);
    border-radius:0px 0px 20px 20px;
    overflow: hidden;
    .option {
      min-height: 3.59rem;
      display: flex;
      transform: translateX(0);
      transition: .2s;
    }
    .no-list{
      margin: 0 auto;
      padding-top: 1rem;
    }
    .data-container {
      // height: 50vw;
      min-width: 100vw;
      max-width: 100vw;
      height: 3.59rem;
      overflow-y: scroll;
      padding-top: .28rem;
      // display: flex;
      // flex-wrap: wrap;
      &::after {
        content: '';
        display: block;
        clear: both;
      }
      li {
        width: 50vw;
        font-size: .3rem;
        height: .52rem;
        line-height: .52rem;
        margin: .07rem 0;
        text-align: center;
        border-radius: .27rem;
        color: #333;
        float: left;
      }
      .current {
        color: #fff;
        background-color: $paColor;
      }
    }
    .nav-btn-group {
      height: .72rem;
      display: flex;
      button {
        outline: none;
        border: 0;
        width: 50vw;
        height: 100%;
        background-color: #999;
        color: #fff;
        font-size: .3rem;
        //opacity: 0.5;
        &:nth-of-type(1) {
          background-color: #fff;
          color: $paColor;
          border-top: 1px solid rgba(219,218,218,0.5);
          box-sizing: border-box;
          opacity: 1;
        }
      }
      .btnCurrent {
        //opacity: 1;
        background-color: $paColor;
      }
    }
  }
  .isOpen {
    top: 1.5rem;
    .data-container {
      height: 3.59rem;
    }
  }

}
</style>
