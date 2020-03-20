<template>
	<div class="tabs">
		<mu-tabs :value.sync="actived" color="#fff" indicator-color="#008442" full-width :ripple='false' v-if='tabs.length' @change='changeTab'
		 :el='el'>
			<mu-tab :ripple='false' v-for='(item,index) in tabs' :key='index' ripple>{{item}}</mu-tab>
		</mu-tabs>
	</div>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default: [],
				required: true
			},
			active: {
				type: Number,
				default: 0
			},
			el: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// actived:this.active
			}
		},
		methods: {
			initTabs() {
				let tabWidth = $(this.el + ' .mu-tab').width();
				let lineWidth = $(this.el + ' .mu-tab-link-highlight').width();
				$(this.el + ' .mu-tab-link-highlight').css({
					'left': (tabWidth - lineWidth) / 2,
				})
			},
			changeTab(val) {
				this.$emit('changeTabs', val)
			},
		},
		computed: {
			actived: {
				// getter
				get: function() {
					return this.active
				},
				set: function() { //因为我这里并不需要其他属性也跟着一起改变 所以就这样写了
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initTabs()
			})
		}
	}
</script>

<style scoped lang="scss" rel='stylesheet/scss'>
 @import 'common/css/index.scss';

	.tabs {
		.mu-tabs {
			height: 0.88rem;

			// box-shadow:0px 2px 2px 0px rgba(240,240,240,1);
			// position:static;
			.mu-tab {
				color: #333333;
				font-size: 0.3rem;
			}

			.mu-tab-active {
				color: $paColor;
				font-weight: 600;
			}
		}
	}

	.tabs /deep/ .mu-tab-link-highlight {
		bottom: 0.12rem;
		height: 4px;
		width: 0.6rem !important;
		border-radius: 4px;
    background: $paColor !important;
	}
</style>
