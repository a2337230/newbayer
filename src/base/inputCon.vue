<template>
  <div class="wrapper">
    <textarea
      autoHeight="true"
      class="input-con"
      v-model.trim="inputVal"
      ref="textInput"
      :maxlength="maxlength"
      :placeholder="text"
      id="textarea"
      @blur="blurInput"
    ></textarea>
    <mu-button
      color="#2F54EB"
      class="my-btn"
      :disabled="!inputVal"
      @click="send"
      >发送</mu-button
    >
  </div>
</template>
<script>
    //  @input="changeVal"
/*
 * @Author: lee
 * @Date: 2019-12-12 09:22:46
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-26 18:16:45
 * 文本框根据输入内容自适应高度组件  父组件调用 inputFocus 方法让输入框获取光标
 * 父组件监听子组件sendMasage （发送按钮）事件
 * 父组件监听子组件inputBlur（失去光标）事件
 */
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: "回复…"
    },
    maxlength: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      inputVal: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    _initText(elem, extra, maxHeight) {
      /**
       * 文本框根据输入内容自适应高度
       * @param                {HTMLElement}     输入框元素
       * @param                {Number}          设置光标与输入框保持的距离(默认0)
       * @param                {Number}          设置最大高度(可选)
       */
      extra = extra || 0;
      var isFirefox = !!document.getBoxObjectFor || "mozInnerScreenX" in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf("Opera"),
        addEvent = function(type, callback) {
          elem.addEventListener
            ? elem.addEventListener(type, callback, false)
            : elem.attachEvent("on" + type, callback);
        },
        getStyle = elem.currentStyle
          ? function(name) {
              var val = elem.currentStyle[name];

              if (name === "height" && val.search(/px/i) !== 1) {
                var rect = elem.getBoundingClientRect();
                return (
                  rect.bottom -
                  rect.top -
                  parseFloat(getStyle("paddingTop")) -
                  parseFloat(getStyle("paddingBottom")) +
                  "px"
                );
              }

              return val;
            }
          : function(name) {
              return getComputedStyle(elem, null)[name];
            },
        minHeight = parseFloat(getStyle("height"));

      elem.style.resize = "none";

      var change = function() {
        var scrollTop,
          height,
          padding = 0,
          style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
          padding =
            parseInt(getStyle("paddingTop")) +
            parseInt(getStyle("paddingBottom"));
        }
        scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + "px";
        if (elem.scrollHeight > minHeight) {
          if (maxHeight && elem.scrollHeight > maxHeight) {
            height = maxHeight - padding;
            style.overflowY = "auto";
          } else {
            height = elem.scrollHeight - padding;
            style.overflowY = "hidden";
          }
          style.height = height + extra + "px";
          scrollTop += parseInt(style.height) - elem.currHeight;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          elem.currHeight = parseInt(style.height);
        }
      };
      addEvent("propertychange", change);
      addEvent("input", change);
      addEvent("focus", change);
      change();
    },
    send() {
      this.$emit("sendMasage", this.inputVal);
      this.inputVal = "";
    },
    inputFocus() {
      this.$nextTick(() => {
        let textInput = $(this.$refs.textInput);
        textInput.focus();
      });
    },
    blurInput() {
      setTimeout(() => {
        // this.inputVal = "";
        this.$emit("inputBlur", this.inputVal);
        this.scrollTop();
      }, 200);
    },
    scrollTop() {
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight; //解决输入框弹起遮挡等BUG
      }, 300);
    },
    changeVal() {
      this.inputVal = this.inputVal.replace(
        /[^.,，。!@#$%^&*()-+=_\[\]{}|~`;:"'《》？、；“”‘’（）【】{}！￥……\s0-9a-zA-Z\u4e00-\u9fa5]+/gi,
        ""
      );
    },
    // 过滤输入框
    input() {
      this.inputVal = this.inputFormat(this.inputVal, 200);
    }
  },
  created() {},
  mounted() {
    const text = document.getElementById("textarea");
    this._initText(text, 10, 60);
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  right: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(248, 248, 248, 1);
  max-height: 1.9rem;
  padding: 0.3rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
  z-index: 111;
  .input-con {
    -webkit-appearance: none;
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    width: 5.4rem;
    height: 0.6rem;
    border-radius: 0.1rem;
    padding-left: 0.25rem;
    padding-top: 0.1rem;
    color: #333;
    font-size: 0.28rem;
    line-height: 0.4rem;
    &:focus {
      border: 1px solid #2f54eb;
    }
  }
}
.wrapper /deep/ .mu-raised-button {
  align-self: flex-end;
  width: 1.2rem !important;
  min-width: auto;
  height: 0.6rem;
  border-radius: 0.1rem;
  white-space: nowrap;
  .mu-button-wrapper {
    white-space: nowrap;
  }
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-size: 0.24rem;
  color: #999999;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-size: 0.24rem;
  color: #999999;
}
:-ms-input-placeholder {
  /* IE 10+ */
  font-size: 0.24rem;
  color: #999999;
}
:-moz-placeholder {
  /* Firefox 18- */
  font-size: 0.24rem;
  color: #999999;
}
</style>
