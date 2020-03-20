<template>
	<div class="fullscreen">
		<Header :title="title" @goBack="goBack" ref="header"></Header>
		<div class="look-con">
			<div id="ww_videoPlay2"></div>
		</div>
		<noResult v-if="!data.docId" :title="title" style="padding: .4rem 0"></noResult>
	</div>
</template>

<script>
	import Header from '@/base/Header'
	import noResult from '@/base/noResult'

	export default {
		props: {
			data: {
				type: Object,
				default: null
			},
			title: {
				type: String,
				default: '预览'
			},
			from: {
				type: String,
				default: ''
			},
			urlQuery: {
				type: String,
				default: ''
			}
		},
		components: {
			Header,
			noResult
		},
		data() {
			return {}
		},
		methods: {
			//页面返回
			goBack() {
				if (this.from === 'enterpriseLibrary') {
					if (this.urlQuery === 'search') {
						this.$router.push({
							name: '搜索',
							query: {
								type: 3,
								tab: 1,
							}
						});
					} else {
						this.$router.push({
							name: `enterpriseLibrary`,
							query: {
								type: 1,
							}
						})
					}
			}
		},
		initBaiduReader(docId, token, host) {
			var option = {
				docId: docId,
				token: token,
				host: host,
				serverHost: 'https://doc.bj.baidubce.com',
				width: 600, //文档容器宽度
				zoom: false, //是否显示放大缩小按钮
				zoomStepWidth: 200,
				pn: 1, //定位到第几页，可选
				ready: function (handler) { // 设置字体大小和颜色, 背景颜色（可设置白天黑夜模式）
					handler.setFontSize(1);
					handler.setBackgroundColor('#fff');
					handler.setFontColor('#000');
				},
				flip: function (data) { // 翻页时回调函数, 可供客户进行统计等

				},
				fontSize: 'big',
				toolbarConf: {
					page: true, //上下翻页箭头图标
					pagenum: true, //几分之几页
					full: true, //是否显示全屏图标,点击后全屏
					copy: true, //是否可以复制文档内容
					position: 'center', // 设置 toolbar中翻页和放大图标的位置(值有left/center)
				} //文档顶部工具条配置对象,必选
			};
			new Document('ww_videoPlay2', option);
		},
	}
	,
	mounted()
	{
		//关闭导航进度
		this.$refs.header.hideProgress();
		if (this.data) {
			this.initBaiduReader(this.data.docId, this.data.token, this.data.host);
		}
	}
	}
</script>

<style lang="scss" scoped>
	.doc-reader .reader-doc .img-zoom {
		display: none !important;
	}

	.fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    bottom: 0;
    right: 0;

		.look-con {
      height: 14rem;
      background: #fff;
      width: 100%;
      overflow-y: scroll
		}
	}
</style>
