// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index.js'
import 'muse-ui/dist/muse-ui.css';
import MuseUI from 'muse-ui';
Vue.use(MuseUI);

import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import Vconsole from 'vconsole';
new Vconsole()
Vue.prototype.imgURL = 'https://img2.xlxt.net/';
Vue.prototype.imgURLTest = 'https://img.meinianuniversity.com/';
//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	loading: './assets/defaultimg/lazyImg.gif',
})

//上传配置
// Vue.prototype.aliossHost = 'https://img.meinianuniversity.com/'
// Vue.prototype.serverHost = 'https://lms.meinianuniversity.com/AliyunOSS/GetOssSignature'

Vue.prototype.aliossHost = 'https://img2.xlxt.net/'
Vue.prototype.serverHost = 'https://www2.xlxt.net/AliyunOSS/GetOssSignature/'

// Vue.prototype.aliossHost = 'https://img2.xlxt.net/'
// Vue.prototype.serverHost = 'https://www8.xlxt.net/AliyunOSS/GetOssSignature/'

//查看图片插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// 杏林商城
Vue.prototype.SignInViewUrl = 'https://m2.xlxt.net/SignInView/Index.html?form=jdindex'; // 签到页面
Vue.prototype.GameCenterUrl = 'https://m2.xlxt.net/enterprise/GameCenter.html?form=jdindex'; // 销售比拼
Vue.prototype.goodsUrl = 'https://mall2.xlxt.net';
Vue.prototype.m2Url = 'https://m2.xlxt.net/member/index.html';

import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';
Vue.use(Loading, {
	overlayColor: 'hsla(0,0%,100%,.8)', // 背景色
	size: 34,
	color: 'primary', // color
	className: '', // loading class name
	target: '.v-loading'
});

// 跳转保存上一级路由
Vue.prototype.setBaseUrl = () => {
	localStorage.removeItem('backUrl')
	let isRouter = {
		path: router.app.$route.path,
		name: router.app.$route.name,
		query: router.app.$route.query
	}
	localStorage.setItem('backUrl', JSON.stringify(isRouter))
}
// 输入框过滤
Vue.prototype.inputFormat = (text,max) => {
	text = text.replace(/[^.\\,/，。!@#$%^&*()\-+=_\[\]{}|~`;:"'《》？、；“”‘’（）【】{}！￥……\s0-9a-zA-Z\u4e00-\u9fa5]+/gi,'').trim()
	let len = getByteLen(text);
	if (len > max) {
		text = text.substring(0, text.length - 1)
	}
	return text.substring(0, max)
}
function getByteLen (val) {
	var len = 0;
	for (var i = 0; i < val.length; i++) {
		var a = val.charAt(i);
		if (a.match(/[^\x00-\xff]/ig) != null) {
				len += 2;
		}
		else {
				len += 1;
		}
	}
	return len;
}
Vue.config.productionTip = false
// Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
