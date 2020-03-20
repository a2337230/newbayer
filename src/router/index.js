import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    	redirect: '/home'
  	},
	  {
		  path: '/home',
		  name: '首页',
		  component: () => import('@/components/Home/index.vue'),
		  meta: {
			  index: 0,
		  }
	  }
  ]
})
