<template>
  <div class="guide" v-if='isShow'>
    <div class="guide-container">
      <img src="./../assets/guide/guide.png">
      <div class="btn" @click.stop="closeDialog">
        <img src="./../assets/guide/btn.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'guide',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  },
}
</script>
<style lang="scss" scoped>
.guide {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 99999;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  .guide-container {
    width: 4.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 4.1rem;
      height: 2.68rem;
    }
    .btn {
      margin-top: 1.28rem;
      width: 1.95rem;
      height: 1.22rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
} 
</style>