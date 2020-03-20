<template>
  <div class="no-result">
    <!--<div class="no-result-icon"></div>-->
     <p class="no-result-text" style="color: #999;font-size: 0.26rem">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '目前还没有任何记录'
      }
    }
  }
</script>

<style scoped  lang="scss"  rel='stylesheet/scss'>
  .no-result{
    text-align: center;
	position: absolute;
    width: 100%;
    top: 40%;
	  left: 50%;
    transform: translate(-50%,-50%);
    .no-result-icon{
       width: 4.10rem;
      height: 3.76rem;
      margin: 0 auto;
      background: url("./../assets/search/nohis.png");
	  background-repeat: no-repeat;
      background-size: 4.10rem 3.76rem;
    .no-result-text{
      font-size: 0.26rem;
       }
    }
  }
</style>
