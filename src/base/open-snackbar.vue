<template>
	<div>
		<mu-snackbar :color="color.color" :open.sync="color.open"  :position="color.position">
			<mu-icon left :value="color.icon"></mu-icon>
			{{color.message}}
		</mu-snackbar>
	</div>
</template>

<script>
	export default {
		props: {

		},
		data() {
			return {
				color: {
					color: '',//error
					message: '',
					icon:'',//block
					open: false,
					timeout: 3000,
					position: 'top'
				}
			}
		},
		methods: {
			openColorSnackbar(num=1, message) { // 1 success 2 error
				this.color.message = message;
				if (num == 1) {
					this.color.color = '#2F54EB';
					this.color.icon = 'check_circle';
				} else {
					this.color.color = 'error';
					 this.color.icon = 'warning';
				}
				clearTimeout(this.color.timer);
				this.color.open = true;
				this.color.timer = setTimeout(() => {
					this.color.open = false;
				}, this.color.timeout);
			},
		},
		mounted() {
		}
	}
</script>

<style>
</style>

