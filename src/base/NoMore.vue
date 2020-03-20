<template>
  <div class="no-more">
    <p class="more-title">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: 'noMore',
  props: {
    title: {
      type: String,
      default: '我是有底线的'
    }
  },
  
}
</script>
<style lang="css" scoped>
.no-more {
  width: 100vw;
  display: flex;
  justify-content: center;
}
.more-title {
  font-size: .26rem;
  color: #848484;
  position: relative;
}
.more-title::after, .more-title::before {
  content: '';
  position: absolute;
  top: 50%;
  margin-left: .2rem;
  width: 1rem;
  height: 1px;
  background-color: #e2dede;
}
.more-title::before {
  margin-left: -1.2rem;
}
</style>