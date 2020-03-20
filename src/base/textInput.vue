<template>
  <div class="password-box" v-if="visible">
    <div class="password-container" :class="{openDialog: visible}">
      <div class="close" @click="closeDialog">×</div>
      <div class="psd-box">
        <input type="text" v-model="password" :disabled="disabled" :placeholder="placeholder">
        <!-- 密码错误 -->
        <p class="error-psd" v-if="psdError || empty">{{ errorPsd }}</p>
      </div>
      <div class="btn">
        <button @click="submit" :disabled="!password">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'passwordBox',
  props: {
    placeholder: {
      type: String,
      default: '请输入密码'
    },
    visible: {
      type: Boolean,
      default: false
    },
    psdError: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      // 是否显示
      // visible: false,
      openPsd: require('./../assets/psdopen.png'),
      closePsd: require('./../assets/psdclose.png'),
      // 明文密文
      isPsd: false,
      // 密码
      password: '',
      // 密码错误提示
      errorPsd: '密码错误',
      // 密码输入是否为空
      empty: false,
	  disabled:false
    }
  },
  watch: {
    // 打开关闭清空密码
    // visible () {
    //   this.password = ''
    //   this.empty = false
    //   this.isPsd = false
    // }
  },
  methods: {
    // 输入过滤空格
    input () {
      // 禁止输入空格
      this.password = this.password.replace(/\s/g,"")
      if (this.password) {
        this.errorPsd = '密码错误'
        this.empty = false
        this.$emit('update:psdError', false)
      } else {
        this.errorPsd = '密码不能为空'
      }
    },
    // 关闭弹出框
    closeDialog () {
      this.$emit('update:visible', false)
    },
    submit () {
      // 如果为空不能发送
      if (!this.password) {
         this.errorPsd = '密码不能为空'
        this.empty = true
        return
      }
      this.$emit('submit', this.password)
    }
  },
}
</script>
<style lang="scss" scoped>
.password-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 9999999999999;
  .password-container {
    position: absolute;
    width: 5.44rem;
    height: 3.4rem;
    background-color: #fff;
    border-radius: .2rem;
    left: 50%;
    top: 100%;
    margin-left: -2.72rem;
    margin-top: -1.7rem;
    padding: .48rem .5rem;
    box-sizing: border-box;
    position: relative;
    .close {
      position: absolute;
      width: .6rem;
      height: .6rem;
      right: 0;
      top: 0;
      text-align: center;
      line-height: .6rem;
      font-size: .4rem;
      color: #E1E1E1;
    }
    h2 {
      text-align: center;
      color: #333;
      font-size: .3rem;
      line-height: .42rem;
      font-weight: 400;
      margin-bottom: .49rem;
    }
    .psd-box {
	  padding-top: 1rem;
      border-bottom: 1px solid #BCBCBC;
      display: flex;
      position: relative;
      input {
        width: 100%;
        outline: none;
        border: 0;
        padding-bottom: .16rem;
      }
      input::-webkit-input-placeholder {
        opacity: 1;
        color: #B4B4B4;
        font-size: .28rem;
        line-height: .4rem;
      }
      .tab-psd {
        display: flex;
        width: .4rem;
        height: .4rem;
        align-items: center;
        justify-content: center;
        img {
          width: .3rem;
        }
        .open {
          width: .36rem;
        }
      }
      .error-psd {
        color: #F5222D;
        font-size: .22rem;
        line-height: .3rem;
        position: absolute;
        bottom: -.4rem;
        transform: translateX(0);
        animation: error .2s;
        @keyframes error {
          0% {
            transform: translateX(-0.1rem);
          }
          20% {
            transform: translateX(0.1rem);
          }
          60% {
            transform: translateX(-0.1rem);
          }
          80% {
            transform: translateX(0.1rem);
          }
          100% {
            transform: translateX(0);
          }
        }
      }
    }
    .btn {
      text-align: center;
      margin-top: .36rem;
      overflow: hidden;
      button {
        width: 1.8rem;
        height: .6rem;
        border-radius: .3rem;
        outline: none;
        border: 0;
        background-color: #2F54EB;
        color: #fff;
        font-size: .3rem;
        position: relative;
        // 水波纹动画
        &:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, #ccc 10%, transparent 10.01%);
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition: transform .3s, opacity .5s;
        }
        &:active:after {
          transform: scale(0, 0);
          opacity: .3;
          transition: 0s;
        }
      }
    }
  }
  .openDialog {
    animation: top .3s cubic-bezier(.59,.18,.56,1.21) forwards;
  }
  @keyframes top {
    0% {
      top: 100%;
    }
    100% {
      top: 50%;
    }
  }
}
</style>