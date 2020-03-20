<template>
  <div class="bayer">
    <my-header :title="'拜耳专区'" ref="header" @goBack="goBack"></my-header>
    <div class="bayer-container">
      <!-- 轮播图 -->
      <div class="swiper">

      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from '@/base/Header.vue'
export default {
  name: 'home',
  methods: {
    goBack () {
      window.location.href = 'https://m2.xlxt.net'
    }
  },
  mounted () {
    this.$refs.header.hideProgress()
  },
  components: {
    MyHeader
  }
}
</script>
<style lang="scss" scoped>
.bayer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bayer-container {
    width: 100%;
    height: calc(100% - .88rem);
    .swiper {
      margin: .3rem;
      height: 2.96rem;
      background-color: red;
      border-radius: .1rem;
      overflow: hidden;
    }
  }
}
</style>