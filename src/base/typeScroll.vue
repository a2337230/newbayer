<template>
  <scrollX
    class="type-con"
    :scrollX="true"
    :scrollY="false"
    ref="typeScroll"
    :data="types"
    :showLoading="false"
  >
    <div class="item-list">
      <div
        class="type-item "
        v-for="(item, index) in types"
        :class="{ active: index == typeIndex }"
        @click="checkType(item, index)"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
  </scrollX>
</template>

<script>
import scrollX from "@/base/scrollX.vue";
export default {
  props: {
    types: {
      types: Array,
      default: []
    }
  },
  computed: {
    typeIndex() {
      return this.typeIndex2;
    }
  },
  data() {
    return {
      typeIndex2: 0
    };
  },
  components: {
    scrollX
  },
  methods: {
    checkType(item, index) {
      this.typeIndex2 = index;
      this.$refs.typeScroll.scrollToElement(
        $(".type-item")[index],
        500,
        -150,
        0
      );
      this.$emit("checkType", item);
    }
  },
  mounted() {
    setTimeout(() => {
      var scrollWidth = 0;
      for (let i = 0; i < this.types.length; i++) {
        scrollWidth +=
          $(".item-list .type-item")
            .eq(i)
            .width() +
          parseFloat(
            $(".item-list .type-item")
              .eq(i)
              .css("margin-right")
          );
      }
      $(".item-list").width(scrollWidth + 40);
      this.$refs.typeScroll.refresh();
    }, 400);
  }
};
</script>

<style scoped="scoped" lang="scss">
.type-con {
  height: 0.8rem;
  position: relative;
  // margin-bottom: 0.1rem;
  position: relative;
  z-index: 991;
  .item-list {
    padding: 0.02rem 0;
    display: flex;
    min-width: 100%;
    position: absolute;
    white-space: nowrap;

    .type-item {
      float: left;
      transition: all 0.18s;
      margin-right: 0.4rem;
      font-size: 0.26rem;
      line-height: 0.42rem;
      color: #333333;
      // min-width: 1.2rem;
      padding-top: 0.21rem;
      &.activeBoth {
        font-weight: 600;
        font-size: 0.28rem;
      }
      &.active {
        padding: 0;
        font-size: 0.34rem;
        line-height: 0.7rem;
        font-weight: 600;
        margin-right: 0.4rem;
        // min-width: 2rem;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
