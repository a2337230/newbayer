<template>
  <swiper :options="swiperOption" ref="mySwiper" class="swiper">
    <swiper-slide v-for="item in imgs" :key="item.img">
        <div class="swiper-item">
          <img :src="'https://img.xlxt.net/' + item.ImgUrl">
        </div>
    </swiper-slide>
    <!-- Optional controls以下按需使用 -->
    <div class="swiper-pagination"  slot="pagination"></div>	<!--分页-->
  </swiper> 
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Swiper',
  props: {
    imgs: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        //循环
        loop:true,
        //设定初始化时slide的索引
        initialSlide:0,
        //自动播放
        // autoplay:true,
        autoplay: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 设置轮播
        // effect : 'flip',
        //滑动速度
        speed:800,
        //滑动方向
        direction : 'horizontal',
        //小手掌抓取滑动
        grabCursor : true,
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable :true
        }
      }
      
    }
  },
  methods: {
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style lang="less" scoped>
.swiper {
  width: 100%;
  border-radius: .2rem;
}
.swiper /deep/ .swiper-pagination-bullets {
  bottom: 2px;
}
.swiper /deep/ .swiper-pagination-bullet {
  width: 5px;
  height: 5px;
}
.swiper-item {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>

