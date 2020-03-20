<template>
  <div ref="wrapperX">
    <slot> </slot>
  </div>
</template>

<script type="es6">
import BScroll from 'better-scroll'
 export default {
   props: {
     probeType: {
       type: Number,
       default: 1
     },
     click: {
       type: Boolean,
       default: true
     },
     listenScroll: {
       type: Boolean,
       default: false
     },
     data: {
       type: Array,
       default: null
     },
     pullup: {
       type: Boolean,
       default: false
     },
     beforeScroll: {
       type: Boolean,
       default: false
     },
     refreshDelay: {
       type: Number,
       default: 20
     },
     scrollX:{
       type: Boolean,
       default: false
     },
     scrollY:{
       type: Boolean,
       default: true
     },
  pullDown:{
	  type: Boolean,
	  default: false
  }
   },
data(){
	return{
		showLoading:false
	}
},
   mounted() {
     setTimeout(() => {
        this._initScroll()
     }, 20)
   },
   methods: {
     _initScroll() {
      var  initObg = {
        probeType: this.probeType,
        click: this.click,
        scrollY:this.scrollY,
        scrollX:this.scrollX,
      }
       this.scroll = new BScroll(this.$refs.wrapperX, initObg);
       if (this.listenScroll) {
         let me = this;
         this.scroll.on('scroll', (pos) => {
           me.$emit('scroll', pos)
         })
       }
       if (this.pullup) {
         this.scroll.on('scrollEnd', () => {
           if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
             this.$emit('scrollToEnd')
           }
         })
       }

       if (this.beforeScroll) {
         this.scroll.on('beforeScrollStart', () => {
           this.$emit('beforeScroll')
         })
       }
     },
     disable() {
       this.scroll && this.scroll.disable()
     },
     enable() {
       this.scroll && this.scroll.enable()
     },
     refresh() {
       this.scroll && this.scroll.refresh()
     },
     scrollTo() {
       this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
     },
     scrollToElement() {
       this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
     },
   finishPullDown(){
	  this.showLoading = false
	  this.refresh()
   },
  stop() {
    this.scroll && this.scroll.stop()
  },
   },
   watch: {
     data() {
       setTimeout(() => {
         this.refresh()
       }, this.refreshDelay)
     }
   }
 }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.loading-img {
  transition: height 2s;
  width: 100%;
  height: 0.3rem;
  text-align: center;
  img {
    height: 0.3rem;
  }
  &.showLoading {
    height: 0;
  }
}
</style>
