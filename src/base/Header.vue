<template>
  <div class="heater">
    <div :class="['flex-center',{'border-show':showBorder}]">
      <div class="left">
        <img
          class="back"
          src="../assets/back.png"
          alt=""
          @click="goBack"
        />
      </div>
      <div class="title no-wrap">{{ title }}</div>
      <div class="right-text" @click="clickRight">
        <p v-if="rightText" :style="{ color: rightTextColor }" style="">
          {{ rightText }}
        </p>
        <i  v-if="imgPath" :style="{'background-image':`url(${imgPath})`}" class="rightImg"></i>
        <i  v-if='rightIcon' :class="rightIcon"></i>
      </div>
    </div>
  </div>
</template>
<script type="es6">
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });
 export default {
   props:{
	showBorder: {
		type: Boolean,
		default: true
	 },
     title: {
       type: String,
       default: ''
     },
     opacity:{
       type:Number,
       default:0
     },
     rightText:{
       type: String,
       default: ''
     },
     imgPath:{
       type: String,
       default: ''
     },
     rightTextColor:{
      type: String,
      default: '#333333'
    },
    rightIcon:{
      type: String,
       default: ''
    }
   },
data(){
	return{

	}
 },
   methods:{
     goBack(){
       this.$emit('goBack')
     },
     clickRight(){
		this.$emit('clickRight')
     },
  hideProgress(){
	 NProgress.done();
  }
   },
created(){
   NProgress.start();
   console.log(this.imgPath)
},
destroyed(){
	// NProgress.done();
},
mounted(){
	window.hideProgress = this.hideProgress()
	$('#nprogress .peg').css({'display':'none'});
}
 }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.heater {
  height: 0.88rem;
  background: #fff;
}
.flex-center {
  box-sizing: border-box;
  padding: 0.24rem 0.3rem;
  height: 0.88rem;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 999;
  width: 100%;
  position: fixed;
  height: 0.88rem;
  top: 0;
}
.border-show{
	border-bottom: 1px solid #e2e6ec;
}
.heater {
  .title {
    font-size: 0.4rem;
    color: #000;
    font-weight: 600;
    flex: 0 0 60%;
    text-align: center;
  }
}
.opacity-icon {
  opacity: 0;
}
.right-text {
  p {
    font-size: 0.3rem;
    color: #333333;
    margin-right: 0.06rem;
    font-weight: 500;
    line-height: 0.42rem;
  }
  i {
    font-size: 0.4rem;
  }
}
.left {
  display: flex;
  align-items: center;
  flex: 0 0 20%;
  .back {
    width: 0.18rem;
    height: 0.3rem;
  }
}
.right-text {
  flex: 0 0 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.rightImg{
    width: 0.5rem;
    height: 0.5rem;
    background-repeat:no-repeat;
    background-size: 0.4rem 0.4rem;

}
</style>
