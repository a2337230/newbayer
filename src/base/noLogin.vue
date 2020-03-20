<template>
  <div class="no-login-con">
    <div class="no-login">
      <img :src="require('../../src/assets/search/nohis2.png')" alt="">
    </div>
    <div class="text-con">
      <p class="text">{{text}}</p>
      <mu-button round color="#2F54EB" class='my-btn' v-if='showBtn' @click='clickBtn'>去登录</mu-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '你还没有登录呦~'
      },
      showBtn: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    methods:{
      clickBtn(){
        this.$emit('goLogin')
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .no-login {
    text-align: center;
    padding: 2.5rem 1.7rem 0 1.7rem;
    img {
      width: 4.1rem;
      margin-bottom: 0.6rem;
    }
  }



  .text {
    font-size: 0.3rem;
    line-height: 0.42rem;
    color: #848484;
    margin-bottom: 0.63rem;
  }

  .mu-button.my-btn {
    width: 1.8rem;
    height: 0.6rem;
  }

  .text-con {
    text-align: center;
  }
</style>
