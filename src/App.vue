<template>
	<div id="app">
		<transition :name="transitionName">
				<router-view class='child-view' />
 		</transition>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				transitionName: 'slide-left',
			}
		},
		//实现路由得前进后退动画
		watch: {
			'$route'(to, from) {
				if (to.meta.index < from.meta.index) {
					this.transitionName = 'slide-left';
				} else {
					this.transitionName = 'slide-right';
				}
			},
		},
		methods:{

		}
	}
</script>

<style lang="scss">
	@import 'common/css/index.scss';

	#nprogress /deep/ .bar {
		top: 0.88rem !important;
	}

	#nprogress /deep/ .peg {
		display: none;
	}

	#app {
		.bottom-nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}

	.child-view {
		position: absolute;
		top: 0;
		width: 100%;
		// overflow-x: hidden;
		left: 0;
		right: 0;
		bottom: 0;
		transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
	}

	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		transform: translate(0%, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		transform: translate(100%, 0);
	}
</style>
