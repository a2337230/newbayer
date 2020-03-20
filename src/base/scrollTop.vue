<template>
	<div class="scoll-top">
		<mu-slide-bottom-transition>
			<div class="goTop" v-if="showTop" @click="goTop">
				<mu-icon value="arrow_upward" color="red"></mu-icon>
			</div>
		</mu-slide-bottom-transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showTop: true
			}
		},
		methods: {
			goTop() {

			}
		}
	}
</script>

<style scoped lang="scss">
	.scoll-top {
		position: fixed;
		right: 0.88rem;
		bottom: 0.88rem;
		z-index: 99;
		background: #2f54ed;
		.goTop{
			width: 0.88rem;
			height: 0.88rem;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			display:flex;
			.mu-icon{
				
			}
		}
	}
</style>
