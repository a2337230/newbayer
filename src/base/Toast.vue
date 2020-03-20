<template>
  <div class="toast">
    <span class="toast-text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'toast',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    align: {
      type: [String, Number],
      default: '50'
    },
    topTime: {
      type: [String, Number],
      default: '.1'
    },
    toastTime: {
      type: [String, Number],
      default: 1000
    }
  },
  data () {
    return {
      timer: ''
    }
  },
  watch: {
    visible (val) {
      clearTimeout(this.timer)
      let toast = document.querySelector('.toast-text')
      if (val) {
        toast.style.transition = this.topTime + 's'
        toast.style.top= this.align + '%'
        this.timer = setTimeout(() => {
          toast.style.transition = '0s',
          this.$emit('update:visible', false)
        }, this.toastTime)
      } else {
        toast.style.top = '110%'
      }
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.toast {
  display: flex;
  justify-content: center;
  .toast-text {
    position: fixed;
    top: 110%;
    min-width: 3rem;
    max-width: 5rem;
    text-align: center;
    height: .7rem;
    line-height: .7rem;
    font-size: .3rem;
    padding: 0 .3rem;
    background-color: rgba(0,0,0,0.69);
    border-radius: .7rem;
    color: #fff;
    font-size: .3rem;
    z-index: 9999;
  }
}
</style>