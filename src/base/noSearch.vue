<template>
	<div class="no-result">
		<div class="no-result-icon"></div>
		 <p class="no-result-text" >{{title}}</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: '抱歉，未找到结果'
			}
		}
	}
</script>

<style scoped  lang="scss"  rel='stylesheet/scss'>
	.no-result{
		text-align: center;
		position: absolute;
		width: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.no-result-icon{
			width: 4.11rem;
			height: 2.63rem;
			margin: 0 auto;
			background: url("./../assets/search/noResult.png");
			background-repeat: no-repeat;
			background-size: 4.10rem 3.76rem;
		}
		.no-result-text{
			font-size: .3rem;
			color:#848484;
			margin-top: .7rem;
		}
	}
</style>
