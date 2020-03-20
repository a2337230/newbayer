<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text" >
      {{ title }}
    </p>
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

<style scoped lang="scss" rel="stylesheet/scss">
.no-result {
  text-align: center;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .no-result-icon {
    width: 4.1rem;
    height: 2.63rem;
    margin: 0 auto;
    background: url("./../assets/search/nohis2.png");
    background-repeat: no-repeat;
    background-size: 4.1rem 2.63rem;
  }
   .no-result-text {
      color: #999;
      font-size: 0.3rem;
      margin-top: 0.7rem;
    }
}
</style>
